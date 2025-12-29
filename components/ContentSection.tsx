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

// --- کامپوننت آیتم‌های آکاردئونی برای سوالات متداول ---
const FAQItem = ({ question, answer }: { question: string, answer: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-6 flex items-center justify-between text-right focus:outline-none group"
      >
        <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-[#14F195]' : 'text-gray-300 group-hover:text-white'}`}>
          {question}
        </span>
        {isOpen ? <ChevronUp className="text-[#14F195]" /> : <ChevronDown className="text-gray-500" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <div className="text-gray-400 leading-8 text-sm md:text-base pr-4 border-r-2 border-[#14F195]/20">
          {answer}
        </div>
      </div>
    </div>
  );
};

export const ContentSection: FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 text-right space-y-32" dir="rtl">
      
      {/* ---------------------------------------------------- */}
      {/* ۱. درباره ما و فلسفه نکسوس (The Who & The Why) */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-white leading-tight">
            ما <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF]">نکسوس سولانا</span> هستیم.
            <br />
            <span className="text-2xl md:text-3xl text-gray-400 mt-2 block font-medium">پایان دوران کدنویسی‌های گران.</span>
          </h2>
          <p className="text-gray-400 leading-9 text-lg text-justify mb-6">
            دنیای بلاکچین نباید در انحصار برنامه‌نویسان باشد. تا دیروز، اگر می‌خواستید یک توکن یا ارز دیجیتال روی شبکه سولانا بسازید، باید به زبان برنامه‌نویسی Rust مسلط می‌بودید یا هزاران دلار به توسعه‌دهندگان پرداخت می‌کردید. ما این سد را شکستیم.
          </p>
          <p className="text-gray-300 leading-9 text-lg text-justify">
            <strong>نکسوس سولانا (Nexus Solana)</strong> یک پلتفرم "بدون کد" (No-Code) است که به شما اجازه می‌دهد در کمتر از ۱ دقیقه، توکن شخصی خود را با استاندارد جهانی SPL روی شبکه سولانا ضرب (Mint) کنید. تمرکز اصلی ما ارائه خدمات به کاربران <strong>ایرانی و خاورمیانه</strong> است؛ بازاری که توسط سرویس‌های جهانی نادیده گرفته شده است. ما اینجاییم تا قدرت را به مردم عادی برگردانیم.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#111621] to-[#0B0F19] p-8 rounded-[40px] border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#14F195] to-[#9945FF]"></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-4xl font-bold text-white">100%</h4>
              <p className="text-sm text-gray-500">مالکیت کامل توکن</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-bold text-[#14F195]">&lt;1 min</h4>
              <p className="text-sm text-gray-500">زمان ساخت</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-bold text-[#9945FF]">Low</h4>
              <p className="text-sm text-gray-500">کارمزد رقابتی</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-bold text-white">SPL</h4>
              <p className="text-sm text-gray-500">استاندارد جهانی</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ۲. توکن به چه دردی می‌خورد؟ (Use Cases) */}
      {/* ---------------------------------------------------- */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#14F195] font-bold tracking-wider text-sm uppercase bg-[#14F195]/10 px-4 py-2 rounded-full">کاربردهای واقعی</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 text-white">با ساخت توکن چه کارهایی می‌توان کرد؟</h2>
          <p className="text-gray-400 mt-4 text-lg">توکن فقط یک "ارز" نیست؛ یک ابزار برای ساخت جامعه، سرمایه و سرگرمی است.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* کارت ۱: میم کوین */}
          <div className="bg-[#111621] p-8 rounded-3xl border border-gray-800 hover:border-[#9945FF]/50 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-[#9945FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#9945FF] transition-colors">
              <Rocket className="w-8 h-8 text-[#9945FF] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">میم کوین (Meme Coin)</h3>
            <p className="text-gray-400 text-sm leading-7">
              محبوب‌ترین کاربرد حال حاضر! مثل <strong>BONK</strong> یا <strong>WIF</strong>. 
              شما می‌توانید برای شوخی، کامیونیتی تلگرامی، یا حیوان خانگی‌تان یک توکن بسازید. اگر جامعه‌ای پشت آن باشد، ارزشش هزاران برابر می‌شود.
            </p>
          </div>

          {/* کارت ۲: سرمایه‌گذاری و پروژه */}
          <div className="bg-[#111621] p-8 rounded-3xl border border-gray-800 hover:border-[#14F195]/50 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-[#14F195]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#14F195] transition-colors">
              <TrendingUp className="w-8 h-8 text-[#14F195] group-hover:text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">توکن ابزاری (Utility)</h3>
            <p className="text-gray-400 text-sm leading-7">
              برای پروژه‌های جدی. مثلاً توکنی برای پرداخت درون یک بازی، حق اشتراک یک سایت خاص، یا سهام یک شرکت نوپا.
              این توکن‌ها پشتوانه فنی یا خدماتی دارند.
            </p>
          </div>

          {/* کارت ۳: وفاداری و کامیونیتی */}
          <div className="bg-[#111621] p-8 rounded-3xl border border-gray-800 hover:border-white/30 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
              <Users className="w-8 h-8 text-white group-hover:text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">باشگاه مشتریان</h3>
            <p className="text-gray-400 text-sm leading-7">
              به جای کارت امتیاز کاغذی، به مشتریان کافه یا فروشگاهتان توکن بدهید!
              مشتریان می‌توانند توکن‌ها را جمع کنند و با خدمات رایگان تعویض کنند یا حتی به دیگران بفروشند.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ۳. مزیت رقابتی (Why Us) */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#111621] rounded-[40px] p-8 md:p-12 border border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">چرا نکسوس بهترین انتخاب است؟</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Coins className="text-[#14F195]" />
            </div>
            <h4 className="font-bold text-white">هزینه بسیار پایین</h4>
            <p className="text-sm text-gray-400">فقط 0.02 سولانا کارمزد سرویس، که در برابر هزینه ۵۰۰ دلاری استخدام برنامه‌نویس تقریباً رایگان است.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Lock className="text-[#9945FF]" />
            </div>
            <h4 className="font-bold text-white">امنیت کامل</h4>
            <p className="text-sm text-gray-400">ما به کلید خصوصی (Private Key) شما دسترسی نداریم. همه چیز توسط کیف پول خودتان امضا می‌شود.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Code className="text-blue-400" />
            </div>
            <h4 className="font-bold text-white">بدون کدنویسی</h4>
            <p className="text-sm text-gray-400">رابط کاربری ساده و فارسی. نیازی نیست حتی یک خط کد بلد باشید. همه چیز ویژوال است.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <Zap className="text-yellow-400" />
            </div>
            <h4 className="font-bold text-white">سرعت نور</h4>
            <p className="text-sm text-gray-400">به لطف شبکه قدرتمند سولانا، ساخت توکن شما در کسری از ثانیه انجام می‌شود.</p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ۴. سوالات متداول جامع (Mega FAQ) */}
      {/* ---------------------------------------------------- */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">سوالات متداول شما</h2>
          <p className="text-gray-400">پاسخ به تمام سوالاتی که ممکن است داشته باشید.</p>
        </div>

        <div className="space-y-2">
          <FAQItem 
            question="آیا ساخت توکن هزینه دارد؟" 
            answer="بله، اما بسیار ناچیز. شبکه سولانا برای ساخت اکانت توکن و ذخیره عکس شما مقداری هزینه (Rent) کسر می‌کند. علاوه بر آن، سرویس نکسوس مبلغ ثابت 0.02 SOL را به عنوان کارمزد دریافت می‌کند. در مجموع شما باید حدود 0.03 تا 0.04 سولانا در کیف پولتان داشته باشید."
          />
          <FAQItem 
            question="آیا این توکن‌ها واقعی هستند و می‌توان فروخت؟" 
            answer={
              <span>
                بله، ۱۰۰٪ واقعی. توکن‌هایی که اینجا می‌سازید از استاندارد رسمی SPL Token سولانا پیروی می‌کنند. دقیقاً مثل توکن‌هایی که در صرافی‌ها می‌بینید. 
                <br/><br/>
                <strong>نکته مهم:</strong> برای اینکه توکن شما قیمت پیدا کند و قابل خرید و فروش شود، باید بعد از ساخت، آن را در یک صرافی غیرمتمرکز (DEX) مثل <strong>Raydium</strong> لیست کنید و مقداری نقدینگی (Liquidity) بگذارید.
              </span>
            }
          />
          <FAQItem 
            question="من هیچی بلد نیستم، از کجا شروع کنم؟" 
            answer="خیلی ساده است: ۱. کیف پول Phantom را روی گوشی یا مرورگر کروم نصب کنید. ۲. مقداری سولانا بخرید و به کیف پول بریزید. ۳. دکمه اتصال کیف پول در بالای همین سایت را بزنید. ۴. فرم را پر کنید و دکمه ساخت را بزنید. تمام!"
          />
          <FAQItem 
            question="آیا شما به کیف پول من دسترسی دارید؟" 
            answer="خیر. نکسوس یک پلتفرم غیرمتمرکز (Dapp) است. ما هیچ دیتابیسی از کاربران نداریم و به رمز عبور یا کلمات بازیابی شما دسترسی نداریم. تراکنش‌ها مستقیماً بین مرورگر شما و بلاکچین سولانا انجام می‌شود."
          />
          <FAQItem 
            question="بعد از ساخت توکن، عکسش کجا می‌رود؟" 
            answer="عکس توکن شما به صورت همیشگی در فضای ابری غیرمتمرکز IPFS (توسط سرویس Pinata) ذخیره می‌شود. این یعنی هیچکس نمی‌تواند عکس توکن شما را پاک کند یا تغییر دهد."
          />
          <FAQItem 
            question="آتوریتی (Authority) چیست و دست کیست؟" 
            answer="در نکسوس، تمام دسترسی‌های مدیریتی توکن (Mint Authority و Freeze Authority) به صورت پیش‌فرض به آدرس کیف پول خودِ شما (سازنده) داده می‌شود. شما مالک مطلق توکن هستید. اگر بخواهید می‌توانید بعداً این دسترسی‌ها را بسوزانید (Revoke) تا اعتماد خریداران را جلب کنید."
          />
          <FAQItem 
            question="تفاوت سولانا (Solana) با اتریوم و بایننس چیست؟" 
            answer="سولانا سریع‌ترین و ارزان‌ترین بلاکچین حال حاضر دنیاست. ساخت توکن در اتریوم ممکن است ۵۰ دلار هزینه داشته باشد، اما در سولانا این کار با چند دلار انجام می‌شود. به همین دلیل است که میم‌کوین‌ها در سولانا منفجر شده‌اند."
          />
          <FAQItem 
            question="چطور توکنم را در صرافی Raydium لیست کنم؟" 
            answer="بعد از اینکه توکن را در نکسوس ساختید، به سایت Raydium.io بروید. در بخش Liquidity، گزینه Create Pool را بزنید. توکن خود را انتخاب کنید و در مقابلش مقداری سولانا بگذارید. (مثلاً ۱۰۰ میلیون توکن + ۵ سولانا). با این کار بازار توکن شما ساخته می‌شود و مردم می‌توانند آن را بخرند."
          />
          <FAQItem 
            question="آیا می‌توانم بعداً نام یا عکس توکن را عوض کنم؟" 
            answer="بله، چون در نکسوس توکن‌ها با استاندارد Metaplex ساخته می‌شوند و ویژگی isMutable فعال است، شما می‌توانید با ابزارهای مدیریت توکن، متادیتای آن را ویرایش کنید. البته تا زمانی که دسترسی ویرایش را نسوزانده باشید."
          />
           <FAQItem 
            question="من ایرانی هستم، آیا تحریم مشکل‌ساز می‌شود؟" 
            answer="خیر. ماهیت بلاکچین و وب ۳ (Web3) این است که هیچ مرز و ملیتی نمی‌شناسد. کیف پول شما هویت شماست و هیچکس نمی‌تواند آن را مسدود کند. نکسوس هم هیچ فیلتری روی کاربران ایرانی اعمال نمی‌کند."
          />
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ۵. دعوت به اقدام نهایی (Footer CTA) */}
      {/* ---------------------------------------------------- */}
      <div className="text-center py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6">آماده‌اید امپراتوری خود را بسازید؟</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          فرصت‌ها منتظر نمی‌مانند. همین حالا اولین توکن خود را بسازید و وارد دنیای میلیاردی ارزهای دیجیتال شوید.
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#14F195] transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          شروع ساخت توکن 🚀
        </button>
      </div>

    </section>
  );
};