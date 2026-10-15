import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { services, studio, studioPhotos } from "@/data/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: studio.name,
    url: studio.siteUrl,
    email: studio.email,
    telephone: studio.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Accra",
      addressCountry: "GH",
    },
    areaServed: [{ "@type": "City", name: "Accra" }, { "@type": "Country", name: "Ghana" }],
    knowsAbout: services.map((service) => service.title),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: studio.name,
    url: studio.siteUrl,
    inLanguage: "en-GH",
  },
];

const featured = [
  [studioPhotos.angie, "Studio portrait of a woman in a white dress", "portrait"],
  [studioPhotos.weddingReception, "Newlyweds celebrating with friends and family", "landscape"],
  [studioPhotos.coupleClose, "Couple sharing an affectionate moment", "portrait"],
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="hero">
        <Image className="hero-image" src={studioPhotos.angie} alt="Studio portrait of a woman in a white dress against a neutral backdrop" width={768} height={1152} sizes="(max-width: 700px) 100vw, 50vw" priority unoptimized />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow eyebrow-light">PHOTOGRAPHY · ACCRA, GHANA</span>
          <h1>Stories worth seeing.<br /><em>Moments worth keeping.</em></h1>
          <p>Exceptional photography for people, brands, and moments that deserve to be remembered.</p>
          <div className="hero-actions"><Link className="button button-light" href="/book">Book a session <span>↗</span></Link><Link className="button button-outline-light" href="/portfolio">Explore our work</Link></div>
        </div>
        <span className="hero-index">01 — 03</span>
        <span className="hero-caption">Portrait study · Christophany Studios</span>
        <span className="hero-scroll">SCROLL TO DISCOVER <i /></span>
      </section>

      <section className="intro-section section-pad">
        <span className="eyebrow">THE ART OF BEING SEEN</span>
        <div className="intro-copy"><h2>Photography that feels <em>like you.</em></h2><p>Every person, gathering, and idea has a story worth holding onto. We make photographs with intention—warm, thoughtful images that let you be present, and give you something meaningful to return to.</p><Link className="text-link" href="/about">Get to know our approach <span>↗</span></Link></div>
      </section>

      <section className="featured-section section-pad">
        <div className="section-heading"><div><span className="eyebrow">A FEW FAVOURITES</span><h2>Frames that stay <em>with you.</em></h2></div><Link className="text-link" href="/portfolio">View the portfolio <span>↗</span></Link></div>
        <p className="sample-label">Selected portraits, couple sessions, and wedding moments photographed by Christophany Studios.</p>
        <div className="featured-grid">{featured.map(([src, alt, shape], index) => <Link className={`featured-image ${shape}`} href="/portfolio" key={src}><Image src={src} alt={alt} width={1200} height={1600} sizes="(max-width: 700px) 46vw, 32vw" loading="lazy" unoptimized /><span>0{index + 1}</span></Link>)}</div>
      </section>

      <section className="services-section section-pad">
        <div className="section-heading"><div><span className="eyebrow">MADE FOR YOUR MOMENT</span><h2>How we can <em>tell your story.</em></h2></div><Link className="text-link" href="/services">Explore all services <span>↗</span></Link></div>
        <div className="service-list">{services.slice(0, 5).map((service, index) => <Link className="service-row" href={`/services/${service.slug}`} key={service.slug}><span className="service-number">0{index + 1}</span><span className="service-name">{service.name}</span><span className="service-description">{service.description}</span><span className="service-arrow">↗</span></Link>)}</div>
      </section>

      <section className="home-cta">
        <div className="home-cta-image"><Image src={studioPhotos.angieStudio} alt="Overhead studio portrait of a woman in a black dress" width={798} height={768} sizes="(max-width: 700px) 100vw, 50vw" loading="lazy" unoptimized /></div>
        <div className="home-cta-copy"><span className="eyebrow">LET’S MAKE SOMETHING MEANINGFUL</span><h2>Your story,<br /><em>beautifully told.</em></h2><p>Tell us what you’re dreaming up. We’ll take it from there, one thoughtful detail at a time.</p><Link className="button button-dark" href="/book">Tell us about it <span>↗</span></Link></div>
      </section>

      <section className="contact-strip section-pad"><div><span className="eyebrow">BASED IN ACCRA, GHANA</span><h2>Let’s start a <em>conversation.</em></h2></div><div className="contact-strip-links"><a href={`mailto:${studio.email}`}>{studio.email}</a><a href={`tel:${studio.phone.replaceAll(" ", "")}`}>{studio.phone}</a><Link className="text-link" href="/contact">All contact details <span>↗</span></Link></div></section>
    </>
  );
}
