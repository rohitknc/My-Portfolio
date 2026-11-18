"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useDeferredValue,
} from "react";
import { LocalTime } from "./site-details";
import { projects, email, resume } from "@/lib/content";
const links = [
  ["Work", "/work"],
  ["About", "/#about"],
  ["Résumé", "/#resume"],
];
function NavigationLink({ href, ...props }) {
  const Element = href.startsWith("/#") ? "a" : Link;
  return <Element href={href} {...props} />;
}
export function Navigation() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [sound, setSound] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialog = useRef(null);
  const audio = useRef(null);
  const input = useRef(null);
  function close() {
    dialog.current?.close();
    setQuery("");
  }
  function open() {
    setMenu(false);
    if (!dialog.current.open) dialog.current.showModal();
    input.current?.focus();
  }
  const onKeyboard = useEffectEvent((event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      dialog.current?.open ? close() : open();
    }
  });
  useEffect(() => {
    const handler = (e) => onKeyboard(e);
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    setMenu(false);
    close();
  }, [path]);
  async function toggleSound() {
    if (!audio.current) return;
    if (!audio.current.paused) {
      audio.current.pause();
      return;
    }
    try {
      audio.current.volume = 0.15;
      await audio.current.play();
    } catch {
      setSound(false);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      location.href = `mailto:${email}`;
    }
  }
  const items = [
    ...links.map(([name, href]) => ({ name, href, label: "Page" })),
    ...projects.map((p) => ({
      name: p.title,
      href: `/work/${p.slug}`,
      label: "Case study",
    })),
    { name: "Download résumé", href: resume, label: "PDF" },
    { name: "Email Narasimha", href: `mailto:${email}`, label: "Contact" },
  ].filter((i) => i.name.toLowerCase().includes(deferred.toLowerCase()));
  return (
    <>
      <header className="header" id="top">
        <div className="wrap header-inner">
          <Link className="wordmark" href="/" aria-label="Narasimha — home">
            <span className="brand-symbol" aria-hidden="true">
              n<span>↗</span>
            </span>
            <span>
              Narasimha<span className="ink">.</span>
              <small>DEVELOPER / BUILDER</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <NavigationLink
                key={label}
                className={
                  path.startsWith("/work") && label === "Work" ? "active" : ""
                }
                href={href}
              >
                {label}
              </NavigationLink>
            ))}
          </nav>
          <div className="header-actions">
            <a className="nav-contact" href="/#contact">
              Let’s talk <span>↗</span>
            </a>
            <button
              className="command-trigger"
              onClick={open}
              aria-label="Search pages and projects"
            >
              Search <kbd>⌘ K</kbd>
            </button>
            <button
              className="menu-button"
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
            >
              {menu ? "Close −" : "Menu +"}
            </button>
          </div>
        </div>
        {menu && (
          <nav
            className="mobile-nav wrap"
            id="mobile-menu"
            aria-label="Mobile navigation"
          >
            {links.map(([label, href]) => (
              <NavigationLink onClick={() => setMenu(false)} href={href} key={label}>
                {label} ↗
              </NavigationLink>
            ))}
            <button onClick={open}>Search pages & projects</button>
          </nav>
        )}
      </header>
      <div className="utility-dock">
        <button
          onClick={toggleSound}
          aria-pressed={sound}
          aria-label={sound ? "Mute ambient audio" : "Play ambient audio"}
        >
          <span className={sound ? "sound-bars playing" : "sound-bars"}>
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>Ambience {sound ? "on" : "off"}</span>
        </button>
        <span className="dock-divider" />
        <LocalTime />
        <span className="dock-divider" />
        <button onClick={copy}>{copied ? "Copied ✓" : "Copy email ↗"}</button>
        <span className="sr-only" role="status">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </div>
      <audio
        ref={audio}
        src="/soft-ambient.mp3"
        loop
        preload="none"
        onPlay={() => setSound(true)}
        onPause={() => setSound(false)}
      />
      <dialog
        ref={dialog}
        className="command-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onClose={() => setQuery("")}
      >
        <div className="command-head">
          <span>
            <span className="ink">⌘</span> A shortcut to the good stuff
          </span>
          <button onClick={close}>
            Close <kbd>esc</kbd>
          </button>
        </div>
        <input
          ref={input}
          aria-label="Search pages and projects"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a project, page, or action…"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              dialog.current.querySelector(".command-results a")?.focus();
            }
            if (e.key === "Enter" && items.length)
              dialog.current.querySelector(".command-results a")?.click();
          }}
        />
        <div
          className="command-results"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              const all = [
                ...dialog.current.querySelectorAll(".command-results a"),
              ];
              const n = all.indexOf(document.activeElement);
              all[
                (n + (e.key === "ArrowDown" ? 1 : -1) + all.length) % all.length
              ]?.focus();
            }
          }}
        >
          {items.map((i) => (
            <NavigationLink href={i.href} onClick={close} key={i.href + i.name}>
              <span>{i.name}</span>
              <small>{i.label} ↗</small>
            </NavigationLink>
          ))}
          {!items.length && <p>No matches. Try “Dataverse” or “Work”.</p>}
        </div>
        <div className="command-foot">
          ↑ ↓ navigate · Enter open · Esc close
        </div>
      </dialog>
    </>
  );
}
