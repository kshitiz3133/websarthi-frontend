import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Websaarthi — Tech Consultancy & Business Automation",
  description:
    "End-to-end tech consultancy: digital marketing, lead qualification, lead management, tech provision, and full operations automation.",
  openGraph: {
    title: "Websaarthi",
    description: "Your growth partner — from lead to close.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
