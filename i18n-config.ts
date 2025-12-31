export const i18n = {
  // زبان پیش‌فرض
  defaultLocale: 'fa',
  
  // لیست تمام ۸ زبان فعال در امپراتوری نکسوس
  locales: [
    'fa', // فارسی
    'ar', // عربی
    'en', // انگلیسی
    'tr', // ترکی
    'pt', // پرتغالی
    'es', // اسپانیایی
    'ru', // روسی
    'id', // اندونزیایی
  ],
} as const;

export type Locale = (typeof i18n)['locales'][number];