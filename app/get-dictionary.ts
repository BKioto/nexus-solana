import 'server-only';
import type { Locale } from '@/i18n-config';

// تعریف مسیر فایل‌های دیکشنری برای هر زبان
const dictionaries = {
  // زبان‌های فعال (فارسی، عربی، انگلیسی)
  fa: () => import('@/dictionaries/fa.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default), // ✅ انگلیسی فعال شد و فایل خودش را می‌خواند
  
  // زبان‌های رزرو (فعلاً فارسی لود می‌کنند تا بعداً پر کنیم)
  tr: () => import('@/dictionaries/fa.json').then((module) => module.default),
  pt: () => import('@/dictionaries/fa.json').then((module) => module.default),
};

// تابع اصلی که صفحات از آن استفاده می‌کنند
export const getDictionary = async (locale: Locale) => {
  // بررسی می‌کند آیا تابعی برای این زبان داریم؟
  const dictionaryLoader = dictionaries[locale];
  
  // اگر زبان ناشناخته بود یا تعریف نشده بود، همان فارسی را برگردان
  if (!dictionaryLoader) {
    return dictionaries['fa']();
  }
  
  return dictionaryLoader();
};