import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "../globals.css"; // مسیر اصلاح شده برای استایل
import { WalletContextProvider } from "../../components/WalletContextProvider";
import Navbar from "../../components/Navbar";
import { getDictionary } from "../get-dictionary"; // مسیر اصلاح شده
import { Locale, i18n } from "../../i18n-config";

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

// --- تولید متادیتای هوشمند (سئو داینامیک) ---
export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    manifest: "/manifest.json",
    
    // کد تایید گوگل شما (حفظ شده از فایل قبلی)
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
      // تنظیم لوکال بر اساس زبان فعلی
      locale: lang === 'fa' ? 'fa_IR' : 'ar_SA',
      // آدرس داینامیک بر اساس زبان
      url: `https://nexus-solana-taupe.vercel.app/${lang}`, 
      siteName: "Nexus Solana",
      title: dict.metadata.title,
      description: dict.metadata.description,
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
}

// این تابع برای بیلد استاتیک (SSG) ضروری است
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// --- کامپوننت اصلی لایوت ---
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // تعیین جهت صفحه (RTL برای فارسی/عربی)
  const dir = (lang === 'fa' || lang === 'ar') ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <body className={`${vazir.className} bg-[#0B0F19] text-white antialiased`}>
        <WalletContextProvider>
          {/* دیکشنری مربوط به نوبار را پاس می‌دهیم */}
          <Navbar dict={dict.navbar} lang={lang} />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}