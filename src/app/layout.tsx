import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import Chatbot from "@/components/common/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://urbanarchmumbai.com'),
  title: "UrbanArch Mumbai | Premium Real Estate & Luxury Apartments",
  description: "Discover the finest luxury residential properties in Mumbai. From Worli sea-facers to Powai townships, find your high-end dream home with UrbanArch Mumbai.",
  keywords: ["Mumbai Real Estate", "Luxury Apartments Mumbai", "Worli Properties", "UrbanArch Mumbai", "Bandra Luxury Homes", "Real Estate India"],
  authors: [{ name: "UrbanArch Mumbai" }],
  openGraph: {
    title: "UrbanArch Mumbai | Premium Real Estate",
    description: "Discover the finest luxury residential properties in Mumbai.",
    url: "https://urbanarchmumbai.com",
    siteName: "UrbanArch Mumbai",
    images: ["/logo.png"],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Chatbot />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
