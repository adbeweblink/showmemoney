import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "攝影報價系統 | 圲億行銷設計",
  description: "專業活動攝影、音樂會攝影、婚禮婚紗攝影報價系統",
  openGraph: {
    title: "攝影報價系統 | 圲億行銷設計",
    description: "專業活動攝影、音樂會攝影、婚禮婚紗攝影報價系統",
    images: ["/images/og-image.png"],
  },
  other: {
    "netlify-screenshot-delay": "3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${notoSansTC.variable} font-sans antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
