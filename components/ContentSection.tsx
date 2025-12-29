"use client";

import { FC, useState } from "react";
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  Coins, 
  HelpCircle, 
  Rocket, 
  Lock, 
  TrendingUp, 
  Users, 
  Code, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface ContentSectionProps {
  dict: any; // دیکشنری کل سایت
  lang: string;
}

// --- کامپوننت آیتم‌های آکاردئونی برای سوالات متداول ---
// تغییر مهم: answer حالا یک رشته HTML است
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-6 flex items-center justify-between text-right focus:outline-none group"
      >
        <span className={`font-bold text-lg transition-colors text-right w-full ml-4 ${isOpen ? 'text-[#14F195]' : 'text-gray-300 group-hover:text-white'}`}>
          {question}
        </span>
        {isOpen ? <ChevronUp className="text-[#14F195] min-w-[24px]" /> : <ChevronDown className="text-gray-500 min-w-[24px]" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <div 
          className="text-gray-400 leading-8 text-sm md:text-base pr-4 border-r-2 border-[#14F195]/20 text-justify"
          // این خط باعث می‌شود تگ‌های HTML مثل <br> و <strong> داخل متن جیسون کار کنند
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>
    </div>
  );
};

export const ContentSection: FC<ContentSectionProps> = ({ dict, lang }) => {
  const t = dict.content; // میانبر به بخش محتوا

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 text-right space-y-32">
      
      {/* ---------------------------------------------------- */}
      {/* ۱. درباره ما و فلسفه نکسوس (The Who & The Why) */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-white leading-tight">
            {t.intro.title_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF]">{t.intro.title_gradient}</span> {t.intro.title_suffix}
            <br />
            <span className="text-2xl md:text-3xl text-gray-400 mt-2 block font-medium">{t.intro.subtitle}</span>
          </h2>
          {/* پاراگراف اول */}
          <p 
            className="text-gray-400 leading-9 text-lg text-justify mb-6"
            dangerouslySetInnerHTML={{ __html: t.intro.paragraph_1 }}
          />
          {/* پاراگراف دوم */}
          <p 
            className="text-gray-300 leading-9 text-lg text-justify"
            dangerouslySetInnerHTML={{ __html: t.intro.paragraph_2 }}
          />
        </div>
        <div className="bg-gradient-to-br from-[#111621] to-[#0B0F19] p-8 rounded-[40px] border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#14F195] to-[#9945FF]"></div>
          <div className="grid grid-cols-2 gap-6" dir="ltr">
            {/* آمارها به صورت LTR نمایش داده می‌شوند تا اعداد به هم نریزند */}
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-4xl font-bold text-white">{t.stats.stat_1_value}</h4>
              <p className="text-sm text-gray-500">{t.stats.stat_1_label}</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-4xl font-bold text-[#14F195]">{t.stats.stat_2_value}</h4>
              <p className="text-sm text-gray-500">{t.stats.stat_2_label}</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-4xl font-bold text-[#9945FF]">{t.stats.stat_3_value}</h4>
              <p className="text-sm text-gray-500">{t.stats.stat_3_label}</p>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-4xl font-bold text-white">{t.stats.stat_4_value}</h4>
              <p className="text-sm text-gray-500">{t.stats.stat_4_label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ۲. توکن به چه دردی می‌خورد؟ (Use Cases) */}
      {/* ---------------------------------------------------- */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#14F195] font-bold tracking-wider text-sm uppercase bg-[#14F195]/10 px-4 py-2 rounded-full">{t.use_cases.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 text-white">{t.use_cases.title}</h2>
          <p className="text-gray-400 mt-4 text-lg">{t.use_cases.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* کارت ۱: میم کوین */}
          <div className="bg-[#111621] p-8 rounded-3xl border border-gray-800 hover:border-[#9945FF]/50 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-[#9945FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#9945FF] transition-colors">
              <Rocket className="w-8 h-8 text-[#9945FF] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t.use_cases.card_1_title}</h3>
            <p className="text-gray-400 text-sm leading-7" dangerouslySetInnerHTML={{ __html: t.use_cases.card_1_desc }} />
          </div>

          {/* کارت ۲: سرمایه‌گذاری و پروژه */}
          <div className="bg-[#111621] p-8 rounded-3xl border border-gray-800 hover:border-[#14F195]/50 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-[#14F195]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#14F195] transition-colors">
              <TrendingUp className="w-8 h-8 text-[#14F195] group-hover:text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t.use_cases.card_2_title}</h3>
            <p className="text-gray-400 text-sm leading-7" dangerouslySetInnerHTML={{ __html: t.use_cases.card_2_desc }} />
          </div>

          {/* کارت ۳: وفاداری و کامیونیتی */}
          <div className="bg-[#111621] p-8 rounded-3xl border border-gray-800 hover:border-white/30 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
              <Users className="w-8 h-8 text-white group-hover:text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t.use_cases.card_3_title}</h3>
            <p className="text-gray-400 text-sm leading-7" dangerouslySetInnerHTML={{ __html: t.use_cases.card_3_desc }} />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ۳. مزیت رقابتی (Why Us) */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#111621] rounded-[40px] p-8 md:p-12 border border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.features.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Coins className="text-[#14F195]" />
            </div>
            <h4 className="font-bold text-white">{t.features.item_1_title}</h4>
            <p className="text-sm text-gray-400">{t.features.item_1_desc}</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Lock className="text-[#9945FF]" />
            </div>
            <h4 className="font-bold text-white">{t.features.item_2_title}</h4>
            <p className="text-sm text-gray-400">{t.features.item_2_desc}</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Code className="text-blue-400" />
            </div>
            <h4 className="font-bold text-white">{t.features.item_3_title}</h4>
            <p className="text-sm text-gray-400">{t.features.item_3_desc}</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Zap className="text-yellow-400" />
            </div>
            <h4 className="font-bold text-white">{t.features.item_4_title}</h4>
            <p className="text-sm text-gray-400">{t.features.item_4_desc}</p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ۴. سوالات متداول جامع (Mega FAQ) - حالا داینامیک شده */}
      {/* ---------------------------------------------------- */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.faq.title}</h2>
          <p className="text-gray-400">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-2">
          {/* حلقه زدن روی آرایه سوالات از فایل جیسون */}
          {t.faq.items.map((item: any, index: number) => (
            <FAQItem 
              key={index} 
              question={item.question} 
              answer={item.answer} 
            />
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ۵. دعوت به اقدام نهایی (Footer CTA) */}
      {/* ---------------------------------------------------- */}
      <div className="text-center py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6">{t.footer.cta_title}</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          {t.footer.cta_desc}
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#14F195] transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          {t.footer.cta_btn}
        </button>
      </div>

    </section>
  );
};