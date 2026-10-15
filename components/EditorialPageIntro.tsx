import type { ReactNode } from "react";
import Image from "next/image";

type EditorialPageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
};

export function EditorialPageIntro({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: EditorialPageIntroProps) {
  return (
    <section className="page-intro page-intro-with-art">
      <div className="page-intro-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="page-intro-art">
        <Image src={image} alt={imageAlt} width={900} height={760} sizes="(max-width: 700px) 86vw, 42vw" priority unoptimized />
      </div>
    </section>
  );
}
