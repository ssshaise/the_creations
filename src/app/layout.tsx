import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ToastProvider from "@/components/ToastProvider";
import InquiryModal from "@/components/InquiryModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#faf8f5",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "The Creations — Handcrafted Resin Art | Tables, Coasters, Wall Art & More",
  description:
    "Discover stunning handcrafted resin art from The Creations. Shop unique river tables, ocean coasters, geode trays, wall art frames, and artisan showpieces. Premium quality, one-of-a-kind pieces shipped across India.",
  keywords: [
    "resin art",
    "resin table",
    "resin coasters",
    "handcrafted art",
    "epoxy resin",
    "wall art",
    "home decor",
    "luxury furniture",
    "artisan crafts",
    "The Creations",
  ],
  openGraph: {
    title: "The Creations — Handcrafted Resin Art",
    description:
      "Where nature meets artistry. Unique resin art pieces handcrafted with passion.",
    type: "website",
    locale: "en_IN",
    siteName: "The Creations",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
        {children}
        <InquiryModal />
        <ToastProvider />
        {/* Razorpay Script inside body for Next.js & Safari stability */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
