"use server";

import { parse, serialize } from "cookie";
import { cookies } from "next/headers";
import { defaultThemeColor, defaultThemeScheme } from "./theme";
import jwt, { JwtPayload } from "jsonwebtoken";

const SESSION_COOKIE_NAME = "NG_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "SESSION_SECRET";

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set");
}

export type UserSession = {
  userId: string | null;
  scheme: string;
  theme: string;
};

export async function getUserSession(): Promise<UserSession | null> {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const parsedCookies = parse(sessionCookie);
    const token = parsedCookies[SESSION_COOKIE_NAME];
    const decoded = jwt.verify(token, SESSION_SECRET) as JwtPayload;
    const userSession: UserSession = {
      userId: decoded.userId as string,
      scheme: decoded.scheme as string,
      theme: decoded.theme as string,
    };
    return userSession;
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error("[session] error: " + e.message);
    return null;
  }
}

export async function getUserInfo(): Promise<UserSession> {
  const session = await getUserSession();
  const userId = session?.userId ?? null;
  const scheme = session?.scheme || defaultThemeScheme;
  const theme = session?.theme ?? defaultThemeColor;
  return {
    userId,
    scheme,
    theme,
  };
}

export async function setUserSession(userSession: UserSession) {
  const cookieStore = await cookies();
  const token = jwt.sign(userSession, SESSION_SECRET, { expiresIn: "30d" });
  const serializedSession = serialize(SESSION_COOKIE_NAME, token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  });
  cookieStore.set(SESSION_COOKIE_NAME, serializedSession);
}
