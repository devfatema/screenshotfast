import Head from "next/head";
import "./globals.css";
import Script from 'next/script';
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata = {
  title: "The Fastest Screenshot API for Developers - ScreenshotFast",
  description: "Quickly capture and deliver clear screenshots with our super-fast API. ScreenshotFast.com is made for developers, offering easy setup and powerful tools to help you automate.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-LLTVQ9EKMW`}
          strategy="afterInteractive"
        />
        {children}
        
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
