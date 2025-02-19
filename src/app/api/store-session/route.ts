import { deleteJWT, getJWT, storeJWT } from "@/lib/iron-session/action";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

// Store cookie
export async function POST(request: Request) {
  const { json } = await request.json();
  await storeJWT(json);
  return Response.json({ message: 'token stored' }, { status: 200 });
}

// Get cookie
export async function GET() {
  const headersList = await headers();
  const authorization = headersList.get('authorization');

  if (!authorization || authorization !== `Bearer ${process.env.NEXT_PUBLIC_SESSION_PASSWORD}`) {
    return notFound();
  }

  const token = await getJWT();
  if (!token) return new Response('Token not valid or empty', { status: 500 });
  return Response.json(token, { status: 200 });
}

// Delete cookie
export async function DELETE() {
  try {
    await deleteJWT();
    return Response.json({ message: 'Cookie deleted' }, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }
}
