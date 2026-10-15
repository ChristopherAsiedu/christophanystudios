import { NextRequest, NextResponse } from "next/server";
import { services } from "@/data/content";
import { databaseConfigured, listBookedDates, saveEnquiry } from "@/lib/db";

export const runtime = "nodejs";

const studioEmail = "christophanystudios@gmail.com";
const windowMs = 10 * 60 * 1000;
const limit = 5;
const maxRateLimitEntries = 1000;
const requestsByIp = new Map<string, number[]>();
const validServices = new Set([...services.map(({ title }) => title), "Other photography enquiry"]);

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function rateLimited(ip: string, now: number): boolean {
  if (requestsByIp.size >= maxRateLimitEntries && !requestsByIp.has(ip)) {
    for (const [address, timestamps] of requestsByIp) {
      if (timestamps.every((timestamp) => now - timestamp >= windowMs)) requestsByIp.delete(address);
      if (requestsByIp.size < maxRateLimitEntries) break;
    }
  }
  const recent = (requestsByIp.get(ip) ?? []).filter((timestamp) => now - timestamp < windowMs);
  if (recent.length >= limit) {
    requestsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestsByIp.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "This enquiry is too large. Please shorten your message and try again." }, { status: 413 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip, Date.now())) {
    return NextResponse.json({ error: "Too many enquiries from this connection. Please try again in a few minutes." }, { status: 429 });
  }

  let data: Record<string, unknown>;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Please check your form and try again." }, { status: 400 });
    }
    data = body as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Please check your form and try again." }, { status: 400 });
  }

  if (clean(data.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(data.name, 100);
  const email = clean(data.email, 254);
  const phone = clean(data.phone, 30);
  const service = clean(data.service, 100);
  const preferredDate = clean(data.preferredDate, 30);
  const alternativeDate = clean(data.alternativeDate, 30);
  const location = clean(data.location, 120);
  const sessionType = clean(data.sessionType, 120);
  const budget = clean(data.budget, 80);
  const contactMethod = clean(data.contactMethod, 30);
  const details = clean(data.details, 2000);

  if (!name || !email || !phone || !validServices.has(service) || data.consent !== "yes" || !validEmail(email)) {
    return NextResponse.json({ error: "Please provide your name, a valid email, phone number, service, and privacy consent." }, { status: 400 });
  }
  if (!/^[+\d][\d\s().-]{5,29}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone or WhatsApp number." }, { status: 400 });
  }
  for (const value of [name, email, phone, service, location, sessionType, details]) {
    if (/[\r\n]/.test(value) && [email, phone].includes(value)) {
      return NextResponse.json({ error: "Please check the format of your contact details." }, { status: 400 });
    }
  }

  if (databaseConfigured()) {
    try {
      const booked = new Set(await listBookedDates());
      if (booked.has(preferredDate) || booked.has(alternativeDate)) {
        return NextResponse.json({ error: "That date has already been booked. Please choose another date." }, { status: 409 });
      }
    } catch (error) {
      console.error("Could not check booked dates:", error);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const emailConfigured = Boolean(apiKey && from);
  if (!emailConfigured && !databaseConfigured()) {
    console.error("Enquiry storage is not configured: set DATABASE_URL (MySQL) and/or RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return NextResponse.json({ error: "Enquiry delivery is not available yet. Please contact the studio directly by email or WhatsApp." }, { status: 503 });
  }

  const text = [
    "New photography enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone}`,
    `Service: ${service}`,
    `Preferred date: ${preferredDate || "Not specified"}`,
    `Alternative date: ${alternativeDate || "Not specified"}`,
    `Location: ${location || "Not specified"}`,
    `Session or event: ${sessionType || "Not specified"}`,
    `Budget: ${budget || "Not specified"}`,
    `Preferred contact method: ${contactMethod || "Not specified"}`,
    "",
    "Requirements:",
    details || "Not specified",
    "",
    "Note: Requested dates are not confirmed bookings.",
  ].join("\n");

  let saved = false;
  if (databaseConfigured()) {
    try {
      await saveEnquiry({ name, email, phone, service, preferredDate, alternativeDate, location, sessionType, budget, contactMethod, details });
      saved = true;
    } catch (error) {
      console.error("Enquiry could not be saved to MySQL:", error);
    }
  }

  let emailed = false;
  if (emailConfigured) try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [studioEmail],
        reply_to: email,
        subject: `Photography enquiry: ${service}`,
        text,
      }),
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Enquiry email provider rejected the request:", response.status, errorBody);
    } else {
      emailed = true;
    }
  } catch (error) {
    console.error("Enquiry email delivery failed:", error);
  }

  if (!saved && !emailed) {
    return NextResponse.json({ error: "We could not deliver your enquiry right now. Please email or WhatsApp the studio directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
