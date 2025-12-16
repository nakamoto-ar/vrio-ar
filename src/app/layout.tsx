import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VRIO | Software as an Art Form",
  description: "Kinetic Cyberpunk Artifacts & Disruptive Business Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shareTechMono.variable} antialiased bg-void-blue text-holographic-white overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
