import type { Metadata } from "next";
import { studio } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Christophany Studios handles information you share when making a photography enquiry.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="page-shell privacy-page">
      <section className="page-intro"><span className="eyebrow">YOUR INFORMATION, TREATED WITH CARE</span><h1>Privacy <em>notice.</em></h1><p>Last updated: October 2026</p></section>
      <article className="legal-copy">
        <h2>Information you provide</h2><p>When you use our enquiry form, we collect the contact and session details you choose to provide, including your name, email, phone number, and photography requirements. We use these details only to respond to your enquiry and discuss a potential booking.</p>
        <h2>How we handle it</h2><p>Enquiries are sent to {studio.email} using our email delivery provider. Information is not displayed publicly or sold. Please do not submit sensitive personal information through the form. You may contact us to ask about or request deletion of information you have sent.</p>
        <h2>Cookies and analytics</h2><p>Essential site functionality may use local browser storage for your analytics preference. Optional Google Analytics is only loaded if you opt in. Declining analytics does not affect the website or enquiry form.</p>
        <h2>Third-party services</h2><p>Our website uses third-party providers for hosting, email delivery, analytics (only with consent), and WhatsApp links. Their own privacy terms may apply when you use those services.</p>
        <h2>Contact</h2><p>Questions about your information? Email <a href={`mailto:${studio.email}`}>{studio.email}</a>.</p>
      </article>
    </div>
  );
}
