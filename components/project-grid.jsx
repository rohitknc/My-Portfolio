"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { ProjectVisual } from "./project-visual";
const filters = [
  "All work",
  "Automation",
  "Applications",
  "Integration",
  "AI & MCP",
];
const facts = {
  document: ["~60%", "less manual preparation*"],
  employee: ["5,000+", "records supported*"],
  migration: ["5,000+", "CRM records migrated*"],
  ai: ["MCP", "conversational tool interface"],
};
export function ProjectGrid({ projects }) {
  const [filter, setFilter] = useState("All work");
  const [layout, setLayout] = useState("grid");
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const list = projects.filter(
    (p) => filter === "All work" || p.category === filter,
  );
  useEffect(() => {
    if (selected && dialog.current?.open)
      dialog.current.querySelector("button")?.focus();
  }, [selected]);
  function peek(p, e) {
    trigger.current = e.currentTarget;
    setSelected(p);
    dialog.current.showModal();
  }
  return (
    <>
      <div className="project-toolbar">
        <div className="filter-list" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => startTransition(() => setFilter(f))}
            >
              {f}
              <sup>
                {f === "All work"
                  ? projects.length
                  : projects.filter((p) => p.category === f).length}
              </sup>
            </button>
          ))}
        </div>
        <div className="layout-switch" role="group" aria-label="Project layout">
          <button
            aria-label="Grid view"
            aria-pressed={layout === "grid"}
            onClick={() => setLayout("grid")}
          >
            ▦
          </button>
          <button
            aria-label="List view"
            aria-pressed={layout === "list"}
            onClick={() => setLayout("list")}
          >
            ☷
          </button>
        </div>
      </div>
      <div className="result-caption">
        <span role="status">
          Showing {String(list.length).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")} studies
        </span>
        <span>BUSINESS PROBLEMS, THOUGHTFULLY SOLVED ↓</span>
      </div>
      <div className={`project-grid layout-${layout}`} aria-busy={pending}>
        {list.map((p, index) => (
          <article
            className={`project-card ${index === 0 && (filter === "All work" || list.length === 1) ? "featured-project" : ""} ${index === 3 && filter === "All work" ? "closing-project" : ""}`}
            key={p.slug}
          >
            <Link
              href={`/work/${p.slug}`}
              className="project-image-link"
              aria-label={`Read ${p.title} case study`}
            >
              <ProjectVisual project={p} />
              <span className="image-open">Open study ↗</span>
            </Link>
            <div className="project-content">
              <div className="project-meta">
                <span>
                  {p.number} / {p.category}
                </span>
                <span className="project-status">CASE STUDY</span>
              </div>
              <Link href={`/work/${p.slug}`}>
                <h3>{p.title}</h3>
              </Link>
              <p>{p.summary}</p>
              <div className="project-fact">
                <strong>{facts[p.visual][0]}</strong>
                <span>{facts[p.visual][1]}</span>
              </div>
              <div className="tag-list">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="project-card-actions">
                <Link className="case-link" href={`/work/${p.slug}`}>
                  Read the story <span>↗</span>
                </Link>
                <button
                  className="quick-view"
                  onClick={(e) => peek(p, e)}
                  aria-label={`Quick view: ${p.title}`}
                >
                  Quick view <span>+</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="quick-view-title"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
        onClose={() => trigger.current?.focus()}
      >
        {selected && (
          <>
            <div className="peek-toolbar">
              <span>PROJECT NOTES / {selected.number}</span>
              <button
                onClick={() => dialog.current.close()}
                aria-label="Close project quick view"
              >
                Close ×
              </button>
            </div>
            <ProjectVisual project={selected} />
            <div className="peek-copy">
              <p className="micro-label">{selected.category}</p>
              <h2 id="quick-view-title">{selected.title}</h2>
              <p>{selected.summary}</p>
              <div className="peek-contribution">
                <span className="micro-label">MY CONTRIBUTION</span>
                <p>{selected.contribution}</p>
              </div>
              <div className="tag-list">
                {selected.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <Link
                className="button solid"
                onClick={() => dialog.current.close()}
                href={`/work/${selected.slug}`}
              >
                Explore the complete study <span>↗</span>
              </Link>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
