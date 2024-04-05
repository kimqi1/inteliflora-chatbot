import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inteliflora",
  description: "Inteliflora chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Other head elements */}
        <script dangerouslySetInnerHTML={{ 
          __html: `
            if (window.top === window.self) {
              // The page is not in an iframe
              document.body.innerHTML = 'This content is only accessible through an iframe.';
            }
          `
        }}></script>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
