import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy - ScreenshotFast",
    description: "Quickly capture and deliver clear screenshots with our super-fast API. ScreenshotFast.com is made for developers, offering easy setup and powerful tools to help you automate.",
};

export default function Privacy() {
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
            <div className="max-w-4xl my-11 mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="mb-4">
                    At ScreenshotFast.com, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our API service ("Service"). By using the Service, you agree to the collection and use of information in accordance with this policy.
                </p>

                <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
                <p className="mb-4">
                    We may collect various types of information, including:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>
                        <strong>Personal Information:</strong> Information that can be used to identify you, such as your name, email address, and payment details when you register for the Service.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Information about how you use the Service, including your IP address, browser type, operating system, and API usage logs.
                    </li>
                    <li>
                        <strong>Cookies:</strong> Small data files stored on your device that help us track your use of the Service and remember your preferences.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                <p className="mb-4">
                    We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>To provide, maintain, and improve the Service.</li>
                    <li>To process transactions and send you related information, including purchase confirmations and invoices.</li>
                    <li>To communicate with you, including responding to your inquiries, sending you updates, and providing customer support.</li>
                    <li>To monitor and analyze trends, usage, and activities in connection with the Service.</li>
                    <li>To detect, prevent, and address technical issues or fraudulent activities.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">3. Information Sharing and Disclosure</h2>
                <p className="mb-4">
                    We do not share your personal information with third parties except in the following circumstances:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>With service providers who perform services on our behalf, such as payment processing, data analysis, and customer service.</li>
                    <li>If required by law or in response to a valid legal request.</li>
                    <li>To protect the rights, property, or safety of ScreenshotFast.com, our users, or others.</li>
                    <li>In connection with a business transaction, such as a merger, acquisition, or asset sale.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
                <p className="mb-4">
                    We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee its absolute security.
                </p>

                <h2 className="text-2xl font-semibold mb-2">5. Your Data Protection Rights</h2>
                <p className="mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. If you would like to exercise any of these rights, please contact us at [Your Contact Information].
                </p>

                <h2 className="text-2xl font-semibold mb-2">6. Children's Privacy</h2>
                <p className="mb-4">
                    Our Service is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without verification of parental consent, we will take steps to remove that information from our servers.
                </p>

                <h2 className="text-2xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>

                <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us at hellodev4@gmail.com.
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