import type { Metadata } from "next";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { studioPhotos } from "@/data/content";

export const metadata: Metadata = {
  title: "Photography Portfolio in Accra, Ghana",
  description: "Explore portrait, wedding, event, corporate, and brand photography from Christophany Studios in Accra, Ghana.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <div className="page-shell"><EditorialPageIntro eyebrow="SELECTED WORK · ACCRA, GHANA" title={<>People, places,<br /><em>and the in-between.</em></>} description="A collection of moments, stories, and details seen with care." image={studioPhotos.kentePortrait} imageAlt="Studio portrait of a man wearing a patterned Kente-inspired outfit" /><section className="portfolio-page-gallery"><PortfolioGallery /></section></div>;
}
