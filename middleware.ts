import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// تابع تشخیص زبان کاربر بر اساس تنظیمات مرورگرش
function getLocale(request: NextRequest): string | undefined {
  // هدرهای درخواست را تبدیل می‌کنیم به چیزی که کتابخانه negotiator بفهمد
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // زبان‌های مورد قبول مرورگر کاربر (مثلاً: en-US, ar-SA, fa-IR)
  // @ts-ignore locales are readonly
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  // زبان‌های مجاز سایت ما (fa, ar, en, tr, pt)
  const locales: string[] = i18n.locales as unknown as string[];

  // تطبیق دادن زبان کاربر با زبان‌های ما (اگر پیدا نشد، زبان پیش‌فرض i18n.defaultLocale را برمی‌گرداند)
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ۱. بررسی فایل‌های سیستمی که نباید تغییر زبان داشته باشند (عکس‌ها، ربات‌ها، فونت‌ها)
  // این لیست خیلی مهم است تا عکس‌های سایت خراب نشوند
  const isSystemFile = [
    '/manifest.json',
    '/favicon.ico',
    '/logo.png',
    '/icon.png',
    '/icon.svg',
    '/robots.txt',
    '/sitemap.xml',
    '/sitemap.ts',
  ].some(path => pathname.includes(path));

  if (isSystemFile) return;

  // ۲. بررسی اینکه آیا آدرس فعلی، خودش زبان دارد یا نه؟
  // مثلاً /fa/about یا /ar/token
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // ۳. اگر زبان نداشت، زبان مناسب را پیدا کن و رایرکت کن
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // رایرکت به آدرس جدید (مثلاً از / به /fa)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

// تنظیمات مچر (Matcher)
// این بخش می‌گوید که میدل‌ور روی کدام آدرس‌ها فعال باشد
export const config = {
  matcher: [
    // همه مسیرها را چک کن به جز فایل‌های استاتیک داخلی نکست و API ها
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};