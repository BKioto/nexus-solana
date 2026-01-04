import { NextResponse } from 'next/server';

export async function GET() {
  // این دقیقاً همان متنی است که گوگل داخل فایل html دنبالش می‌گردد
  const verificationCode = "google-site-verification: google8cWMZpAnmbxrh3GnAaleixYIEE5V9B6nhGt2pnh9eKk.html";

  return new NextResponse(verificationCode, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}