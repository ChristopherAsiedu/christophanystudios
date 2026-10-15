import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookie = "cs_admin";
const sessionMs = 8 * 60 * 60 * 1000;

function secret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
}

function sign(payload: string): string {
  return createHmac("sha256", secret() ?? "").update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const hash = (value: string) => createHmac("sha256", "pw").update(value).digest("hex");
  return safeEqual(hash(input), hash(expected));
}

export function createSessionToken(): string {
  const expires = String(Date.now() + sessionMs);
  return `${expires}.${sign(expires)}`;
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(adminCookie)?.value;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}

export const sessionMaxAgeSeconds = sessionMs / 1000;
