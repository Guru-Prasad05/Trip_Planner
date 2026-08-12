import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { PortalProvider } from "@/components/portal/PortalProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium Group Tours, Spiritual Journeys & Celebrations`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

export const viewport: Viewport = {
  themeColor: "#e8742c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <PortalProvider>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <a href="#main" className="sr-only">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </PortalProvider>
      </body>
    </html>
  );
}
