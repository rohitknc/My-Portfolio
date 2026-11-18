import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { ProjectVisual } from "@/components/project-visual";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.summary,
      url: `/work/${p.slug}`,
    },
  };
}
export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main" className="wrap case-page">
      <Link className="text-button case-back" href="/work">
        ← All work
      </Link>
      <div className="case-heading">
        <div className="section-label">
          CASE STUDY {p.number} / {p.label}
        </div>
        <h1>{p.title}</h1>
        <p>{p.summary}</p>
      </div>
      <ProjectVisual project={p} large />
      <div className="case-layout">
        <aside>
          <span className="section-label">TOOLKIT</span>
          <div className="tag-list">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <p className="case-attribution">
            An enterprise project by Narasimha Charyulu. Details and reported
            figures follow the original portfolio and supplied résumé.
          </p>
          <nav className="case-toc" aria-label="Case study sections">
            {[
              "The challenge",
              "The approach",
              "My contribution",
              "The outcome",
            ].map((title, i) => (
              <a key={title} href={`#study-${i}`}>
                <span>0{i + 1}</span>
                {title}
                <span>↘</span>
              </a>
            ))}
          </nav>
        </aside>
        <div>
          {[
            ["The challenge", p.problem],
            ["The approach", p.solution],
            ["My contribution", p.contribution],
            ["The outcome", p.outcome],
          ].map(([t, d], i) => (
            <section key={t} id={`study-${i}`}>
              <div className="section-label">0{i + 1} /</div>
              <h2>
                {t}
                <span className="case-heading-rule" />
              </h2>
              <p>{d}</p>
            </section>
          ))}
          <p className="case-note">
            Architecture shown is conceptual, rather than a production
            screenshot. Metrics are résumé-reported, not independently verified.
          </p>
        </div>
      </div>
      <div className="next-project">
        <span className="section-label">KEEP EXPLORING / NEXT CASE STUDY</span>
        <Link href={`/work/${next.slug}`}>
          {next.title} <span>↗</span>
        </Link>
      </div>
    </main>
  );
}
