import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import { studio, studioPhotos } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact Christophany Studios",
  description: "Contact Christophany Studios about photography in Accra, Ghana by email, phone, WhatsApp, or enquiry form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <EditorialPageIntro
        eyebrow="WE’RE LISTENING"
        title={<>Every good story<br /><em>starts somewhere.</em></>}
        description="Have a question, an idea, or a date in mind? Tell us a little about it."
        image={studioPhotos.weddingToast}
        imageAlt="A guest raising a glass to toast the newlyweds at their reception"
      />
      <section className="contact-page-grid">
        <aside className="contact-details"><span className="eyebrow">GET IN TOUCH</span><h2>Say hello.</h2><div><span className="eyebrow">EMAIL</span><a href={`mailto:${studio.email}`}>{studio.email}</a></div><div><span className="eyebrow">PHONE / WHATSAPP</span><a href={`tel:${studio.phone.replaceAll(" ", "")}`}>{studio.phone}</a><a href={`https://wa.me/${studio.whatsapp}`} target="_blank" rel="noreferrer">Message us on WhatsApp ↗</a></div><div><span className="eyebrow">BASED IN</span><p>{studio.location}<br />Serving Accra and surrounding areas.</p></div><p className="small-note">Share your details in the form and we’ll get back to you to discuss your enquiry.</p></aside>
        <div className="contact-form-wrap"><BookingForm /></div>
      </section>
    </div>
  );
}
