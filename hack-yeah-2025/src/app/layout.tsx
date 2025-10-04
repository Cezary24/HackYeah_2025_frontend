import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AlertBanner from "./components/AlertBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackYeah 2025",
  description: "Aplikacja mobilna HackYeah 2025",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 flex flex-col">
          <div className="flex-shrink-0 p-3 sm:p-4 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto">
              <AlertBanner level="high" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
          <Navbar />
        </div>
      </body>
    </html>
  );
}
