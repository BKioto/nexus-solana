import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ⚠️ اضافه‌شده: ریدایرکتِ ۳۰۱ برای صفحه‌ی /partners که کامل حذف شد.
  // چون این پروژه از مسیریابی چندزبانه (app/[lang]) استفاده می‌کند، آدرس
  // واقعی همیشه یکی از /fa/partners، /en/partners، /ar/partners و... بوده،
  // نه فقط /partners. الگوی :lang هر ۸ زبان پشتیبانی‌شده را می‌گیرد و کاربر
  // را به صفحه‌ی اصلی همان زبان هدایت می‌کند — بدون خطای ۴۰۴.
  async redirects() {
    return [
      {
        source: '/:lang(en|fa|ar|es|id|pt|ru|tr)/partners',
        destination: '/:lang',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;