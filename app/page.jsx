import Image from "next/image";
import { ResumePreview } from "@/components/resume-preview";
import "./resume-preview.css";
import Link from "next/link";
import { projects, email, resume, siteUrl } from "@/lib/content";
import { SystemExplorer } from "@/components/system-explorer";
import { ContactDesk, LocalTime } from "@/components/site-details";
import { ProjectGrid } from "@/components/project-grid";
export const metadata = { alternates: { canonical: "/" } };
function Label({ number, children }) {
  return (
    <div className="section-label">
      <span>{number} /</span> {children}
    </div>
  );
}
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kanjarla Narasimha Charyulu",
    url: siteUrl,
    image: `${siteUrl}/narasimha-profile.png`,
    jobTitle: "Dynamics 365 / Power Platform Developer",
    email: `mailto:${email}`,
    sameAs: [
      "https://github.com/rohitknc",
      "https://leetcode.com/u/Knckanjarla",
    ],
    knowsAbout: [
      "Dynamics 365",
      "Dataverse",
      "Power Platform",
      "C#",
      "Power Automate",
      "Model Context Protocol",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Narasaraopeta Engineering College",
    },
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero wrap">
        <div className="hero-top">
          <span className="eyebrow">
            <span className="status-dot" /> DYNAMICS 365 & POWER PLATFORM
            DEVELOPER
          </span>
          <span className="location">
            HYDERABAD, INDIA <LocalTime />
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="intro">
              <span className="intro-line" /> Hello, I’m Narasimha Charyulu.
            </p>
            <h1>
              Business systems.
              <br />
              <em>Human outcomes.</em>
            </h1>
            <p className="hero-description">
              I connect business data, custom code, and automation to make
              everyday work flow better. From enterprise CRM to AI that
              understands your data.
            </p>
            <div className="hero-cta">
              <Link className="button solid" href="#work">
                Explore my work <span>↘</span>
              </Link>
              <a className="text-button" href={resume} download>
                Download résumé ↗
              </a>
            </div>
            <div className="hero-footnote">
              <span className="handwritten">
                Built for the people using it.
              </span>
              <span className="small-arrow">⤴</span>
            </div>
          </div>
          <div className="portrait-composition" data-depth>
            <span className="portrait-coordinate">17.3850° N / 78.4867° E</span>
            <span className="portrait-corner corner-tl" />
            <span className="portrait-corner corner-br" />
            <div className="portrait-back" />
            <div className="portrait-print">
              <div className="portrait-image">
                <Image
                  src="/narasimha-profile.png"
                  alt="Kanjarla Narasimha Charyulu"
                  width={1254}
                  height={1254}
                  priority
                  sizes="(max-width: 760px) 85vw, 35vw"
                />
              </div>
              <div className="portrait-caption">
                <span>Narasimha Charyulu</span>
                <span>Developer & problem solver</span>
              </div>
            </div>
            <span className="portrait-sticker">
              THE HUMAN BEHIND THE CODE
              <br />
              <em>Curious by default.</em>
            </span>
            <span className="portrait-note">
              <span className="status-dot" /> Based in Hyderabad. Building
              connections.
            </span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>BUSINESS REQUIREMENTS → DEPLOYABLE SOLUTIONS</span>
          <a className="scroll-cue" href="#work">
            <span className="scroll-track">
              <i />
            </span>{" "}
            SCROLL TO EXPLORE
          </a>
        </div>
      </section>
      <section
        className="proof-band wrap"
        aria-label="Selected project figures"
      >
        <div className="proof-intro">
          <span className="micro-label">ENGINEERING, IN CONTEXT</span>
          <p>
            Small details.
            <br />
            <em>Meaningful impact.</em>
          </p>
        </div>
        {[
          ["~60%", "less manual document preparation"],
          ["5,000+", "CRM records migrated"],
          ["100", "related Dataverse tables"],
        ].map(([n, t]) => (
          <div className="proof-stat" key={n}>
            <strong>{n}</strong>
            <span>
              {t}
              <sup>*</sup>
            </span>
          </div>
        ))}
        <span className="proof-source">*Résumé-reported project figures</span>
      </section>
      <section id="work" className="section wrap">
        <div className="section-heading">
          <div>
            <Label number="01">SELECTED WORK</Label>
            <h2>
              From complex workflows
              <br />
              to <em>considered solutions.</em>
            </h2>
          </div>
          <p>
            Four systems, four different challenges.
            <br />A closer look at the thinking behind the build.
          </p>
        </div>
        <ProjectGrid projects={projects} />
        <div className="work-note">
          <span>↳ Built around real business problems.</span>
          <p>
            Architecture visuals are illustrative. Project figures are reported
            in Narasimha’s supplied résumé.
          </p>
        </div>
      </section>
      <section id="systems" className="systems-section section wrap">
        <div className="section-heading">
          <div>
            <Label number="02">THE CONNECTIVE TISSUE</Label>
            <h2>
              A little look
              <br />
              <em>under the hood.</em>
            </h2>
          </div>
          <p>
            Good engineering connects the dots.
            <br />
            Pick a system. Follow the flow. Explore each decision.
          </p>
        </div>
        <SystemExplorer />
      </section>
      <section id="about" className="about-section">
        <div className="wrap about-grid">
          <div>
            <Label number="03">THE WAY I WORK</Label>
            <h2>
              Low-code when it fits.
              <br />
              <em>Code when it matters.</em>
            </h2>
            <p className="large-copy">
              The best solution is the one people can actually use, maintain,
              and trust.
            </p>
            <p>
              I’m a Dynamics 365 and Power Platform developer at PiSquare
              Technologies. I work across CRM customization, business
              applications, and integrations—connecting the right platform
              capabilities with custom code where the problem needs it.
            </p>
            <a className="text-button" href={`mailto:${email}`}>
              Let’s talk about your next challenge ↗
            </a>
          </div>
          <div className="principles">
            {[
              [
                "01",
                "Understand the workflow",
                "Start with the people, business process, data relationships, and access rules.",
              ],
              [
                "02",
                "Choose the right layer",
                "Platform configuration where it fits. C#, APIs, and Azure where more control matters.",
              ],
              [
                "03",
                "Build beyond the demo",
                "Consider deployment, environment configuration, pagination, security, and diagnostics.",
              ],
            ].map(([n, t, d]) => (
              <article key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="resume"
        className="resume-preview-section"
        aria-labelledby="resume-section-title"
      >
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Label number="04">THE RÉSUMÉ</Label>
              <h2 id="resume-section-title">
                Experience, <em>on paper.</em>
              </h2>
            </div>
          </div>
          <ResumePreview />
        </div>
      </section>
      <section id="contact" className="contact-section">
        <div className="wrap contact-layout">
          <div>
            <Label number="05">WHAT’S NEXT?</Label>
            <div className="contact-heading">
              <h2>
                Good systems start
                <br />
                with a <em>conversation.</em>
              </h2>
            </div>
            <div className="contact-bottom">
              <a href={`mailto:${email}`}>{email} ↗</a>
              <p>
                Have a workflow worth improving? A system worth connecting?
                <br />
                Let’s find a thoughtful way forward.
              </p>
            </div>
          </div>
          <ContactDesk />
        </div>
      </section>
    </main>
  );
}
