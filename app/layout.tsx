import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "../components/WalletContextProvider";
import Navbar from "../components/Navbar";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazir",
});

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "نکسوس سولانا | ساخت توکن و میم کوین",
  description: "اولین پلتفرم ساخت ارز دیجیتال در ایران با نام تجاری Nexus Solana.",
  manifest: "/manifest.json",
  
  // کد تایید گوگل شما
  verification: {
    google: "sLK4JJOaw4XxKgoHn42-ry2fAMpI17zKnAUyLjKI6mk",
  },

  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.png",
    apple: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    // 👇👇 آدرس صحیح و نهایی (sand) 👇👇
    url: "https://nexus-solana-sand.vercel.app", 
    siteName: "Nexus Solana",
    title: "ساخت توکن سولانا در ۱ دقیقه | نکسوس",
    description: "بدون نیاز به کدنویسی، توکن خودت رو روی سولانا بساز.",
    images: [
      {
        url: "/icon.png",
        width: 192,
        height: 192,
        alt: "Nexus Solana Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} bg-[#0B0F19] text-white antialiased`}>
        <WalletContextProvider>
          <Navbar />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}