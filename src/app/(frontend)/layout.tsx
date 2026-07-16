import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticCursor from "@/components/MagneticCursor";
import LenisScroller from "@/components/LenisScroller";
import { getSiteSettings } from "@/lib/sanity";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kanvas Digital",
  description:
    "Atmospheric, cinematic, and grid-aligned dark mode system for creative studios.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#000000] cursor-none" suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden="true" />
        <LenisScroller />
        <MagneticCursor />
        <div className="mx-auto w-full max-w-[1600px] min-h-screen flex flex-col relative bg-brand-dark overflow-x-hidden">
          <div className="bg-grid absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />
          <Header />
          <main id="top" className="relative z-10 flex-1">
            {children}
          </main>
          <Footer
            instagramUrl={settings?.instagramUrl}
            behanceUrl={settings?.behanceUrl}
            linkedinUrl={settings?.linkedinUrl}
          />
        </div>
      </body>
    </html>
  );
}
