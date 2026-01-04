import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "../globals.css";
import { WalletContextProvider } from "../../components/WalletContextProvider";
import Navbar from "../../components/Navbar";
import { getDictionary } from "../get-dictionary";
import { Locale, i18n } from "../../i18n-config";
import Script from "next/script";

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

// --- تولید متادیتای هوشمند برای سئو ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);

  const baseUrl = "https://nexus-solana-taupe.vercel.app";

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    manifest: "/manifest.json",
    
    // ✅ تنظیمات حیاتی ربات‌های گوگل
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ✅ کد تایید جدید گوگل سرچ کنسول
    verification: {
      google: "8cWMZpAnmbxrh3GnAaleixYIEE5V9B6nhGt2pnh9eKk",
    },

    // لینک‌های کانونیکال و زبان‌های جایگزین
    alternates: {
      canonical: `${baseUrl}/${validLang}`,
      languages: {
        'fa': `${baseUrl}/fa`,
        'en': `${baseUrl}/en`,
        'ar': `${baseUrl}/ar`,
        'tr': `${baseUrl}/tr`,
        'pt': `${baseUrl}/pt`,
        'es': `${baseUrl}/es`,
        'ru': `${baseUrl}/ru`,
        'id': `${baseUrl}/id`,
      },
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
      locale: validLang === 'fa' ? 'fa_IR' : validLang === 'ar' ? 'ar_SA' : 'en_US',
      url: `${baseUrl}/${validLang}`,
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

// تولید مسیرهای استاتیک برای بیلد
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// --- کامپوننت اصلی لایوت ---
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  // تعیین جهت صفحه
  const dir = (validLang === 'fa' || validLang === 'ar') ? 'rtl' : 'ltr';

  // ✅ داده‌های ساختار یافته سازمانی (Global Schema)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexus Solana",
    "url": "https://nexus-solana-taupe.vercel.app",
    "logo": "https://nexus-solana-taupe.vercel.app/icon.png",
    "description": dict.metadata.description,
    "sameAs": [
      "https://t.me/Kioto_Osano"
    ]
  };

  return (
    <html lang={validLang} dir={dir}>
      <head>
        {/* تزریق اسکیمای سازمانی در تمام صفحات */}
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${vazir.className} bg-[#0B0F19] text-white antialiased`}>
        <WalletContextProvider>
          <Navbar dict={dict.navbar} lang={validLang} />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}