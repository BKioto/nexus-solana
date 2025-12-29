export const i18n = {
  // زبان پیش‌فرض (اگر کاربر زبانش تشخیص داده نشد)
  defaultLocale: 'fa',
  
  // لیست تمام زبان‌های مجاز در امپراتوری نکسوس
  locales: [
    'fa', // فارسی (Home Base)
    'ar', // عربی (Target 1: Wealth)
    'en', // انگلیسی (Global Face)
    'tr', // ترکی (Target 2: High Inflation Market)
    'pt', // پرتغالی (Target 3: Solana Hub in LATAM)
  ],
} as const;

export type Locale = (typeof i18n)['locales'][number];