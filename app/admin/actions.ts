"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminCookie, createSessionToken, isAdmin, passwordMatches, sessionMaxAgeSeconds } from "@/lib/admin-auth";
import { enquiryStatuses, updateEnquiryStatus, type EnquiryStatus } from "@/lib/db";

const attempts: number[] = [];
const windowMs = 15 * 60 * 1000;

export async function login(formData: FormData) {
  const now = Date.now();
  while (attempts.length && now - attempts[0] > windowMs) attempts.shift();
  if (attempts.length >= 10) redirect("/admin?error=locked");

  const password = typeof formData.get("password") === "string" ? String(formData.get("password")).slice(0, 200) : "";
  if (!passwordMatches(password)) {
    attempts.push(now);
    redirect("/admin?error=invalid");
  }
  (await cookies()).set(adminCookie, createSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: sessionMaxAgeSeconds,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: adminCookie, path: "/admin" });
  redirect("/admin");
}

export async function setStatus(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as EnquiryStatus;
  if (!Number.isInteger(id) || !enquiryStatuses.includes(status)) return;
  await updateEnquiryStatus(id, status);
  revalidatePath("/admin");
}
