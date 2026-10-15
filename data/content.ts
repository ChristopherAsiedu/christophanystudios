export const studio = {
  name: "Christophany Studios",
  email: "christophanystudios@gmail.com",
  phone: "+233 54 880 5906",
  whatsapp: "233548805906",
  location: "Accra, Ghana",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const studioPhotos = {
  angie: "/images/angie-portrait.webp",
  angieStudio: "/images/angie-studio-portrait.webp",
  coupleTogether: "/images/couple-portrait-together.webp",
  coupleClose: "/images/couple-portrait-close.webp",
  creamPortrait: "/images/portrait-cream-outfit.webp",
  kentePortrait: "/images/portrait-kente.webp",
  groomPortrait: "/images/wedding-groom-portrait.webp",
  eveningCouple: "/images/portrait-red-dress.webp",
  weddingReception: "/images/wedding-reception.webp",
  weddingDance: "/images/wedding-dance.webp",
  weddingToast: "/images/wedding-toast.webp",
};

export const services = [
  {
    slug: "portrait-photography",
    name: "Portraits",
    title: "Portrait photography",
    description: "Honest, expressive portraits that feel unmistakably like you.",
    longDescription:
      "A portrait session should feel less like posing and more like being seen. We create a relaxed space for considered, natural photographs with warmth and character.",
    image: studioPhotos.angie,
    gallery: [studioPhotos.angieStudio, studioPhotos.creamPortrait, studioPhotos.kentePortrait],
    includes: ["A guided, relaxed session", "A considered selection of edited images", "Location planning around your vision"],
  },
  {
    slug: "weddings-engagements",
    name: "Weddings",
    title: "Wedding & engagement photography",
    description: "The big feeling and the little in-between moments, remembered.",
    longDescription:
      "From the anticipation before the ceremony to the joy that fills the dance floor, we document your day with care, discretion, and an eye for the moments that matter.",
    image: studioPhotos.weddingReception,
    gallery: [studioPhotos.coupleTogether, studioPhotos.weddingDance, studioPhotos.groomPortrait],
    includes: ["A conversation to understand your day", "Thoughtful coverage planning", "A curated, edited image collection"],
  },
  {
    slug: "event-photography",
    name: "Events",
    title: "Event photography",
    description: "Atmosphere, connection, and every moment worth looking back on.",
    longDescription:
      "From intimate celebrations to business gatherings, we capture the people and atmosphere that made your event special, without getting in the way of it.",
    image: studioPhotos.weddingToast,
    gallery: [studioPhotos.weddingReception, studioPhotos.weddingDance, studioPhotos.weddingToast],
    includes: ["Event coverage tailored to your schedule", "Candid and considered group photographs", "Edited images ready to share"],
  },
  {
    slug: "corporate-headshots",
    name: "Corporate",
    title: "Corporate & professional headshots",
    description: "Confident, approachable imagery for people and teams.",
    longDescription:
      "Professional portraits can still feel personal. We make clear, polished headshots that help teams and individuals show up with confidence across every platform.",
    image: studioPhotos.kentePortrait,
    gallery: [studioPhotos.kentePortrait, studioPhotos.groomPortrait, studioPhotos.angie],
    includes: ["A consistent look for individuals or teams", "Gentle direction and posing guidance", "Images prepared for web and professional profiles"],
  },
  {
    slug: "personal-branding",
    name: "Personal branding",
    title: "Personal branding photography",
    description: "A visual identity that feels true to the work you do.",
    longDescription:
      "Build a library of thoughtful images that tells your story. Together, we plan a session around your personality, work, and the people you want to reach.",
    image: studioPhotos.creamPortrait,
    gallery: [studioPhotos.kentePortrait, studioPhotos.angieStudio, studioPhotos.angie],
    includes: ["A planning conversation", "Portraits and details for your brand", "A versatile selection of edited photographs"],
  },
  {
    slug: "product-commercial",
    name: "Product & commercial",
    title: "Product & commercial photography",
    description: "Distinctive, detail-rich images made for your next launch.",
    longDescription:
      "Give your product the attention it deserves. We create considered commercial imagery that brings out the details, materials, and feeling behind your brand.",
    image: studioPhotos.angieStudio,
    gallery: [studioPhotos.angieStudio, studioPhotos.creamPortrait, studioPhotos.eveningCouple],
    includes: ["Creative direction shaped around your brief", "Product and lifestyle imagery", "A clear delivery plan for your campaign"],
  },
  {
    slug: "family-lifestyle",
    name: "Family & lifestyle",
    title: "Family & lifestyle photography",
    description: "A little space to be together, just as you are.",
    longDescription:
      "The best family photographs leave room for real life. We keep sessions easy-going and child-friendly, making photographs that bring you back to how it felt.",
    image: studioPhotos.coupleClose,
    gallery: [studioPhotos.coupleClose, studioPhotos.coupleTogether, studioPhotos.eveningCouple],
    includes: ["An easy-going session for all ages", "A location that suits your family", "A collection of natural, edited photographs"],
  },
] as const;

export const portfolio = [
  {
    title: "Portrait in soft light",
    category: "Portraits",
    image: studioPhotos.angie,
    alt: "Studio portrait of a woman in a white dress against a neutral backdrop",
    shape: "portrait",
  },
  {
    title: "In a moment of quiet",
    category: "Portraits",
    image: studioPhotos.angieStudio,
    alt: "Overhead studio portrait of a woman in a black dress",
    shape: "landscape",
    fit: "contain",
  },
  {
    title: "Together in red",
    category: "Weddings",
    image: studioPhotos.coupleTogether,
    alt: "Couple together in coordinated red outfits during a portrait session",
    shape: "portrait",
  },
  {
    title: "A moment together",
    category: "Weddings",
    image: studioPhotos.coupleClose,
    alt: "Couple sharing a close, affectionate moment during a portrait session",
    shape: "portrait",
  },
  {
    title: "Together after dark",
    category: "Weddings",
    image: studioPhotos.eveningCouple,
    alt: "Couple in coordinated red outfits sharing a portrait against a dark backdrop",
    shape: "portrait",
  },
  {
    title: "A lively reception",
    category: "Weddings",
    image: studioPhotos.weddingDance,
    alt: "Newlyweds celebrating together on the dance floor with their guests",
    shape: "landscape",
  },
  {
    title: "A day shared with loved ones",
    category: "Weddings",
    image: studioPhotos.weddingReception,
    alt: "Newlyweds surrounded by friends and family during an outdoor celebration",
    shape: "landscape",
  },
  {
    title: "A toast to the newlyweds",
    category: "Events",
    image: studioPhotos.weddingToast,
    alt: "Guest raising a toast at a wedding reception",
    shape: "landscape",
  },
  {
    title: "Portrait in cream",
    category: "Portraits",
    image: studioPhotos.creamPortrait,
    alt: "Studio portrait of a woman in a cream outfit with burgundy braids",
    shape: "portrait",
  },
  {
    title: "A portrait in Kente",
    category: "Portraits",
    image: studioPhotos.kentePortrait,
    alt: "Studio portrait of a man wearing a patterned Kente-inspired outfit",
    shape: "portrait",
  },
  {
    title: "Before the celebration",
    category: "Weddings",
    image: studioPhotos.groomPortrait,
    alt: "Groom in a white tuxedo seated before the wedding celebration",
    shape: "portrait",
  },
] as const;

export const categories = ["All", "Portraits", "Weddings", "Events"];
