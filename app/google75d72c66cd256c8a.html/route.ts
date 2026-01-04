import { NextResponse } from 'next/server';

export async function GET() {
  // این کدی است که گوگل برای تایید مالکیت نیاز دارد
  const verificationCode = "google-site-verification: google75d72c66cd256c8a.html";

  return new NextResponse(verificationCode, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}