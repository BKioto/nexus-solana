"use client";

import { 
  ExternalLink, 
  ShoppingBag, 
  Truck, 
  Gem, 
  Briefcase, 
  Network, 
  Bitcoin, 
  ArrowRight,
  Bot,
  LayoutDashboard, 
  Shirt,
  Code2
} from "lucide-react";
import Link from "next/link";

// لیست دقیق ۸ همکار تجاری (بدون نکسوس سولانا)
const partners = [
  // 1. Kiya Dev (مهم: لینک به شرکت مادر)
  {
    id: 1,
    title: "کیا دِو | امپراتوری نرم‌افزار",
    description: "تیم توسعه‌دهنده نخبه در زمینه طراحی وب‌سایت‌های اختصاصی، اپلیکیشن‌های موبایل (Flutter & React Native)، بلاکچین و هوش مصنوعی.",
    features: ["توسعه دهنده اصلی", "بلاکچین و Web3", "هوش مصنوعی"],
    url: "https://kiyadev.ir", 
    icon: Code2,
    color: "text-blue-400",
    borderColor: "group-hover:border-blue-500/50",
    glow: "group-hover:shadow-blue-500/20",
    bgIcon: "bg-blue-500/10"
  },
  // 2. Tivan Ex
  {
    id: 2,
    title: "صرافی تیوان اکس | TivanEx",
    description: "پلتفرم معاملاتی نسل ۳ با امنیت سایبری در کلاس جهانی. خرید و فروش آنی بیت‌کوین و تتر با موتور مچینگ فراصوت و کیف پول سرد.",
    features: ["بلاکچین و Web3", "امنیت بانکی", "تراکنش آنی"],
    url: "https://tivan-ex.vercel.app", 
    icon: Bitcoin,
    color: "text-emerald-400",
    borderColor: "group-hover:border-emerald-500/50",
    glow: "group-hover:shadow-emerald-500/20",
    bgIcon: "bg-emerald-500/10"
  },
  // 3. Mind Orbit
  {
    id: 3,
    title: "مایند اوربیت | هوش مصنوعی",
    description: "دستیار هوشمند مبتنی بر مدل‌های پیشرفته زبانی (LLM). پاسخگویی به سوالات، تولید محتوا، کدنویسی و حل مسائل پیچیده با پشتیبانی کامل فارسی.",
    features: ["چت‌بات هوشمند", "تولید محتوا و کد", "مدل زبانی Gemini"],
    url: "https://mind-orbit-lyart.vercel.app",
    icon: Bot,
    color: "text-cyan-400",
    borderColor: "group-hover:border-cyan-500/50",
    glow: "group-hover:shadow-cyan-500/20",
    bgIcon: "bg-cyan-500/10"
  },
  // 4. Alpha System
  {
    id: 4,
    title: "آلفا سیستم | داشبورد مدیریتی",
    description: "سامانه جامع مدیریت منابع سازمانی (ERP). مدیریت هوشمند پرسنل، حقوق و دستمزد، و کنترل پروژه‌ها با ابزارهای بصری و نمودارهای تحلیلی.",
    features: ["پنل مدیریت ERP", "مدیریت پروژه‌ها", "تحلیل داده‌ها"],
    url: "https://alpha-system-eight.vercel.app",
    icon: LayoutDashboard,
    color: "text-orange-400",
    borderColor: "group-hover:border-orange-500/50",
    glow: "group-hover:shadow-orange-500/20",
    bgIcon: "bg-orange-500/10"
  },
  // 5. Luxe Shop
  {
    id: 5,
    title: "لوکس شاپ | استایل و مد",
    description: "فروشگاه اینترنتی مدرن پوشاک و اکسسوری. تجربه خریدی لوکس با رابط کاربری مینیمال، سبد خرید هوشمند و فرآیند پرداخت آسان.",
    features: ["فروشگاه آنلاین", "مد و فشن", "تجربه کاربری عالی"],
    url: "https://luxe-shop-ten.vercel.app",
    icon: Shirt,
    color: "text-indigo-400",
    borderColor: "group-hover:border-indigo-500/50",
    glow: "group-hover:shadow-indigo-500/20",
    bgIcon: "bg-indigo-500/10"
  },
  // 6. Coconut (فروشگاه)
  {
    id: 6,
    title: "فروشگاه آنلاین کوکونات",
    description: "بازار آنلاین میوه و پروتئین شهر پرند. خرید آنلاین تازه‌ترین محصولات با تحویل فوری درب منزل. تجربه‌ای راحت و سریع برای شهروندان.",
    features: ["مارکت‌پلیس محلی", "لجستیک هوشمند", "تحویل فوری"],
    url: "https://cocodelivery.ir", 
    icon: Truck,
    color: "text-green-400",
    borderColor: "group-hover:border-green-500/50",
    glow: "group-hover:shadow-green-500/20",
    bgIcon: "bg-green-500/10"
  },
  // 7. Alef Gem
  {
    id: 7,
    title: "گالری جواهرات اَلِف جِم",
    description: "طراحی و ساخت جواهرات دست‌ساز با طلای ۱۸ عیار و سنگ‌های قیمتی اصل. ترکیب هنر مینیمال و مدرن برای خلق آثار ماندگار.",
    features: ["لوکس و فشن", "سنگ‌های قیمتی", "طراحی اختصاصی"],
    url: "https://alefgem.com", 
    icon: Gem,
    color: "text-purple-400",
    borderColor: "group-hover:border-purple-500/50",
    glow: "group-hover:shadow-purple-500/20",
    bgIcon: "bg-purple-500/10"
  },
  // 8. Soughat Shop
  {
    id: 8,
    title: "سوغات شاپ اینترنشنال",
    description: "اولین پلتفرم ارسال هدیه به ایران با پرداخت ارزی و کریپتو. پل ارتباطی ایرانیان خارج از کشور با عزیزانشان.",
    features: ["پرداخت کریپتو", "فین‌تک فرامرزی", "E-Commerce"],
    url: "https://soughat.shop", 
    icon: ShoppingBag,
    color: "text-rose-400",
    borderColor: "group-hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20",
    bgIcon: "bg-rose-500/10"
  }
];

export default function PartnersPage() {
  return (
    // font-sans حذف شد تا فونت وزیر اعمال شود
    <div className="min-h-screen bg-[#0B0F19] pt-28 pb-10 px-4 sm:px-8 relative overflow-hidden text-right" dir="rtl">
      
      {/* بک‌گراند نوری متناسب با تم نکسوس */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl z-10 relative">
        
        {/* هدر صفحه */}
        <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#14F195] mb-6 transition-colors text-sm">
                <ArrowRight className="w-4 h-4 rotate-180" />
                بازگشت به خانه
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    <Network className="text-[#14F195] w-8 h-8" />
                </div>
                شبکه پروژه‌ها و همکاران
            </h1>
            <p className="text-gray-400 max-w-2xl leading-8 text-lg">
                نکسوس سولانا بخشی از یک اکوسیستم بزرگ فناوری است. در اینجا می‌توانید تمامی پروژه‌های توسعه یافته توسط تیم ما و شرکای تجاری معتبر را مشاهده کنید.
            </p>
        </div>

        {/* گرید کارت‌ها */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="dofollow" 
              className={`group relative flex flex-col justify-between rounded-3xl border border-gray-800 bg-[#111621] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${partner.borderColor} ${partner.glow}`}
            >
              <div>
                {/* هدر کارت */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-2xl p-3 border border-white/5 ${partner.bgIcon} ${partner.color}`}>
                    <partner.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="rounded-full bg-black/20 border border-white/10 px-3 py-1 flex items-center gap-1">
                     <Briefcase size={12} className="text-gray-500" />
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Verified</span>
                  </div>
                </div>

                <h2 className="mb-3 text-xl font-bold text-white group-hover:text-[#14F195] transition-colors">
                  {partner.title}
                </h2>
                
                <p className="text-sm leading-7 text-gray-400 mb-6 text-justify opacity-80 group-hover:opacity-100 transition-opacity">
                  {partner.description}
                </p>

                {/* تگ‌ها */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {partner.features.map((feature, idx) => (
                    <span key={idx} className="text-[11px] bg-black/30 text-gray-400 border border-white/5 px-2.5 py-1 rounded-lg">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* فوتر کارت */}
              <div className="mt-auto border-t border-white/5 pt-4 flex items-center justify-between">
                <span className={`text-xs font-bold transition-colors ${partner.color}`}>
                  مشاهده وب‌سایت
                </span>
                <div className="flex items-center gap-2 text-gray-600 group-hover:text-white transition-colors dir-ltr">
                  <span className="text-xs font-mono hidden sm:inline-block tracking-wider opacity-50">{partner.url.replace('https://', '')}</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}