"use client";

import { Send, Heart, Library } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  dict: any;
  lang: string;
}

// عنوان مناسب برای بخش پشتیبانی بر اساس زبان
const getSupportTitle = (lang: string) => {
  switch(lang) {
    case 'fa': return "پشتیبانی و ارتباط با ما";
    case 'ar': return "الدعم والتواصل";
    case 'tr': return "Destek ve İletişim";
    case 'ru': return "Поддержка и контакты";
    case 'es': return "Soporte y Contacto";
    case 'pt': return "Suporte e Contato";
    case 'id': return "Dukungan & Kontak";
    default: return "Support & Contact";
  }
};

export default function Footer({ dict, lang }: FooterProps) {
  const t = dict.content.footer;
  const supportTitle = getSupportTitle(lang);

  return (
    // font-sans حذف شد تا فونت وزیر اعمال شود
    <footer className="relative border-t border-white/5 bg-[#0B0F19] pt-16 pb-8 overflow-hidden">
      {/* 1. پس‌زمینه مشبک مهندسی (Grid Background) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* بخش بالا: دکمه‌های پشتیبانی (جایگزین CTA امپراتوری) */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            {supportTitle}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-lg">
            {/* دکمه تلگرام */}
            <a 
              href="https://t.me/Kioto_Osano" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-xl border border-[#229ED9]/30 bg-[#229ED9]/10 px-8 py-4 text-base font-bold text-[#229ED9] transition-all hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9] hover:scale-105 hover:shadow-[0_0_20px_rgba(34,158,217,0.4)]"
            >
              <Send className="h-5 w-5" />
              {t.telegram_btn}
            </a>
          </div>
          
          {/* توضیحات تلگرام (Need help?) */}
          <p 
            className="mt-6 text-gray-500 text-xs md:text-sm"
            dangerouslySetInnerHTML={{ __html: t.telegram_desc }}
          />
        </div>

        {/* خط جداکننده */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* بخش پایین: کپی‌رایت و لینک همکاران */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* لوگو و لینک همکاران (Partners Link) */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-white tracking-wider">
              Nexus<span className="text-[#14F195]">Solana</span>
            </span>
            
            {/* لینک مخفی پارتنرها */}
            <Link 
              href={`/${lang}/partners`}
              title="Partners & Projects"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#14F195] hover:text-black transition-all opacity-60 hover:opacity-100 hover:scale-110"
            >
              <Library className="w-4 h-4" />
            </Link>
          </div>

          {/* متن کپی‌رایت */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-xs text-gray-500 font-mono" dir="ltr">
              {t.copyright}
            </p>
            <div className="flex items-center justify-center md:justify-end gap-2 text-xs text-gray-600 font-mono" dir="ltr">
              {t.tagline} <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}