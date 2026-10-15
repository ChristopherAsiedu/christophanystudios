import Link from "next/link";
import { services, studio } from "@/data/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="wordmark footer-wordmark" href="/" aria-label="Christophany Studios home">
            <span>Christophany</span>
            <small>STUDIOS</small>
          </Link>
          <p>Stories worth seeing.<br />Moments worth keeping.</p>
        </div>
        <div className="footer-nav">
          <div>
            <span className="eyebrow">Explore</span>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">Our approach</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <span className="eyebrow">Photography</span>
            {services.slice(0, 4).map((service) => (
              <Link href={`/services/${service.slug}`} key={service.slug}>{service.name}</Link>
            ))}
          </div>
          <div>
            <span className="eyebrow">Say hello</span>
            <a href={`mailto:${studio.email}`}>{studio.email}</a>
            <a href={`tel:${studio.phone.replaceAll(" ", "")}`}>{studio.phone}</a>
            <span>{studio.location}</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Christophany Studios</span>
        <span>Photography made with care in Accra, Ghana.</span>
        <Link href="/privacy">Privacy</Link>
      </div>
      <p className="footer-attribution">Christophany Studios is a service of 33Group Consul Ltd.</p>
    </footer>
  );
}
