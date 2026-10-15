import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import { services, studioPhotos } from "@/data/content";

export const metadata: Metadata = {
  title: "Photography Services in Accra",
  description: "Portrait, wedding, event, corporate, branding, product, and family photography in Accra, Ghana.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="page-shell">
      <EditorialPageIntro
        eyebrow="THOUGHTFUL PHOTOGRAPHY, YOUR WAY"
        title={<>For every story<br /><em>worth telling.</em></>}
        description="Tell us what matters to you. We’ll create a photography experience that feels considered from the first conversation to the final frame."
        image={studioPhotos.weddingReception}
        imageAlt="Newlyweds celebrating with friends and family at an outdoor wedding"
      />
      <section className="service-cards">
        {services.map((service, index) => (
          <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}>
            <div className="service-card-image"><Image src={service.image} alt={service.title} width={1000} height={1200} sizes="(max-width: 700px) 86vw, 38vw" loading="lazy" unoptimized /><span className="service-card-index">0{index + 1}</span></div>
            <div className="service-card-copy"><span className="eyebrow">{service.name.toUpperCase()}</span><h2>{service.title}</h2><p>{service.description}</p><span className="text-link">Discover the service ↗</span></div>
          </Link>
        ))}
      </section>
      <section className="page-cta"><span className="eyebrow">NOT SURE WHERE TO START?</span><h2>Tell us what you have in mind.</h2><p>We’ll help shape the right session for your story.</p><Link className="button button-dark" href="/book">Make an enquiry <span>↗</span></Link></section>
    </div>
  );
}
