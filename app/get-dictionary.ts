import 'server-only';
import type { Locale } from '@/i18n-config';

// تعریف مسیر فایل‌های دیکشنری برای هر زبان
const dictionaries = {
  // زبان‌های فعال (فارسی، عربی، انگلیسی، ترکی)
  fa: () => import('@/dictionaries/fa.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  tr: () => import('@/dictionaries/tr.json').then((module) => module.default), // ✅ ترکی فعال شد
  
  // زبان‌های رزرو (فعلاً فارسی لود می‌شود)
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