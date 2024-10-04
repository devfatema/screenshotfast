import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Terms Of Condition - ScreenshotFast",
    description: "Quickly capture and deliver clear screenshots with our super-fast API. ScreenshotFast.com is made for developers, offering easy setup and powerful tools to help you automate.",
};

export default function Terms()
{
    return (
        <>
            <div style={{ backgroundImage: "url('/assets/img/bg_shape_1.png')" }} className="bg-center bg-cover bg-no-repeat h-full relative">
                <div>
                    <div className="container mx-auto pt-8">
                        <div className="bg-white border custom-border-color custom-box-shadow rounded-2xl px-2.5 py-3 flex items-center justify-between">
                            <Link href={'/'}>
                                <Image src={'/assets/img/logo1.png'} alt="screenshotfast" width={155} height={35} />
                            </Link>
                            <Link href={'/'} className="flex items-center bg-black text-white px-5 py-2 text-base rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" className=" mr-2"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"><path d="M 80.039519,211.06969 64.056987,239.90745" /><path d="m 175.96058,211.06969 15.98254,28.83776" /><circle cx="128" cy="128.007" r="95.915" /><path d="M 35.294352,102.43866 A 47.957299,47.957299 0 0 1 17.212686,53.792007 47.957299,47.957299 0 0 1 53.990946,17.175027 47.957299,47.957299 0 0 1 102.55767,35.470309" /><path d="m 127.99967,32.092482 3.8e-4,-15.985761" /><path d="M 128.00005,80.049788 V 128.00708" /><path d="m 128.00005,128.00708 33.91093,33.91093" /><path d="M 220.70575,102.43866 A 47.957299,47.957299 0 0 0 238.78742,53.792007 47.957299,47.957299 0 0 0 202.00916,17.175027 47.957299,47.957299 0 0 0 153.44244,35.470309" /></g></svg> <span>Join Waitlist</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" my-11 max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
                <p className="mb-4">
                    Welcome to ScreenshotFast.com. By accessing or using our API service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree with these Terms, please do not use our services.
                </p>

                <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p className="mb-4">
                    By using the ScreenshotFast.com API ("Service"), you agree to these Terms. These Terms apply to all visitors, users, and others who access the Service ("Users").
                </p>

                <h2 className="text-2xl font-semibold mb-2">2. API Usage</h2>
                <p className="mb-4">
                    The Service provides an API for capturing screenshots. You are responsible for all activity associated with your API key, including any usage by unauthorized third parties. Abuse or misuse of the API may result in the suspension or termination of your account.
                </p>

                <h2 className="text-2xl font-semibold mb-2">3. User Obligations</h2>
                <p className="mb-4">
                    You agree not to use the Service for any unlawful purposes or in any manner that could damage, disable, overburden, or impair the Service. You also agree not to attempt to gain unauthorized access to any part of the Service or its related systems or networks.
                </p>

                <h2 className="text-2xl font-semibold mb-2">4. Payment and Fees</h2>
                <p className="mb-4">
                    If the Service is provided for a fee, you agree to pay all applicable charges and fees in accordance with the payment terms. All fees are non-refundable except as required by law.
                </p>

                <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
                <p className="mb-4">
                    The Service and all materials provided through the Service, including but not limited to software, text, graphics, and logos, are the property of ScreenshotFast.com or its licensors and are protected by intellectual property laws.
                </p>

                <h2 className="text-2xl font-semibold mb-2">6. Termination</h2>
                <p className="mb-4">
                    We may terminate or suspend your access to the Service immediately, without prior notice or liability, if you breach these Terms or for any other reason at our sole discretion.
                </p>

                <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
                <p className="mb-4">
                    In no event shall ScreenshotFast.com, its directors, employees, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the Service.
                </p>

                <h2 className="text-2xl font-semibold mb-2">8. Changes to the Terms</h2>
                <p className="mb-4">
                    We reserve the right to modify or replace these Terms at any time. It is your responsibility to check the Terms periodically for changes. Your continued use of the Service after any changes to the Terms constitutes acceptance of those changes.
                </p>

                <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
                <p className="mb-4">
                    These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                </p>

                <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about these Terms, please contact us at hellodev4@gmail.com.
                </p>
            </div>
            <footer className="bg-white rounded-lg shadow container mx-auto dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://screenshotfast.com" className="hover:underline">ScreenshotFast</a>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Link href='/privacy' className="hover:underline me-4 md:me-6">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href='/terms' className="hover:underline me-4 md:me-6">
                                Terms Of Condition
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}