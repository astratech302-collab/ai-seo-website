import { Roboto, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import ThemeVars from "@/components/theme/ThemeVars";
import MixpanelProvider from "@/components/analytics/MixpanelProvider";
import { BookDemoProvider } from "@/components/demo/BookDemoProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import ScrollToTop from "@/components/util/ScrollToTop";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/config/site";

const roobert = localFont({
  variable: "--font-sans",
  src: "./fonts/Roobert-Variable.ttf",
  weight: "100 900",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // metadataBase lets every page emit an absolute canonical from a relative
  // `alternates.canonical` path (see each page's metadata).
  metadataBase: new URL(SITE_URL),
  title: "Geobuild — Be the Brand AI Recommends | AEO, GEO & SEO",
  description:
    "Geobuild runs GEO and SEO with a team of AI agents — and a human strategist who makes the final call. Get cited on ChatGPT, Claude, Gemini and Perplexity.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roobert.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Site-wide structured data (present on every page). Per-page types are
            added by the individual pages. */}
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        <ScrollToTop />
        <ThemeVars />
        <MixpanelProvider />
        <BookDemoProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </BookDemoProvider>
      </body>
    </html>
  );
}
