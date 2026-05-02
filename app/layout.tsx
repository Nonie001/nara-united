import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_Thai,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Nara United — สโมสรฟุตบอลนราฯ ยูไนเต็ด",
    template: "%s | Nara United",
  },
  description:
    "เว็บไซต์ทางการของสโมสรฟุตบอล Nara United (กอและพิฆาต) ติดตามผลการแข่งขัน นักเตะ ข่าวสาร และตารางคะแนน",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "Nara United",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${notoSansThai.variable} ${geistSans.variable} ${geistMono.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-nara-black selection:bg-nara-gold/40 selection:text-nara-green-deeper">
        {children}
      </body>
    </html>
  );
}
