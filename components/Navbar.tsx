"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// رفع ارور Hydration: دکمه کیف پول
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

interface NavbarProps {
  dict: {
    title: string;
    subtitle: string;
    connect_btn: string;
  };
  lang: string;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // لیست زبان‌های فعال با لینک تصویر پرچم (از CDN سریع FlagCDN)
  const languages = [
    { 
      code: 'fa', 
      label: 'فارسی', 
      flagUrl: 'https://flagcdn.com/w40/ir.png' // پرچم ایران
    },
    { 
      code: 'ar', 
      label: 'العربية', 
      flagUrl: 'https://flagcdn.com/w40/sa.png' // پرچم عربستان
    },
  ];

  // پیدا کردن زبان فعلی برای نمایش در دکمه اصلی
  const currentLang = languages.find(l => l.code === lang) || languages[0];

  // بستن منو وقتی بیرون کلیک شد
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // تابع تغییر زبان
  const handleLanguageChange = (targetLangCode: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    
    // اگر در ریشه بودیم و سگمنت زبان نداشتیم (محض احتیاط)
    if (segments.length < 2) {
       router.push(`/${targetLangCode}`);
       return;
    }

    segments[1] = targetLangCode; // fa یا ar را عوض می‌کند
    const newPath = segments.join('/');
    
    setIsOpen(false);
    router.push(newPath);
  };

  return (
    <nav className="flex items-center justify-between p-4 md:px-8 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50" dir="ltr">
      
      {/* سمت چپ: دکمه‌ها */}
      <div className="flex items-center gap-3">
        
        {/* ۱. دکمه اتصال کیف پول */}
        <div dir="ltr">
            <WalletMultiButtonDynamic style={{
                backgroundColor: '#512da8',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                height: '40px',
                whiteSpace: 'nowrap',
                padding: '0 16px',
                fontFamily: 'inherit'
            }}>
              {dict.connect_btn}
            </WalletMultiButtonDynamic>
        </div>

        {/* ۲. دراپ‌دان تغییر زبان (با عکس پرچم) */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 h-[40px] rounded-xl transition-all min-w-[90px] justify-between group"
          >
            <div className="flex items-center gap-2">
              {/* نمایش عکس پرچم */}
              <img 
                src={currentLang.flagUrl} 
                alt={currentLang.code} 
                className="w-5 h-auto rounded-sm object-cover shadow-sm"
              />
              <span className="text-xs font-bold text-gray-300 uppercase group-hover:text-white transition-colors">{currentLang.code}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* لیست کشویی */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-[#111621] border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLanguageChange(l.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-right ${lang === l.code ? 'bg-white/5' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {/* عکس پرچم در لیست */}
                    <img 
                      src={l.flagUrl} 
                      alt={l.label} 
                      className="w-5 h-auto rounded-sm object-cover shadow-sm"
                    />
                    <span className={`text-sm ${lang === l.code ? 'text-[#14F195] font-bold' : 'text-gray-300'}`}>
                      {l.label}
                    </span>
                  </div>
                  {lang === l.code && <Check className="w-4 h-4 text-[#14F195]" />}
                </button>
              ))}
            </div>
          )}
        </div>
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