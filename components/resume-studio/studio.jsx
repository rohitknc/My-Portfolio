"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Headphones, Pencil } from "./desk-objects";
const PdfDocument = dynamic(() => import("./pdf-document"), {
  ssr: false,
  loading: () => (
    <div className="pdf-loading">
      <span className="paper-loader" />
      <p>Opening the PDF studio</p>
    </div>
  ),
});
const SAMPLE = "/resume-studio/alex-morgan-resume.pdf";
class PdfBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="pdf-loading pdf-failed">
        <p>We couldn’t open this document.</p>
        <small>Try the sample or choose a different PDF.</small>
        <button onClick={this.props.onReset}>Restore sample</button>
      </div>
    ) : (
      this.props.children
    );
  }
}
function Icon({ name, ...props }) {
  const paths = {
    upload: (
      <>
        <path d="M12 16V3m-4 4 4-4 4 4" />
        <path d="M4 14v6h16v-6" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v13m-4-4 4 4 4-4" />
        <path d="M4 17v4h16v-4" />
      </>
    ),
    fit: (
      <>
        <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
        <rect x="7" y="7" width="10" height="10" rx="1" />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    full: (
      <>
        <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
      </>
    ),
    reset: (
      <>
        <path d="M3 10a9 9 0 1 1 2 9M3 4v6h6" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H5v20h14V7Z" />
        <path d="M14 2v6h5M8 12h8m-8 4h8" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
export function ResumeStudio() {
  const [file, setFile] = useState(SAMPLE);
  const [name, setName] = useState("Alex Morgan — Résumé & cover letter");
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState("scene");
  const [tone, setTone] = useState("mist");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [full, setFull] = useState(false);
  const [ratio, setRatio] = useState(595 / 842);
  const [width, setWidth] = useState(595);
  const [pending, startTransition] = useTransition();
  const shell = useRef(null);
  const paper = useRef(null);
  const input = useRef(null);
  const uploadUrl = useRef(null);
  const helpDialog = useRef(null);
  const dragDepth = useRef(0);
  useEffect(() => {
    const el = paper.current;
    if (!el) return;
    let timer;
    const observer = new ResizeObserver((entries) => {
      const next = Math.floor(entries[0].contentRect.width);
      clearTimeout(timer);
      if (next > 0) timer = setTimeout(() => setWidth(next), 100);
    });
    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [mode]);
  useEffect(
    () => () => {
      if (uploadUrl.current) URL.revokeObjectURL(uploadUrl.current);
    },
    [],
  );
  useEffect(() => {
    const listener = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", listener);
    return () => document.removeEventListener("fullscreenchange", listener);
  }, []);
  function changePage(next) {
    if (next < 1 || next > pages || next === page) return;
    setReady(false);
    startTransition(() => setPage(next));
  }
  useEffect(() => {
    function key(e) {
      if (
        e.target.closest("input,textarea,select,a,dialog,[contenteditable]") ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        changePage(page + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        changePage(page - 1);
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((z) => Math.min(1.8, +(z + 0.1).toFixed(1)));
      }
      if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(0.7, +(z - 0.1).toFixed(1)));
      }
      if (e.key === "0") {
        setZoom(1);
      }
      if (e.key === "Escape") {
        setZoom(1);
      }
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [page, pages]);
  async function chooseFile(next) {
    setDragging(false);
    dragDepth.current = 0;
    if (!next) return;
    const header = new Uint8Array(await next.slice(0, 5).arrayBuffer());
    if (new TextDecoder().decode(header) !== "%PDF-") {
      setError("Choose a PDF document. Other file types cannot be previewed.");
      return;
    }
    if (next.size > 30 * 1024 * 1024) {
      setError("Please choose a PDF smaller than 30 MB.");
      return;
    }
    if (uploadUrl.current) URL.revokeObjectURL(uploadUrl.current);
    const url = URL.createObjectURL(next);
    uploadUrl.current = url;
    setFile(url);
    setName(next.name);
    setPages(0);
    setPage(1);
    setZoom(1);
    setReady(false);
    setError("");
  }
  function reset() {
    if (uploadUrl.current) URL.revokeObjectURL(uploadUrl.current);
    uploadUrl.current = null;
    setFile(SAMPLE);
    setName("Alex Morgan — Résumé & cover letter");
    setPages(0);
    setPage(1);
    setZoom(1);
    setReady(false);
    setError("");
  }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await shell.current.requestFullscreen();
    } catch {
      setError(
        "Full screen is unavailable in this browser. You can still use reading mode.",
      );
    }
  }
  function depth(e) {
    if (
      mode !== "scene" ||
      zoom !== 1 ||
      !matchMedia("(hover:hover) and (prefers-reduced-motion:no-preference)")
        .matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--tilt-x",
      `${(-(e.clientY - r.top - r.height / 2) / r.height) * 1.5}deg`,
    );
    e.currentTarget.style.setProperty(
      "--tilt-y",
      `${((e.clientX - r.left - r.width / 2) / r.width) * 1.5}deg`,
    );
  }
  return (
    <main
      id="main"
      style={{ "--zoom": zoom }}
      className={`resume-studio tone-${tone} mode-${mode} ${dragging ? "is-dragging" : ""}`}
      ref={shell}
      onDragEnter={(e) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes("Files")) {
          dragDepth.current++;
          setDragging(true);
        }
      }}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes("Files")) e.preventDefault();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        dragDepth.current = Math.max(0, dragDepth.current - 1);
        if (dragDepth.current <= 0) setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        chooseFile(e.dataTransfer.files[0]);
      }}
    >
      <header className="studio-topbar">
        <Link href="/" className="studio-brand">
          <span className="studio-brand-mark">
            p<span>·</span>
          </span>
          <span>
            paper<span className="studio-brand-light"> / studio</span>
          </span>
        </Link>
        <span className="studio-edition">A DOCUMENT, IN ITS ELEMENT.</span>
        <div className="studio-top-actions">
          <button
            onClick={() => {
              helpDialog.current.showModal();
            }}
            className="studio-help"
            aria-label="About this preview"
          >
            ?
          </button>
          <button
            className="studio-upload"
            onClick={() => input.current.click()}
          >
            <Icon name="upload" />
            <span>Try your PDF</span>
          </button>
          <a
            className="studio-download"
            href={file}
            download={file === SAMPLE ? "alex-morgan-resume.pdf" : name}
          >
            <Icon name="download" />
            <span>Download PDF</span>
          </a>
        </div>
      </header>
      <input
        className="studio-file-input"
        type="file"
        accept="application/pdf,.pdf"
        ref={input}
        aria-label="Choose a PDF to preview"
        onChange={(e) => {
          chooseFile(e.target.files[0]);
          e.target.value = "";
        }}
      />
      <section
        className="studio-workspace"
        aria-label="Interactive PDF preview"
      >
        <div className="studio-scene">
          <div className="desk-grain" aria-hidden="true" />
          <div className="scene-tag">
            <span /> THE DESKTOP EDITION{" "}
            <i>
              {String(page).padStart(2, "0")} /{" "}
              {String(pages || 2).padStart(2, "0")}
            </i>
          </div>
          <Pencil />
          <Headphones />
          <div
            className="paper-position"
            style={{ "--paper-ratio": ratio, "--zoom": zoom }}
          >
            <div
              className={`pdf-paper ${ready ? "is-rendered" : ""} ${pending ? "is-changing" : ""}`}
              ref={paper}
              onPointerMove={depth}
              onPointerLeave={(e) => {
                e.currentTarget.style.setProperty("--tilt-x", "0deg");
                e.currentTarget.style.setProperty("--tilt-y", "0deg");
              }}
              aria-busy={!ready}
            >
              <div className="paper-edge" aria-hidden="true" />
              <PdfBoundary key={file} onReset={reset}>
                <Suspense
                  fallback={
                    <div className="pdf-loading">
                      <span className="paper-loader" />
                      <p>Loading document…</p>
                    </div>
                  }
                >
                  <PdfDocument
                    key={file}
                    file={file}
                    page={page}
                    width={width}
                    onLoad={({ numPages }) => {
                      setPages(numPages);
                      setError("");
                    }}
                    onPageSize={setRatio}
                    onRender={() => setReady(true)}
                    onError={() => {
                      setReady(false);
                      setError(
                        "This document could not be opened. It may be damaged or password-protected.",
                      );
                    }}
                  />
                </Suspense>
              </PdfBoundary>
            </div>
            <div className="paper-caption">
              <span>
                <span
                  className={
                    ready ? "render-indicator ready" : "render-indicator"
                  }
                />
                {ready
                  ? "ACTUAL PDF · SELECTABLE TEXT"
                  : "RENDERING YOUR DOCUMENT"}
              </span>
              <span>
                {file === SAMPLE
                  ? `A4 / ${page === 1 ? "RÉSUMÉ" : "COVER LETTER"}`
                  : `PAGE ${String(page).padStart(2, "0")} / ${String(pages).padStart(2, "0")}`}
                <span className="caption-cross">+</span>
              </span>
            </div>
          </div>
          <aside className="scene-copy">
            <div className="scene-copy-index">TEMPLATE STUDY / N° 001</div>
            <h1>
              <span>Clean</span>
              <strong>Résumé</strong>
            </h1>
            <span className="scene-rule" />
            <h2>Professional</h2>
            <p>
              Resume / CV with <br />
              Cover Letter Template
            </p>
            <div className="scene-details">
              <span>02 PAGES</span>
              <i />
              <span>ONE CONSIDERED DESIGN</span>
            </div>
            <span className="scene-copy-footnote">
              A fictional profile. A real PDF.
            </span>
          </aside>
          <div className="desk-coordinate">
            DESIGNED TO BE READ.<span>NOT JUST LOOKED AT. ↗</span>
          </div>
        </div>
      </section>
      <div className="studio-controls">
        <div className="controls-file">
          <Icon name="file" />
          <div>
            <strong>
              {file === SAMPLE
                ? page === 1
                  ? "The résumé"
                  : "The cover letter"
                : name}
            </strong>
            <span>
              {file === SAMPLE
                ? "Alex Morgan · Sample document"
                : "Local preview · stays on your device"}
            </span>
          </div>
          {file !== SAMPLE && (
            <button
              onClick={reset}
              title="Restore the sample PDF"
              aria-label="Restore sample PDF"
            >
              <Icon name="reset" />
            </button>
          )}
        </div>
        <div className="controls-center">
          <div className="page-control">
            <button
              aria-label="Previous page"
              disabled={page === 1 || !pages}
              onClick={() => changePage(page - 1)}
            >
              <Icon name="chevron" className="icon-back" />
            </button>
            <span aria-live="polite">
              {String(page).padStart(2, "0")} <i>/</i>{" "}
              {String(pages || 2).padStart(2, "0")}
            </span>
            <button
              aria-label="Next page"
              disabled={page === pages || !pages}
              onClick={() => changePage(page + 1)}
            >
              <Icon name="chevron" />
            </button>
          </div>
          <span className="control-divider" />
          <div className="zoom-control">
            <button
              aria-label="Zoom out"
              disabled={zoom <= 0.7}
              onClick={() =>
                setZoom((z) => Math.max(0.7, +(z - 0.1).toFixed(1)))
              }
            >
              −
            </button>
            <button
              onClick={() => setZoom(1)}
              title="Reset zoom"
              aria-label={`Zoom ${Math.round(zoom * 100)} percent. Reset zoom.`}
            >
              {Math.round(zoom * 100)}
              <small>%</small>
            </button>
            <button
              aria-label="Zoom in"
              disabled={zoom >= 1.8}
              onClick={() =>
                setZoom((z) => Math.min(1.8, +(z + 0.1).toFixed(1)))
              }
            >
              +
            </button>
          </div>
          <button
            className="studio-fit"
            onClick={() => setZoom(1)}
            aria-label="Fit document"
          >
            <Icon name="fit" />
          </button>
        </div>
        <div className="controls-view">
          <div
            className="scene-mode-switch"
            role="group"
            aria-label="Preview mode"
          >
            <button
              aria-pressed={mode === "scene"}
              onClick={() => {
                setMode("scene");
                setZoom(1);
              }}
            >
              Scene
            </button>
            <button
              aria-pressed={mode === "read"}
              onClick={() => {
                setMode("read");
                setZoom(1);
              }}
            >
              Read
            </button>
          </div>
          <button
            className="studio-full"
            onClick={fullscreen}
            aria-label={full ? "Exit full screen" : "Enter full screen"}
          >
            <Icon name="full" />
          </button>
        </div>
      </div>
      <footer className="studio-bottom">
        <span className="studio-privacy">
          <span /> YOUR FILE. YOUR BROWSER. NO UPLOAD.
        </span>
        <div
          className="desk-tones"
          role="group"
          aria-label="Desk surface color"
        >
          <span>SURFACE</span>
          {[
            ["mist", "Mist gray"],
            ["sand", "Warm sand"],
            ["sage", "Soft sage"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={`tone-dot swatch-${value}`}
              aria-label={label}
              aria-pressed={tone === value}
              onClick={() => setTone(value)}
            />
          ))}
        </div>
        <span className="studio-keyboard-hint">
          <kbd>←</kbd>
          <kbd>→</kbd> TURN THE PAGE
        </span>
      </footer>
      {error && (
        <div className="studio-notice" role="alert">
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Dismiss message">
            <Icon name="close" />
          </button>
        </div>
      )}
      {dragging && (
        <div className="studio-dropzone">
          <Icon name="upload" />
          <h2>A new perspective.</h2>
          <p>Drop your PDF to place it on the desk.</p>
          <small>PDF only · up to 30 MB · processed in your browser</small>
        </div>
      )}
      <dialog
        ref={helpDialog}
        className="studio-about"
        aria-labelledby="studio-about-title"
        onClick={(e) => {
          if (e.target === helpDialog.current) helpDialog.current.close();
        }}
      >
        <div className="studio-about-top">
          <span>PAPER / STUDIO</span>
          <button
            aria-label="Close about preview"
            onClick={() => helpDialog.current.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <h2 id="studio-about-title">
          A document,
          <br />
          <em>in its element.</em>
        </h2>
        <p>
          The paper you see is a real two-page PDF, rendered in your browser
          with PDF.js. Its text remains selectable, and the download is the very
          same document.
        </p>
        <p>
          Choose your own PDF to see it in the scene. Files are read locally;
          this viewer does not send them to a server.
        </p>
        <div className="studio-shortcuts">
          <span>
            <kbd>←</kbd>
            <kbd>→</kbd> Previous / next page
          </span>
          <span>
            <kbd>+</kbd>
            <kbd>−</kbd> Zoom in / out
          </span>
          <span>
            <kbd>0</kbd> Reset zoom
          </span>
        </div>
        <small>
          The sample profile is fictional. The desk objects are React SVGs, not
          a flattened screenshot.
        </small>
      </dialog>
    </main>
  );
}
