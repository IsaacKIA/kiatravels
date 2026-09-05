import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const siteUrl = "https://www.kiastartupconsult.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KIA-Start Up Consult | Your Partner in Global Careers",
    template: "%s | KIA-Start Up Consult",
  },
  description:
    "KIA-Start Up Consult helps people in Ghana navigate work abroad, study abroad, visa assistance, flight booking and travel with practical, honest guidance.",
  openGraph: {
    title: "KIA-Start Up Consult | Your Partner in Global Careers",
    description:
      "Work abroad. Study abroad. Travel with confidence. Practical guidance for your international journey, from Ghana to the world.",
    url: siteUrl,
    siteName: "KIA-Start Up Consult",
    locale: "en_GH",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-paper text-charcoal font-sans" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
