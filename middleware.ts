import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales: string[] = i18n.locales as unknown as string[];
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ۱. لیست سیاه برای جلوگیری از ریدایرکت فایل‌های سیستمی و Route گوگل
  const isSystemFile = [
    '/manifest.json',
    '/favicon.ico',
    '/logo.png',
    '/icon.png',
    '/icon.svg',
    '/robots.txt',
    '/sitemap.xml',
    '/sitemap.ts',
  ].some(path => pathname.includes(path)) 
  || pathname.toLowerCase().includes('google') // حیاتی برای Route گوگل
  || pathname.endsWith('.html') 
  || pathname.endsWith('.xml');

  if (isSystemFile) return;

  // ۲. بررسی نیاز به ریدایرکت زبان
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // ۳. ریدایرکت
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: [
    // این الگو می‌گوید: همه چیز را مدیریت کن به جز این لیست استثنا
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.html|.*\\.xml|robots.txt).*)',
  ],
};