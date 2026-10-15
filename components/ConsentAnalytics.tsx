"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const consentKey = "cs-analytics-consent";

export function ConsentAnalytics() {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return;
    const saved = window.localStorage.getItem(consentKey);
    if (saved === "yes" || saved === "no") setChoice(saved);
    else setShowBanner(true);
  }, []);

  function decide(value: "yes" | "no") {
    window.localStorage.setItem(consentKey, value);
    setChoice(value);
    setShowBanner(false);
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      {choice === "yes" && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-consent" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
      {showBanner && (
        <aside className="consent-banner" aria-label="Analytics preferences">
          <p>We use optional analytics to understand how visitors use the site. No analytics run unless you opt in.</p>
          <div><button type="button" className="consent-accept" onClick={() => decide("yes")}>Accept analytics</button><button type="button" onClick={() => decide("no")}>Decline</button></div>
        </aside>
      )}
    </>
  );
}
