import { getDictionary } from "../get-dictionary";
import { Locale } from "../../i18n-config";
import dynamic from "next/dynamic";
import { TokenForm } from "../../components/TokenForm";
import Script from "next/script";
import { Send } from "lucide-react";

// --- لود تنبل کانتنت سکشن ---
const ContentSection = dynamic(
  () => import('../../components/ContentSection').then((mod) => mod.ContentSection),
  {
    loading: () => <div className="w-full h-96 flex items-center justify-center text-gray-500 animate-pulse">Loading...</div>,
    ssr: true
  }
);

// تعریف ورودی‌های صفحه (زبان از آدرس می‌آید)
interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Home({ params }: PageProps) {
  // ۱. دریافت زبان از آدرس (await نیاز دارد چون در Next.js 15 پارامترها پرامیس هستند)
  const { lang } = await params;
  
  // ۲. دریافت دیکشنری مربوط به آن زبان
  const dict = await getDictionary(lang);
  
  // ۳. تنظیم جهت صفحه (فارسی/عربی -> RTL)
  const dir = (lang === 'fa' || lang === 'ar') ? 'rtl' : 'ltr';

  // --- دیتای JSON-LD برای گوگل (آپدیت شده با دیکشنری) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": dict.metadata.title,
    "alternateName": ["Nexus Solana", dict.navbar.title],
    "url": `https://nexus-solana-taupe.vercel.app/${lang}`,
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
      {/* بخش ۱: هیرو (بالای صفحه) - متصل به دیکشنری */}
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

      {/* فرم اصلی ساخت توکن (دیکشنری به آن پاس داده می‌شود) */}
      <div className="w-full z-10 mb-32">
        <TokenForm dict={dict} />
      </div>

      {/* -------------------------------------------------- */}
      {/* بخش ۲: محتوای آموزشی (دیکشنری به آن پاس داده می‌شود) */}
      {/* -------------------------------------------------- */}
      <div className="w-full z-10 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0B0F19] to-transparent -translate-y-full pointer-events-none"></div>
        <ContentSection dict={dict} lang={lang} />
      </div>

      {/* فوتر جدید (متصل به دیکشنری) */}
      <footer className="w-full text-center py-12 text-gray-600 text-sm border-t border-white/5 mt-12 bg-[#0B0F19]">
        
        {/* بخش دکمه تلگرام */}
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <a 
            href="https://t.me/Kioto_Osano" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#229ED9]/10 text-[#229ED9] px-6 py-3 rounded-full hover:bg-[#229ED9] hover:text-white transition-all border border-[#229ED9]/20 hover:scale-105"
          >
            <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            <span className="font-bold text-base">{dict.content.footer.telegram_btn}</span>
          </a>
          <p 
            className="text-gray-500 text-xs md:text-sm"
            dangerouslySetInnerHTML={{ __html: dict.content.footer.telegram_desc }}
          />
        </div>

        <p>{dict.content.footer.copyright}</p>
        <p className="mt-2 text-xs">{dict.content.footer.tagline}</p>
      </footer>

    </main>
  );
}