"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

// رفع ارور Hydration: دکمه را به صورت داینامیک و فقط در سمت کلاینت لود می‌کنیم
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 md:px-8 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
      
      {/* سمت راست: لوگو و اسم */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <img src="/icon.svg" alt="Nexus Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(20,241,149,0.5)]" />
        </div>
        <div className="hidden md:flex flex-col">
          <span className="text-xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
            نکسوس سولانا
          </span>
          <span className="text-[10px] text-gray-400 -mt-1 tracking-wider">
            NEXUS SOLANA
          </span>
        </div>
      </div>

      {/* سمت چپ: دکمه اتصال کیف پول (نسخه بدون ارور) */}
      <div dir="ltr">
        <WalletMultiButtonDynamic style={{
            backgroundColor: '#512da8',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 'bold',
            height: '40px'
        }} />
      </div>

    </nav>
  );
}