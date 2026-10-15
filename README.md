# Christophany Studios

A mobile-first photography studio website built with Next.js App Router, TypeScript, and CSS. The homepage, portfolio, seven service pages, booking/contact form, privacy notice, sitemap, robots file, and custom not-found page are included.

## Run locally

```sh
npm install
npm run dev
```

## Enquiry email setup

The enquiry endpoint validates submissions on the server, applies a lightweight per-process rate limit, rejects a honeypot field, and sends accepted enquiries through Resend. It does not store client details in a public database.

Before accepting live enquiries, configure:

- `RESEND_API_KEY` with a private Resend API key.
- `RESEND_FROM_EMAIL` with a sender address on a domain verified in Resend.
- `NEXT_PUBLIC_SITE_URL` with the deployed canonical site URL.

The form reports a delivery error instead of showing a false success if email delivery is unconfigured or fails. Until configured, visitors can use the working email, phone, and WhatsApp links. For a serverless deployment with multiple instances, replace the in-memory rate limiter with a shared store or the hosting provider's rate-limiting feature.

Copy `.env.example` to `.env.local` for local development. Never commit real credentials.
The site URL intentionally has no assumed production-domain default; configure it before deployment so canonical tags, structured data, and the sitemap use the real domain.

## Analytics

Set `NEXT_PUBLIC_GA_ID` to a Google Analytics 4 measurement ID to enable GA4. The analytics script is not loaded unless a visitor accepts optional analytics in the consent banner; a saved choice is kept in local storage.

## Content and launch checklist

Photography categories, service descriptions, contact information, and portfolio captions are maintained in `data/content.ts`. Place new studio-owned photographs in `public/images/` and point the corresponding `studioPhotos` or portfolio entry at the local image path. The supplied portraits, couple photographs, and logo are included there. Other portfolio and service images are temporary Unsplash samples and are marked as such; replace them with studio-owned or properly licensed photographs and accurate alt text as more images become available.

Before production launch:

1. Set the Resend credentials and verify the sending domain.
2. Set the public site URL and connect the custom domain with HTTPS.
3. Replace all sample images with studio-owned or properly licensed work.
4. Verify the service area, business biography, and any social links; no testimonials, awards, prices, street address, or response-time promises have been invented.
5. Add production-grade shared rate limiting and bot protection at the hosting edge if needed.
6. Run `npm run build` and test enquiry delivery with the configured email provider.

## Commands

- `npm run dev` — local development server
- `npm run build` — optimized production build
- `npm start` — serve the production build
- `npm run typecheck` — check TypeScript types
