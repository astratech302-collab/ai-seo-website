import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeVars from "@/components/theme/ThemeVars";
import { BookDemoProvider } from "@/components/demo/BookDemoProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    "Geobuild runs AEO, GEO and SEO with a team of AI agents — and a human strategist who makes the final call. Get cited on ChatGPT, Claude, Gemini and Perplexity.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${geistMono.variable} h-full antialiased`}
    >
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
