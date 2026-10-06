import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const siteUrl = "https://travels.kiastartupconsult.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KIA-Start Up Consult | Work Abroad, Study Abroad & Visa Assistance",
    template: "%s | KIA-Start Up Consult",
  },
  description:
    "KIA-Start Up Consult helps Ghanaians navigate work abroad, study abroad, visa assistance, flight booking, and international travel with practical, honest guidance.",
  keywords: [
    "Work Abroad Ghana",
    "Study Abroad Ghana",
    "Visa Assistance Ghana",
    "Travel Agency Ghana",
    "Flight Booking Ghana",
    "Overseas Jobs for Ghanaians",
    "Jobs in Europe for Ghanaians",
    "Lithuania Poland Malta UK Canada Work Opportunities",
    "KIA Start Up Consult",
    "Travels KIA Startup Consult",
  ],
  authors: [{ name: "KIA-Start Up Consult", url: siteUrl }],
  creator: "KIA-Start Up Consult",
  publisher: "KIA-Start Up Consult",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  verification: {
    google: [
      "ABYN-qEa5KzqlZ7RPLGkU5NBnwaBafHruc4yRnq5EW0",
      "eslnstHc1_xtBLjOLtK5yEsapallcH8PsYVFtXFlwBg",
    ],
  },
  openGraph: {
    title: "KIA-Start Up Consult | Your Partner in Global Careers",
    description:
      "Work abroad. Study abroad. Travel with confidence. Practical, verified guidance for your international journey from Ghana to the world.",
    url: siteUrl,
    siteName: "KIA-Start Up Consult",
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KIA-Start Up Consult | Your Partner in Global Careers",
    description:
      "Work abroad. Study abroad. Travel with confidence. Practical guidance for your international journey from Ghana to the world.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "./",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "EmploymentAgency", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "KIA-Start Up Consult",
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
      image: `${siteUrl}/favicon.ico`,
      description:
        "KIA-Start Up Consult provides honest, practical guidance for Ghanaians seeking international career, study abroad, visa documentation, and travel opportunities.",
      telephone: "+233241332246",
      email: "info@kiastartupconsult.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ajumako – Techiman Road, Adjacent DCE's Bangalore",
        addressLocality: "Ajumako",
        addressRegion: "Central Region",
        addressCountry: "GH",
      },
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Ghana",
      },
      serviceArea: {
        "@type": "AdministrativeArea",
        name: "Ghana",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "KIA-Start Up Consult",
      description:
        "Verified international work, study abroad, and visa assistance consult in Ghana.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-GH",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-charcoal font-sans" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
