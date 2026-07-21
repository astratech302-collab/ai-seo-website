import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import ThemeVars from "@/components/theme/ThemeVars";
import { BookDemoProvider } from "@/components/demo/BookDemoProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CLARITY_ID } from "@/config/site";

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
  title: "Geobuild — Be the brand AI recommends",
  description:
    "Geobuild runs GEO and SEO with a team of AI agents — and a human strategist who makes the final call. Get cited on ChatGPT, Claude, Gemini and Perplexity.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roobert.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeVars />
        <BookDemoProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </BookDemoProvider>
      </body>
    </html>
  );
}
