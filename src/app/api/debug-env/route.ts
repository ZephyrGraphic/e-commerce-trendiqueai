import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    googleClientIdExists: !!process.env.GOOGLE_CLIENT_ID,
    googleClientIdPrefix: process.env.GOOGLE_CLIENT_ID?.substring(0, 10),
    betterAuthSecretExists: !!process.env.BETTER_AUTH_SECRET,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    nextPublicAppUrl: process.env.NEXT_PUBLIC_APP_URL,
  });
}
