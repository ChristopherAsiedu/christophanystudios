import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import { studioPhotos } from "@/data/content";

export const metadata: Metadata = {
  title: "About Christophany Studios",
  description: "Get to know the thoughtful, people-first approach to photography at Christophany Studios in Accra, Ghana.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="page-shell about-page">
      <EditorialPageIntro
        eyebrow="A LITTLE ABOUT US"
        title={<>Images with feeling.<br /><em>Made with intention.</em></>}
        description="Christophany Studios is a photography studio in Accra, Ghana, here for the people, brands, and moments that deserve to be remembered."
        image={studioPhotos.creamPortrait}
        imageAlt="Portrait of a woman in a cream outfit with burgundy braids"
      />
      <section className="about-feature"><div className="about-feature-image"><Image src={studioPhotos.groomPortrait} alt="Groom in a white tuxedo seated before the wedding celebration" width={768} height={1152} sizes="(max-width: 700px) 86vw, 40vw" loading="lazy" unoptimized /></div><div className="about-feature-copy"><span className="eyebrow">OUR CREATIVE PHILOSOPHY</span><h2>First, we make space <em>to be yourself.</em></h2><p>We believe photographs are at their best when you can feel the person behind them. That begins with listening: to what you want to remember, how you want to feel, and what makes your story yours.</p><p>Our approach is thoughtful and collaborative. We guide when you need it and step back when a moment is unfolding. The result is imagery that feels polished without feeling posed, personal without feeling precious.</p><p>From portraits and celebrations to businesses building their visual identity, we bring the same care to every frame.</p></div></section>
      <section className="about-values"><span className="eyebrow">WHAT WE BRING TO EVERY SESSION</span><div className="value-grid"><article><span>01</span><h3>Care</h3><p>Good work starts with paying attention—to people, details, and the moments in between.</p></article><article><span>02</span><h3>Creativity</h3><p>We look for a point of view that feels considered, honest, and unmistakably yours.</p></article><article><span>03</span><h3>Ease</h3><p>A thoughtful experience gives you room to feel comfortable and be present.</p></article></div></section>
      <section className="page-cta"><span className="eyebrow">WE’D LOVE TO HEAR YOUR STORY</span><h2>Have something in mind?</h2><p>Let’s start with a conversation.</p><Link className="button button-dark" href="/book">Enquire about a session <span>↗</span></Link></section>
    </div>
  );
}
