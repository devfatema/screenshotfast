const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const secret = process.env.NEXT_PUBLIC_SIGNATURE_SECRET;

const NONCE_CACHE = new Set(); // A simple in-memory cache to store used nonces

const MAX_TIME_DIFF = 5 * 60 * 1000; // 5 minutes

let browser; // Keep a single browser instance

async function initializeBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            timeout: 240000,
        });
    }
}

const captureScreenshot = async (req, res) => {

    const { timestamp, nonce, ...data } = req.body;

    // Check if the request is within the allowed time window
    if (Date.now() - timestamp > MAX_TIME_DIFF) {
        return res.status(401).send({
            error: "Request invalid.",
        });
    }

    // Check if the nonce has been used before
    if (NONCE_CACHE.has(nonce)) {
        return res.status(401).send({
            error: "Request invalid.",
        });
    }

    // Add the nonce to the cache to prevent reuse
    NONCE_CACHE.add(nonce);

    // Clean up old nonces to avoid memory issues (optional)
    setTimeout(() => NONCE_CACHE.delete(nonce), MAX_TIME_DIFF);

    const hmac = crypto.createHmac("sha256", secret);
    const rawBody = JSON.stringify(req.body);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(req.get("X-Signature") || "", "utf8");

    try {
        if (!crypto.timingSafeEqual(digest, signature)) {
            return res.status(401).send({
                error: "Request invalid.",
            });
        }
    } catch {
        return res.status(401).send({
            error: "Request invalid.",
        });
    }

    try {
        await initializeBrowser(); // Ensure the browser is initialized

        const { url, width, height, format, darkMode, blockAds, renderModeType, blockCookies } = req.body;

        // Check if the URL is valid
        const isValidUrl = (urlString) => {
            try {
                new URL(urlString);
                return true;
            } catch (e) {
                return false;
            }
        };

        if (!isValidUrl(url)) {
            return res.status(400).send({
                error: "Invalid URL found.",
            });
        }

        const page = await browser.newPage();

        // Set a more realistic user agent
        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        await page.setUserAgent(userAgent);

        
        // Add additional headers to appear more like a real browser
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://www.google.com/',
        });

        // Randomize viewport size slightly
        const randomWidth = parseInt(width) + Math.floor(Math.random() * 50);
        const randomHeight = parseInt(height) + Math.floor(Math.random() * 50);
        await page.setViewport({ width: randomWidth, height: randomHeight });

        // Set up a listener to handle dialogs
        page.on("dialog", async (dialog) => {
            console.log(`Dismissing dialog: ${dialog.message()}`);
            await dialog.dismiss();
        });

        // Apply dark mode if requested
        if (darkMode) {
            await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
        }

        // Block ads if requested
        if (blockAds) {
            await page.setRequestInterception(true);
            page.on('request', (request) => {
                if (request.resourceType() === 'ad' || 
                    (request.resourceType() !== 'image' && 
                    (request.url().includes('ad') || 
                    request.url().includes('analytics') || 
                    request.url().includes('tracker')))) {
                    request.abort();
                } else {
                    request.continue();
                }
            });
        }

        // Block cookies if requested
        if (blockCookies) {
            await page.setCookie(...[]);  // Clear existing cookies
            const client = await page.target().createCDPSession();
            await client.send('Network.clearBrowserCookies');
            await client.send('Network.setCookies', { cookies: [] });
            
            await page.setRequestInterception(true);
            page.on('request', (request) => {
                const headers = request.headers();
                delete headers['cookie'];
                request.continue({ headers });
            });

            // Disable storage access and clear cookies
            await page.evaluate(() => {
                try {
                    localStorage.clear();
                    sessionStorage.clear();
                } catch (e) {
                    console.warn('Unable to clear storage:', e);
                }
                try {
                    document.cookie.split(";").forEach((c) => {
                        document.cookie = c
                            .replace(/^ +/, "")
                            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    });
                } catch (e) {
                    console.warn('Unable to clear cookies:', e);
                }
            });

            // Set cookie preferences to block all cookies
            await page.evaluateOnNewDocument(() => {
                Object.defineProperty(navigator, 'cookieEnabled', { get: () => false });
                try {
                    Object.defineProperty(document, 'cookie', {
                        get: function() { return ''; },
                        set: function() { return true; },
                        configurable: true
                    });
                } catch (e) {
                    console.warn('Unable to override cookie property:', e);
                }
            });
        }

        // Add some randomized delays and mouse movements
        await page.evaluateOnNewDocument(() => {
            // Overwrite the `navigator.webdriver` property
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined,
            });

            // Add a false web driver attribute to the document
            document.addEventListener('DOMContentLoaded', () => {
                const webdriverAttr = document.createElement('div');
                webdriverAttr.id = 'webdriver-attribute';
                webdriverAttr.style.display = 'none';
                document.body.appendChild(webdriverAttr);
            });
        });

        // Navigate to the webpage with retry mechanism and random delays
        let retries = 3;
        while (retries > 0) {
            try {
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
                
                // Add random delay and scrolling
                await page.evaluate(() => {
                    const delay = Math.floor(Math.random() * 1000) + 500;
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            window.scrollTo(0, Math.random() * 100);
                            resolve();
                        }, delay);
                    });
                });

                break;
            } catch (navigationError) {
                console.error(`Navigation error (${retries} retries left):`, navigationError);
                retries--;
                if (retries === 0) {
                    throw navigationError;
                }
                await new Promise(resolve => setTimeout(resolve, 5000 + Math.random() * 5000));
            }
        }

        // Log page content if there's an issue
        const pageContent = await page.content();
        if (pageContent.includes("Sorry, we couldn't load the page you're looking for")) {
            console.error("Stripe error page detected. Page content:", pageContent);
        }

        // Capture screenshot based on render mode
        let screenshotOptions = { type: format || 'png' };
        if (renderModeType === 'fullpage') {
            // Scroll through the page to ensure all content is loaded
            await page.evaluate(async () => {
                await new Promise((resolve) => {
                    let totalHeight = 0;
                    const distance = 100;
                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });

            // Wait for network idle to ensure images are loaded
            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {});

            screenshotOptions.fullPage = true;
        } else if (renderModeType === 'element' && req.body.selector) {
            const element = await page.$(req.body.selector);
            if (element) {
                screenshotOptions.clip = await element.boundingBox();
            }
        }

        // Set quality only for JPEG format
        if (screenshotOptions.type === 'jpeg') {
            screenshotOptions.quality = 100;
        }

        const screenshot = await page.screenshot(screenshotOptions);

        await page.close();

        // Convert the screenshot to base64
        const base64Screenshot = Buffer.from(screenshot).toString('base64');

        // Send the base64 encoded screenshot as a response
        res.status(200).json({
            image: base64Screenshot,
            format: format || 'png',
        });

    } catch (error) {
        console.error('Error capturing screenshot:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Failed to capture screenshot', details: error.message });
    }
}

module.exports = {
    captureScreenshot
}