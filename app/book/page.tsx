import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Photography Session",
  description: "Enquire about a portrait, wedding, event, or brand photography session with Christophany Studios in Accra, Ghana.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return <div className="page-shell"><section className="page-intro booking-intro"><span className="eyebrow">YOUR STORY STARTS HERE</span><h1>Let’s make room<br /><em>for the good stuff.</em></h1><p>Tell us a little about what you’re planning. We’ll get back to you to talk through the details and availability.</p></section><section className="booking-section"><div className="booking-aside"><span className="eyebrow">A NOTE BEFORE YOU BEGIN</span><h2>Good things start with a conversation.</h2><p>Share as much or as little as you know right now. Your enquiry is not a confirmed booking; we’ll reach out to discuss availability, options, and next steps.</p><span className="booking-aside-mark">CS.</span></div><div><BookingForm /></div></section></div>;
}
