import { NextResponse } from "next/server";
import { listBookedDates } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ bookedDates: await listBookedDates() });
  } catch (error) {
    console.error("Could not load booked dates:", error);
    return NextResponse.json({ bookedDates: [] });
  }
}
