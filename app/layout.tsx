import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ImageProtection } from "@/components/ImageProtection";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { studio } from "@/data/content";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(studio.siteUrl),
  title: {
    default: "Christophany Studios | Photographer in Accra, Ghana",
    template: "%s | Christophany Studios",
  },
  description:
    "Thoughtful portrait, wedding, event, and brand photography in Accra, Ghana. Stories worth seeing. Moments worth keeping.",
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: studio.name,
    title: "Christophany Studios | Stories Worth Seeing",
    description: "Exceptional photography for people, brands, and moments in Accra, Ghana.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christophany Studios | Stories Worth Seeing",
    description: "Exceptional photography for people, brands, and moments in Accra, Ghana.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f3ed",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ImageProtection />
        <ConsentAnalytics />
      </body>
    </html>
  );
}
