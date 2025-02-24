'use server'

import { SessionDataGoogle } from "@/types/global.type";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptionsGoogle } from "./lib";

export const getSessionGoogle = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataGoogle>(cookieStore, sessionOptionsGoogle);
  return session;
};

export const deleteSessionGoogle = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataGoogle>(cookieStore, sessionOptionsGoogle);
  if (session) {
    session.destroy();
  } else {
    throw new Error("Cookie not found");
  }
}