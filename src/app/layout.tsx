import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_JP({
  variable: "--font-serif-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans_JP({
  variable: "--font-sans-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "月瀬庵 | TSUKISE-AN",
  description: "箱根・芦ノ湖畔に佇む、全八室の離れ宿 月瀬庵",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSerif.variable} ${notoSans.variable} ${cormorant.variable} ryokan-body`}>
        {children}
      </body>
    </html>
  );
}
