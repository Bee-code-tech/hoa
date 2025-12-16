import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { ShoppingCart } from "@/app/components/ShoppingCart";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "HOA Learning - Professional Online Learning Platform",
  description: "Advance your career with expert-led courses in technology, business, health & safety, and more. Earn industry-recognized certificates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`}>
      <body className="font-sans relative">
        {children}
        <ShoppingCart />
      </body>
    </html>
  );
}