import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema, wholesaleBusinessSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: false, email: false },
  openGraph: {
    type: "website",
    locale: siteConfig.ogLocale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#5a1226",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.htmlLang} className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        {/* Scroll reveals start hidden; without JS they must never stay invisible. */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="bg-bordeaux text-porcelain sr-only rounded-full px-5 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center"
        >
          Перейти до основного вмісту
        </a>

        <SiteHeader />
        <main id="main" className="page-enter flex-1">
          {children}
        </main>
        <SiteFooter />

        <JsonLd data={[organizationSchema(), websiteSchema(), wholesaleBusinessSchema()]} />
      </body>
    </html>
  );
}
