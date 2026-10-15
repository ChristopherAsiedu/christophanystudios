"use client";

import { FormEvent, useState } from "react";
import { services } from "@/data/content";
import { BookingCalendar } from "@/components/BookingCalendar";

type FormState = "idle" | "sending" | "success" | "error";

export function BookingForm({ initialService = "" }: { initialService?: string }) {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not send your enquiry. Please try again.");
      form.reset();
      setPreferredDate("");
      setStatus("success");
      setMessage("Thank you. Your enquiry has been sent to the studio. We’ll be in touch to discuss availability.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="success-mark" aria-hidden="true">✓</span>
        <h2>Enquiry received</h2>
        <p>{message}</p>
        <p className="small-note">Your preferred date is a request only and is not confirmed until the studio gets back to you.</p>
        <a className="text-link" href={`https://wa.me/233548805906?text=${encodeURIComponent(`Hello Christophany Studios, I just sent an enquiry${initialService ? ` about ${initialService}` : ""} and would like to follow up.`)}`} target="_blank" rel="noreferrer">Continue on WhatsApp ↗</a>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={submit} aria-describedby="form-notice">
      <fieldset className="form-step">
        <legend><span className="step-badge" aria-hidden="true">1</span>Contact details</legend>
        <div className="form-grid">
          <label>Full name <span>*</span><input name="name" autoComplete="name" required maxLength={100} /></label>
          <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label>Phone or WhatsApp <span>*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
          <label>Best way to reach you
            <select name="contactMethod" defaultValue="Email"><option>Email</option><option>Phone</option><option>WhatsApp</option></select>
          </label>
        </div>
      </fieldset>
      <fieldset className="form-step">
        <legend><span className="step-badge" aria-hidden="true">2</span>Session details</legend>
        <div className="form-grid">
          <label>Photography service <span>*</span>
            <select name="service" defaultValue={initialService} required>
              <option value="" disabled>Select a service</option>
              {services.map((item) => <option key={item.slug} value={item.title}>{item.title}</option>)}
              <option value="Other photography enquiry">Something else</option>
            </select>
          </label>
          <label>Type of session or event <input name="sessionType" placeholder="e.g. family portraits, launch event" maxLength={120} /></label>
          <div className="form-full calendar-field"><span className="calendar-label">Preferred date</span><BookingCalendar name="preferredDate" value={preferredDate} onChange={setPreferredDate} /></div>
          <label>Alternative date <input name="alternativeDate" type="date" /></label>
          <label>Preferred location <input name="location" placeholder="Accra, or let us know" maxLength={120} /></label>
          <label>Budget range <span className="optional">(optional)</span>
            <select name="budget">
              <option value="">Prefer not to say</option>
              <option>Under GHS 1,000</option>
              <option>GHS 1,000–2,500</option>
              <option>GHS 2,500–5,000</option>
              <option>GHS 5,000+</option>
              <option>Let’s discuss</option>
            </select>
          </label>
          <label className="form-full">A little about what you have in mind <textarea name="details" rows={5} maxLength={2000} placeholder="Share a few details about your plans, ideas, or questions." /></label>
        </div>
      </fieldset>
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="consent-label"><input type="checkbox" name="consent" value="yes" required /><span>I agree that Christophany Studios may use these details to respond to my enquiry. See our <a href="/privacy">privacy notice</a>. <b>*</b></span></label>
      <p className="small-note" id="form-notice">Submitting an enquiry does not confirm availability or reserve a date.</p>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button className="button button-dark form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending enquiry…" : "Send enquiry"} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
