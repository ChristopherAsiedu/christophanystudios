import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { portfolio, services, studio } from "@/data/content";

function altFor(src: string, fallback: string) {
  return portfolio.find((item) => item.image === src)?.alt ?? fallback;
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} in Accra`,
    description: `${service.description} Enquire about ${service.title.toLowerCase()} with Christophany Studios in Accra, Ghana.`,
    alternates: { canonical: `${studio.siteUrl}/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <div className="service-detail">
      <section className="service-detail-hero">
        <Image src={service.image} alt={service.title} width={2200} height={1400} sizes="100vw" priority unoptimized />
        <div className="service-detail-shade" />
        <div className="service-detail-title"><Link className="back-link" href="/services"><span className="back-arrow" aria-hidden="true">←</span> All services</Link><span className="eyebrow eyebrow-light">PHOTOGRAPHY · {studio.location.toUpperCase()}</span><h1>{service.title.split(" ").slice(0, -1).join(" ")}<br /><em>{service.title.split(" ").slice(-1)}</em></h1></div>
      </section>
      <section className="service-overview">
        <div className="service-overview-intro"><span className="eyebrow">MADE WITH YOU IN MIND</span><h2>{service.description}</h2><p>{service.longDescription}</p></div>
        <h3>What to expect</h3>
        <ol className="expect-grid">{service.includes.map((item, index) => <li className="expect-card" key={item}><span className="expect-badge" aria-hidden="true">0{index + 1}</span><p>{item}</p></li>)}</ol>
        <p className="small-note">Every session is tailored to your needs. We’ll confirm the details, availability, and pricing with you before anything is booked.</p>
      </section>
      <section className="service-gallery" aria-labelledby="service-gallery-title">
        <div className="service-gallery-head"><span className="eyebrow">PROOF OF WORK</span><h2 id="service-gallery-title">Recent {service.name} <em>work.</em></h2></div>
        <div className="service-gallery-grid">{service.gallery.map((src) => <figure key={src}><Image src={src} alt={altFor(src, service.title)} width={800} height={1000} sizes="(max-width: 700px) 90vw, 30vw" loading="lazy" unoptimized /></figure>)}</div>
      </section>
      <section className="service-enquiry-section" id="enquire">
        <div className="service-enquiry">
          <div className="service-enquiry-head">
            <div><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>Let’s talk about it.</h2><p>Share a few details and we’ll follow up to understand what you need.</p></div>
            <a className="whatsapp-cta" href={`https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(`Hello Christophany Studios, I would like to enquire about ${service.title}.`)}`} target="_blank" rel="noreferrer"><span>Prefer WhatsApp?</span><b>Chat about {service.name} ↗</b></a>
          </div>
          <BookingForm initialService={service.title} />
        </div>
      </section>
    </div>
  );
}
