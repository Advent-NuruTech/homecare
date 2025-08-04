import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBubble from "@/components/WhatsAppBubble"; // ✅ Import the bubble

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "EdenLife Homecare",
    template: "%s | EdenLife",
  },
  description: "EdenLife Homecare is a registered Community-Based Organization in Kenya, dedicated to palliative care, natural health solutions, and holistic community empowerment.",
  keywords: ["EdenLife", "Homecare", "Health", "CBO", "Palliative Care", "Kenya", "Natural Remedies"],
  authors: [{ name: "Dr. Vivian Ouma" }],
  openGraph: {
    title: "EdenLife Homecare",
    description: "Holistic, compassionate care and products by EdenLife Homecare in Kenya.",
    url: "https://edenlifehomecare.com",
    siteName: "EdenLife Homecare",
    images: [
      {
        url: "/assets/edenlife official logo.jpg", // ✅ Make sure this path is correct and exists in the /public directory
        width: 800,
        height: 600,
        alt: "EdenLife Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EdenLife Homecare",
    description: "Healing Naturally. Living Fully. Community care, health products, and empowerment.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",       // Place favicon.ico in /public
    shortcut: "/favicon.ico",
    apple: "/logo.png",         // Apple touch icon (can also be custom)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <WhatsAppBubble />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
