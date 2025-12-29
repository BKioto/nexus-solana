"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import Image from "next/image";

// رفع ارور Hydration: دکمه را به صورت داینامیک و فقط در سمت کلاینت لود می‌کنیم
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

interface NavbarProps {
  // این کامپوننت حالا بخش مربوط به نوبار را از دیکشنری دریافت می‌کند
  dict: {
    title: string;
    subtitle: string;
    connect_btn: string;
  };
  lang: string; // زبان فعلی (fa یا ar)
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // تابع تغییر زبان (سوییچ بین فارسی و عربی)
  const switchLanguage = () => {
    if (!pathname) return;
    
    // تشخیص زبان فعلی از آدرس
    // آدرس‌ها به صورت /fa/... یا /ar/... هستند
    const segments = pathname.split('/');
    const currentLang = segments[1]; // fa یا ar
    
    // تعیین زبان هدف
    const targetLang = currentLang === 'fa' ? 'ar' : 'fa';
    
    // جایگزینی زبان در آدرس و حفظ بقیه مسیر
    segments[1] = targetLang;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <nav className="flex items-center justify-between p-4 md:px-8 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50" dir="ltr">
      
      {/* سمت چپ (در حالت LTR): دکمه اتصال کیف پول و تغییر زبان */}
      <div className="flex items-center gap-3">
        {/* دکمه کیف پول */}
        <div dir="ltr">
            <WalletMultiButtonDynamic style={{
                backgroundColor: '#512da8',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                height: '40px',
                whiteSpace: 'nowrap',
                padding: '0 16px'
            }}>
              {dict.connect_btn}
            </WalletMultiButtonDynamic>
        </div>

        {/* دکمه تغییر زبان */}
        <button 
          onClick={switchLanguage}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-xl transition-all group h-[40px]"
          title={lang === 'fa' ? 'تغییر به عربی' : 'Change to Persian'}
        >
          <Globe className="w-5 h-5 text-gray-400 group-hover:text-[#14F195] transition-colors" />
          <span className="text-xs font-bold text-gray-300 uppercase">
            {lang === 'fa' ? 'AR' : 'FA'}
          </span>
        </button>
      </div>

      {/* سمت راست: لوگو و اسم */}
      <div className="flex items-center gap-3 flex-row-reverse">
        <div className="relative w-10 h-10">
          <img src="/icon.svg" alt="Nexus Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(20,241,149,0.5)]" />
        </div>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
            {dict.title}
          </span>
          <span className="text-[10px] text-gray-400 -mt-1 tracking-wider">
            {dict.subtitle}
          </span>
        </div>
      </div>

    </nav>
  );
}