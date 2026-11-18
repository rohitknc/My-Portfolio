"use client";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();
const options = {
  cMapUrl: "/resume-studio/cmaps/",
  standardFontDataUrl: "/resume-studio/standard_fonts/",
  wasmUrl: "/resume-studio/wasm/",
};
export default function PdfDocument({
  file,
  page,
  width,
  onLoad,
  onRender,
  onError,
  onPageSize,
  renderTextLayer = true,
  renderAnnotationLayer = true,
}) {
  return (
    <Document
      file={file}
      options={options}
      onLoadSuccess={onLoad}
      onLoadError={onError}
      loading={
        <div className="pdf-loading">
          <span className="paper-loader" />
          <p>Preparing your document</p>
          <small>Rendering the actual PDF</small>
        </div>
      }
      error={
        <div className="pdf-failed">
          This PDF could not be loaded. Try another file.
        </div>
      }
    >
      <Page
        devicePixelRatio={2}
        pageNumber={page}
        width={width}
        renderTextLayer={renderTextLayer}
        renderAnnotationLayer={renderAnnotationLayer}
        onLoadSuccess={(p) => onPageSize?.(p.originalWidth / p.originalHeight)}
        onRenderSuccess={onRender}
        onRenderError={onError}
        loading={
          <div className="pdf-loading">
            <span className="paper-loader" />
            <p>Rendering page {page}</p>
          </div>
        }
      />
    </Document>
  );
}
