import { getDictionary } from "../get-dictionary";
import { Locale } from "../../i18n-config";
import dynamic from "next/dynamic";
import { TokenForm } from "../../components/TokenForm";
import Footer from "../../components/Footer"; // ✅ ایمپورت فوتر جدید
import Script from "next/script";

// --- لود تنبل کانتنت سکشن ---
const ContentSection = dynamic(
  () => import('../../components/ContentSection').then((mod) => mod.ContentSection),
  {
    loading: () => <div className="w-full h-96 flex items-center justify-center text-gray-500 animate-pulse">Loading...</div>,
    ssr: true
  }
);

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: PageProps) {
  // ۱. دریافت زبان از آدرس
  const { lang } = await params;
  
  // تبدیل string به تایپ Locale
  const validLang = lang as Locale;
  
  // ۲. دریافت دیکشنری مربوط به آن زبان
  const dict = await getDictionary(validLang);
  
  // ۳. تنظیم جهت صفحه (فارسی/عربی -> RTL)
  const dir = (validLang === 'fa' || validLang === 'ar') ? 'rtl' : 'ltr';

  // --- دیتای JSON-LD برای گوگل ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": dict.metadata.title,
    "alternateName": ["Nexus Solana", dict.navbar.title],
    "url": `https://nexus-solana-taupe.vercel.app/${validLang}`,
    "description": dict.metadata.description,
    "applicationCategory": "Blockchain Application",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0.02",
      "priceCurrency": "SOL"
    },
    "featureList": "No-code token minting, IPFS Metadata storage, Instant deployment",
    "softwareVersion": "1.0"
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#0B0F19] text-white p-4 relative overflow-hidden pt-24 md:pt-32" dir={dir}>
      
      {/* تزریق دیتای سئو */}
      <Script
        id="seo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* افکت نور پس‌زمینه */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      {/* -------------------------------------------------- */}
      {/* بخش ۱: هیرو (بالای صفحه) */}
      {/* -------------------------------------------------- */}
      <div className="text-center mb-10 w-full max-w-5xl px-4 z-10 animate-fade-in-down">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent py-2 block">
            {dict.hero.title_highlight}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
          {dict.hero.description}
          <br />
          <span className="text-sm md:text-base text-gray-500 mt-2 block bg-white/5 w-fit mx-auto px-4 py-1 rounded-full border border-white/10 flex gap-4 justify-center items-center">
             <span>{dict.hero.tag_fast}</span>
             <span>{dict.hero.tag_cheap}</span>
             <span>{dict.hero.tag_nocode}</span>
          </span>
        </p>
      </div>

      {/* فرم اصلی ساخت توکن */}
      <div className="w-full z-10 mb-32">
        <TokenForm dict={dict} />
      </div>

      {/* -------------------------------------------------- */}
      {/* بخش ۲: محتوای آموزشی */}
      {/* -------------------------------------------------- */}
      <div className="w-full z-10 relative mb-12">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0B0F19] to-transparent -translate-y-full pointer-events-none"></div>
        <ContentSection dict={dict} lang={validLang} />
      </div>

      {/* -------------------------------------------------- */}
      {/* بخش ۳: فوتر جدید (متصل به کامپوننت جداگانه) */}
      {/* -------------------------------------------------- */}
      <div className="w-full z-10 -mx-4 md:-mx-8">
        <Footer dict={dict} lang={validLang} />
      </div>

    </main>
  );
}