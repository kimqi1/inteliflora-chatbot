// First line of your component file
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.top === window.self) {
      // The page is not in an iframe
      document.body.innerHTML = `
      <div style="display: flex; flex-direction:column; justify-content: center; align-items: center; height: 100vh; font-size: 24px; font-family: Arial, sans-serif;">
      <p>404</p>
        <p>Website Not Found<p>
      </div>
    `;
    }
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
