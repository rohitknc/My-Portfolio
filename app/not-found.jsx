import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wrap archive-page">
      <p className="section-label">404 / A SMALL DETOUR</p>
      <h1>
        This page took
        <br />a <em>different route.</em>
      </h1>
      <p>Let’s get you back to the work.</p>
      <Link className="button solid" href="/work">
        Explore the projects ↗
      </Link>
    </main>
  );
}
