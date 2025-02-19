import { writeFile } from 'fs/promises';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = await headers();
  const authorization = headersList.get('authorization');

  if (!authorization || authorization !== `Bearer ${process.env.NEXT_PUBLIC_SESSION_PASSWORD}`) {
    return notFound();
  }

  try {
    const swEnvContent = `
      const process = {
        env: {
          FB_API_KEY: '${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}',
          FB_AUTHDOMAIN: '${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}',
          FB_PROJECTID: '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
          FB_STORAGEBUCKET: '${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}',
          FB_MESSAGINGSENDERID: '${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}',
          FB_APPID: '${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}',
          FB_MEASUREMENTID: '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}',
        }
      }
    `;

    await writeFile('./public/swenv.js', swEnvContent);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
