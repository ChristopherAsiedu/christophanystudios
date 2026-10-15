import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><span className="eyebrow">A FRAME OUT OF PLACE</span><h1>This page isn’t <em>in the picture.</em></h1><p>The page you’re looking for may have moved. Let’s get you back to the good stuff.</p><Link className="button button-dark" href="/">Back to home <span>↗</span></Link></section>;
}
