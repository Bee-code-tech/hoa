import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hoaservices.co.uk"),
  title: {
    default: "House of Abundance Services | Professional Security Training",
    template: "%s | House of Abundance Services",
  },
  description: "Industry-accredited security training in London and across the UK. Specializing in Door Supervision, CCTV Operations, and Close Protection.",
  keywords: ["Security Training", "SIA Course", "Door Supervisor", "CCTV Operator", "Close Protection", "UK Security Certification"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.hoaservices.co.uk",
    siteName: "House of Abundance Services",
    title: "House of Abundance Services | Professional Security Training",
    description: "Start your career in professional security with SIA-accredited courses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "House of Abundance Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "House of Abundance | Security Training",
    description: "Industry-accredited security training in the UK.",
    images: ["/og-image.jpg"],
  },
};

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${space.variable} antialiased`}
      >
        <Toaster position="top-center" />
        <TooltipProvider>
          <Analytics />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
