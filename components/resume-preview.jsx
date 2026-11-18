"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, Suspense, useEffect, useRef, useState } from "react";
import { Pencil, Headphones } from "./resume-studio/desk-objects";
import { resume, resumePreview } from "@/lib/content";
const PdfDocument = dynamic(() => import("./resume-studio/pdf-document"), {
  ssr: false,
  loading: () => null,
});
class ResumePdfBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function useMeasuredWidth(ref, fallback) {
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    if (!ref.current) return;
    let timer;
    const observer = new ResizeObserver((entries) => {
      const next = Math.floor(entries[0].contentRect.width);
      clearTimeout(timer);
      if (next > 0) timer = setTimeout(() => setWidth(next), 80);
    });
    observer.observe(ref.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ref]);
  return width;
}
export function ResumePreview() {
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [readerReady, setReaderReady] = useState(false);
  const section = useRef(null);
  const paper = useRef(null);
  const reader = useRef(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const previewWidth = useMeasuredWidth(paper, 720);
  const readerWidth = useMeasuredWidth(reader, 760);
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [expanded]);
  function open(event) {
    trigger.current = event.currentTarget;
    setReaderReady(false);
    setExpanded(true);
    dialog.current.showModal();
  }
  function close() {
    dialog.current.close();
  }
  function restore() {
    setExpanded(false);
    trigger.current?.focus({ preventScroll: true });
  }
  return (
    <>
      <div className="resume-showcase" ref={section}>
        <span className="resume-stage-cross cross-one" aria-hidden="true">
          +
        </span>
        <span className="resume-stage-cross cross-two" aria-hidden="true">
          +
        </span>
        <div className="resume-visual">
          <Pencil />
          <Headphones />
          <div className="resume-sheet-wrap">
            <div
              className={`resume-sheet ${ready ? "pdf-ready" : ""}`}
              ref={paper}
            >
              <Image
                src="/resume-preview/narasimha-preview.jpg"
                alt="Preview of Kanjarla Narasimha Charyulu’s résumé, including experience, education, skills, and projects"
                width={595}
                height={842}
                sizes="(max-width: 720px) 94vw, (max-width: 900px) 85vw, (max-width: 1100px) 70vw, 720px"
                quality={90}
                className="resume-poster"
                aria-hidden={ready}
              />
              <div className="resume-canvas">
                {near && !failed && (
                  <ResumePdfBoundary onFailure={() => setFailed(true)}>
                    <Suspense fallback={null}>
                      <PdfDocument
                        file={resumePreview}
                        page={1}
                        width={previewWidth}
                        onRender={() => setReady(true)}
                        onError={() => setFailed(true)}
                      />
                    </Suspense>
                  </ResumePdfBoundary>
                )}
              </div>
            </div>
            <div className="resume-actions">
              <button className="resume-read-link" onClick={open}>
                Read full-size <span>↗</span>
              </button>
              <a href={resume} download className="button solid">
                Download résumé <span>↓</span>
              </a>
            </div>
          </div>
        </div>
        <noscript>
          <a href={resumePreview} target="_blank" rel="noreferrer">
            Open the résumé preview PDF
          </a>
        </noscript>
      </div>
      <dialog
        className="resume-reader"
        ref={dialog}
        aria-labelledby="resume-reader-title"
        onClose={restore}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="resume-reader-toolbar">
          <div>
            <span>RÉSUMÉ / 01 PAGE</span>
            <h3 id="resume-reader-title">Narasimha Charyulu</h3>
          </div>
          <button
            onClick={close}
            className="resume-reader-close"
            aria-label="Close résumé preview"
            autoFocus
          >
            Close <span>×</span>
          </button>
        </div>
        <div className="resume-reader-body">
          <div
            className={`resume-reader-paper ${readerReady ? "pdf-ready" : ""}`}
            ref={reader}
          >
            <Image
              src="/resume-preview/narasimha-preview.jpg"
              alt="Narasimha Charyulu’s résumé preview"
              width={595}
              height={842}
              sizes="(max-width: 720px) 90vw, 760px"
              className="resume-poster"
              quality={95}
            />
            {expanded && !failed && (
              <div className="resume-canvas">
                <ResumePdfBoundary onFailure={() => setFailed(true)}>
                  <Suspense fallback={null}>
                    <PdfDocument
                      file={resumePreview}
                      page={1}
                      width={readerWidth}
                      onRender={() => setReaderReady(true)}
                      onError={() => setFailed(true)}
                    />
                  </Suspense>
                </ResumePdfBoundary>
              </div>
            )}
          </div>
        </div>
        <div className="resume-reader-footer">
          <a
            className="resume-fullsize"
            href={resumePreview}
            target="_blank"
            rel="noreferrer"
          >
            Open full-size ↗
          </a>
          <a className="button solid" href={resume} download>
            Download résumé <span>↓</span>
          </a>
        </div>
      </dialog>
    </>
  );
}
