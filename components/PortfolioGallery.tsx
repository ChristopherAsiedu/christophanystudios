"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { categories, portfolio } from "@/data/content";

export function PortfolioGallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<(typeof portfolio)[number] | null>(null);
  const shown = filter === "All" ? portfolio : portfolio.filter((item) => item.category === filter);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="gallery-filters" aria-label="Filter portfolio by category">
        {categories.map((category) => (
          <button key={category} type="button" className={filter === category ? "filter-chip is-active" : "filter-chip"} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>
        ))}
      </div>
      <p className="sample-label">Featuring photographs by Christophany Studios.</p>
      <div className="portfolio-grid">
        {shown.map((item, index) => (
          <button className={`portfolio-item ${item.shape}${"fit" in item && item.fit === "contain" ? " contain-image" : ""}`} key={item.title} type="button" onClick={() => setActive(item)} aria-label={`View photograph: ${item.title}`}>
            <Image src={item.image} alt={item.alt} width={1200} height={1600} sizes="(max-width: 700px) 48vw, (max-width: 1000px) 32vw, 24vw" loading={index < 3 ? "eager" : "lazy"} unoptimized />
            <span className="portfolio-overlay"><span className="eyebrow">{item.category}</span><span className="portfolio-title">{item.title}</span><i aria-hidden="true">↗</i></span>
          </button>
        ))}
      </div>
      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <button className="lightbox-close" type="button" aria-label="Close image viewer" onClick={() => setActive(null)}>×</button>
          <Image src={active.image} alt={active.alt} width={2000} height={1400} sizes="100vw" unoptimized onClick={(event) => event.stopPropagation()} />
          <p>{active.title} <span>— {active.category}</span></p>
        </div>
      )}
    </>
  );
}
