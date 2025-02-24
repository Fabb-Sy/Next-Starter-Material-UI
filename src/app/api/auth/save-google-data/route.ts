import { getSessionGoogle } from "@/lib/next-auth/action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, image } = await req.json();
    const session = await getSessionGoogle();

    // Save Google user data to Iron Session
    session.googleUser = {
      email,
      name,
      image
    };
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
  }
}
