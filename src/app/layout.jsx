// Use client directive as Toaster relies on client-side hooks
"use client";

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Import Footer component
import { Toaster } from "@/components/ui/toaster"; // Keep Toaster for potential future use
import SmokeCursorEffect from '@/components/SmokeCursorEffect'; // Import the smoke effect

export default function RootLayout({ children }) {
  // Note: Removed Metadata export as it's TypeScript specific.
  // Basic metadata can be added directly in the <head> tag if needed,
  // or using next/head for dynamic titles/descriptions per page.

  return (
    <html lang="en">
      <head>
        {/* Basic Meta Tags - Can be enhanced per page */}
        <title>ABAnuSara Portfolio</title>
        <meta name="description" content="Portfolio of Anupriya Balasubramanian (ABAnuSara)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add link to favicon if you have one */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
      <body className="antialiased flex flex-col min-h-screen"> {/* Removed font variables, added flex for footer */}
        <SmokeCursorEffect /> {/* Add the smoke effect component here */}
        <Header />
        <main className="flex-grow">{children}</main> {/* Added flex-grow to main */}
        <Footer /> {/* Render Footer component */}
        <Toaster /> {/* Render Toaster */}
      </body>
    </html>
  );
}
