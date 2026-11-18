"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { email } from "@/lib/content";
export function LocalTime() {
  const [time, setTime] = useState("IST · UTC +05:30");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()) + " IST",
      );
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="local-time">
      <span className="clock-face" aria-hidden="true" />
      {time}
    </span>
  );
}
export function PageDetails() {
  const bar = useRef(null);
  const [active, setActive] = useState("work");
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const progress = max > 0 ? scrollY / max : 0;
        bar.current?.style.setProperty("--progress", String(progress));
        setScrolled(scrollY > 600);
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main>section[id]")
      .forEach((el) => observer.observe(el));
    const move = (e) => {
      if (
        !matchMedia("(hover:hover) and (prefers-reduced-motion:no-preference)")
          .matches
      )
        return;
      const el = e.target.closest("[data-depth]");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty(
        "--pointer-x",
        `${((e.clientX - rect.left) / rect.width - 0.5) * 5}deg`,
      );
      el.style.setProperty(
        "--pointer-y",
        `${-((e.clientY - rect.top) / rect.height - 0.5) * 5}deg`,
      );
    };
    const reset = (e) => {
      const el = e.target.closest("[data-depth]");
      if (el && !el.contains(e.relatedTarget)) {
        el.style.setProperty("--pointer-x", "0deg");
        el.style.setProperty("--pointer-y", "0deg");
      }
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", reset, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", reset);
    };
  }, [path]);
  return (
    <>
      <div className="reading-progress" ref={bar} aria-hidden="true" />
      {path === "/" && (
        <nav className="section-rail" aria-label="On this page">
          {[
            ["work", "01", "Work"],
            ["systems", "02", "Systems"],
            ["about", "03", "Approach"],
            ["resume", "04", "Résumé"],
            ["contact", "05", "Contact"],
          ].map(([id, n, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span>{n}</span>
              <i />
              <b>{label}</b>
            </a>
          ))}
        </nav>
      )}
      <a
        href="#top"
        className={`back-top ${scrolled ? "is-visible" : ""}`}
        aria-label="Back to top"
        tabIndex={scrolled ? 0 : -1}
      >
        ↑
      </a>
    </>
  );
}
export function ContactDesk() {
  const [topic, setTopic] = useState("Enterprise apps");
  const [copied, setCopied] = useState(false);
  const topics = [
    "Enterprise apps",
    "Automation",
    "AI integrations",
    "Something else",
  ];
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }
  const subject = encodeURIComponent(`Let's talk — ${topic}`);
  return (
    <div className="contact-desk">
      <div className="contact-desk-top">
        <span className="mini-cross">+</span>
        <span>LET’S CONNECT THE DOTS</span>
        <span className="envelope-icon">↗</span>
      </div>
      <p className="contact-prompt">What are you working on?</p>
      <div
        className="contact-topics"
        role="group"
        aria-label="Conversation topic"
      >
        {topics.map((t) => (
          <button
            aria-pressed={topic === t}
            onClick={() => setTopic(t)}
            key={t}
          >
            {t}
            <span>↗</span>
          </button>
        ))}
      </div>
      <a className="contact-send" href={`mailto:${email}?subject=${subject}`}>
        Start a conversation <span>↗</span>
      </a>
      <div className="contact-address">
        <span>{email}</span>
        <button onClick={copy} aria-label="Copy contact email">
          {copied ? "Copied ✓" : "Copy ⧉"}
        </button>
      </div>
      <span className="sr-only" role="status">
        {copied ? "Email copied to clipboard" : ""}
      </span>
      <p className="contact-helper">
        Opens your email app with your chosen topic.
      </p>
    </div>
  );
}
