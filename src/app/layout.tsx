import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WebVitalsReporter } from "@/components/WebVitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "ProductStore - Amazing Deals on Quality Products",
  description: "Discover amazing products at unbeatable prices. Browse through our curated collection with fast loading and smooth navigation.",
  keywords: ["products", "shopping", "e-commerce", "deals", "online store"],
  authors: [{ name: "ProductStore Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://dummyjson.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.dummyjson.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
        <link rel="dns-prefetch" href="https://cdn.dummyjson.com" />
        
        {/* Optimize resource loading */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <WebVitalsReporter />
      </body>
    </html>
  );
}
