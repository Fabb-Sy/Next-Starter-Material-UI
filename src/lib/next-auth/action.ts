import { SessionDataGoogle } from "@/types/global.type";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptionsGoogle } from "./lib";

export const getSessionGoogle = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataGoogle>(cookieStore, sessionOptionsGoogle);
  return session;
};
