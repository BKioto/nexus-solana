"use client";

import { FC, useState } from "react";
import { Upload } from "lucide-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createToken } from "../utils/tokenCreator";
import { uploadFileToIPFS, uploadMetadataToIPFS } from "../utils/pinata";

export const TokenForm: FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  
  // متغیرهای ذخیره اطلاعات
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // تابع کمکی برای نمایش خوشگل اعداد (سه رقم سه رقم)
  const formatNumber = (num: string) => {
    if (!num) return "";
    return Number(num).toLocaleString('fa-IR');
  };

  // --- موتور اصلی ساخت توکن ---
  const handleCreate = async () => {
    // ۱. بررسی‌های اولیه
    if (!wallet.publicKey) {
      setStatus("❌ لطفاً ابتدا کیف پول خود را وصل کنید.");
      return;
    }
    if (!file || !name || !symbol || !supply) {
      setStatus("⚠️ لطفاً تمام فیلدها (نام، نماد، تعداد و عکس) را پر کنید.");
      return;
    }

    try {
      setLoading(true);
      setStatus("📤 در حال آپلود لوگو به سرورهای جهانی (IPFS)...");

      // ۲. آپلود عکس به پیناتا
      const imageHash = await uploadFileToIPFS(file);
      
      setStatus("📝 در حال ساخت شناسنامه دیجیتال توکن...");
      // ۳. ساخت فایل JSON مشخصات و آپلود آن
      const metadataUri = await uploadMetadataToIPFS(name, symbol, "Created with Nexus Solana", imageHash);
      console.log("Metadata URI:", metadataUri);

      setStatus("⏳ لطفاً تراکنش را در کیف پول خود تایید کنید...");
      
      // ۴. ارسال دستور ساخت به بلاکچین
      const { signature, mintAddress } = await createToken(
        connection, 
        wallet,
        name,
        symbol,
        metadataUri,
        Number(supply)
      );
      
      console.log("Token Created:", mintAddress);
      setStatus(`✅ تبریک! توکن شما با موفقیت ساخته شد!\nآدرس: ${mintAddress}\n(چند دقیقه صبر کنید تا عکس در کیف پول ظاهر شود)`);
      
    } catch (error: any) {
      console.error(error);
      setStatus(`❌ خطا در عملیات: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-4 p-1">
      <div className="bg-[#111621] border border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-500/10">
        
        <h2 className="text-2xl font-bold text-center mb-2 text-white">مشخصات توکن</h2>
        <p className="text-gray-400 text-sm text-center mb-8">این اطلاعات برای همیشه در بلاکچین ثبت می‌شوند.</p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* آپلود لوگو */}
          <div className="flex flex-col items-center justify-center gap-3">
            <span className="text-sm text-gray-300 font-medium">لوگوی توکن (Logo)</span>
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-600 rounded-2xl cursor-pointer hover:border-[#14F195] hover:bg-gray-800/50 transition-all group overflow-hidden">
              {file ? (
                <div className="relative w-full h-full">
                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover"/>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-500 group-hover:text-[#14F195] mb-2 transition-colors" />
                  <p className="text-[10px] text-gray-500 text-center px-2">انتخاب تصویر</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/png, image/jpeg, image/gif" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
            </label>
            <p className="text-[10px] text-gray-500">فرمت: PNG یا JPG (مربع و زیر ۱ مگابایت)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* نام توکن */}
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium text-gray-300 block pr-1">نام توکن (Name)</label>
              <input 
                type="text" 
                placeholder="Example: Solana Nexus" 
                className="w-full bg-[#0B0F19] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14F195] transition-all text-left dir-ltr placeholder:text-gray-600" 
                dir="ltr"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-[11px] text-gray-500 pr-1 text-right">
                نام کامل ارز (پیشنهاد: از حروف انگلیسی استفاده کنید تا در تمام کیف‌بول‌ها درست نمایش داده شود).
              </p>
            </div>

            {/* نماد توکن */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block pr-1">نماد (Symbol)</label>
              <input 
                type="text" 
                placeholder="NEX" 
                maxLength={10} 
                className="w-full bg-[#0B0F19] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14F195] transition-all text-center font-mono uppercase placeholder:text-gray-600"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
              <p className="text-[11px] text-gray-500 pr-1 text-right">
                مخفف انگلیسی (مثل BTC). در سولانا نمادها یکتا نیستند.
              </p>
            </div>

            {/* تعداد توکن (با نمایشگر هوشمند) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block pr-1">تعداد (Supply)</label>
              <input 
                type="number" 
                placeholder="1000000000" 
                className="w-full bg-[#0B0F19] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14F195] transition-all text-center font-mono placeholder:text-gray-600"
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
              />
              {/* نمایشگر زنده تعداد به فرمت خوانا */}
              {supply && (
                <div className="text-center">
                    <span className="text-xs text-[#14F195] font-bold bg-[#14F195]/10 px-2 py-1 rounded-md">
                        {formatNumber(supply)} عدد
                    </span>
                </div>
              )}
              <p className="text-[11px] text-gray-500 pr-1 text-right">
                تعداد کل سکه‌ها (پیشنهاد: ۱ میلیارد).
              </p>
            </div>
          </div>

          {/* باکس وضعیت */}
          {status && (
            <div className={`p-4 rounded-xl text-sm text-center whitespace-pre-line ${status.includes("❌") || status.includes("⚠️") ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
              {status}
            </div>
          )}

          {/* باکس هزینه */}
          <div className="bg-[#14F195]/5 border border-[#14F195]/20 rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm text-gray-300">هزینه ثابت ساخت:</span>
            <div className="text-right">
              <span className="block text-lg font-bold text-[#14F195]">0.02 SOL</span>
            </div>
          </div>

          {/* دکمه اصلی */}
          <button 
            onClick={handleCreate}
            disabled={loading || !wallet.publicKey}
            className="w-full py-4 rounded-xl font-bold text-lg text-black bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:shadow-[0_0_20px_-5px_rgba(20,241,149,0.4)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "در حال پردازش..." : "ساخت توکن 🚀"}
          </button>
          
        </form>
      </div>
    </div>
  );
};