import { projects } from "@/lib/content";
import { ProjectGrid } from "@/components/project-grid";
export const metadata = {
  title: "Selected Work",
  description:
    "Explore Narasimha Charyulu’s Dynamics 365, enterprise automation, Canvas App and AI integration case studies.",
  alternates: { canonical: "/work" },
};
export default function Work() {
  return (
    <main id="main" className="wrap archive-page">
      <div className="section-label">THE PROJECT INDEX / 04 STUDIES</div>
      <h1>
        Built to <em>make work flow.</em>
      </h1>
      <p className="archive-intro">
        The systems, decisions, and details behind enterprise applications,
        automation, and intelligent integrations.
      </p>
      <ProjectGrid projects={projects} />
    </main>
  );
}
