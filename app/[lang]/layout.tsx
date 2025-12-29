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
// تغییر مهم: تایپ ورودی به Promise<{ lang: string }> تغییر کرد تا بیلد فیل نشود
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  // اینجا به سیستم می‌گوییم نگران نباش، این استرینگ همان Locale معتبر ماست
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
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
      // تنظیم لوکال بر اساس زبان فعلی
      locale: validLang === 'fa' ? 'fa_IR' : 'ar_SA',
      // آدرس داینامیک بر اساس زبان
      url: `https://nexus-solana-taupe.vercel.app/${validLang}`, 
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
// تغییر مهم: تایپ ورودی در اینجا هم به string تبدیل شد
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const validLang = lang as Locale; // تبدیل تایپ
  
  const dict = await getDictionary(validLang);
  
  // تعیین جهت صفحه (RTL برای فارسی/عربی)
  const dir = (validLang === 'fa' || validLang === 'ar') ? 'rtl' : 'ltr';

  return (
    <html lang={validLang} dir={dir}>
      <body className={`${vazir.className} bg-[#0B0F19] text-white antialiased`}>
        <WalletContextProvider>
          {/* دیکشنری مربوط به نوبار را پاس می‌دهیم */}
          <Navbar dict={dict.navbar} lang={validLang} />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}