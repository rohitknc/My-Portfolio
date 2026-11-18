import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { LocalTime } from "@/components/site-details";
import { SiteFrame } from "@/components/site-frame";
import { siteUrl, email, resume } from "@/lib/content";
const displayFont = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const bodyFont = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: "Arial",
});
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Narasimha Charyulu — Dynamics 365 & Power Platform Developer",
    template: "%s — Narasimha Charyulu",
  },
  description:
    "Kanjarla Narasimha Charyulu builds enterprise applications with Dynamics 365, Dataverse, C#, Power Automate and AI integrations. Explore projects and experience.",
  authors: [{ name: "Kanjarla Narasimha Charyulu" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Narasimha Charyulu — Portfolio",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f3eb",
  colorScheme: "light",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteFrame
          footer={
            <footer className="footer wrap">
              <div className="footer-top">
                <Link className="wordmark" href="/">
                  Narasimha<span className="ink">.</span>
                </Link>
                <p>
                  Thoughtful systems. Useful automation.
                  <br />
                  <span className="footer-signature">
                    Built with care, in Hyderabad.
                  </span>
                </p>
                <a href="#top">Back to top ↑</a>
              </div>
              <div className="footer-bottom">
                <span>
                  © {new Date().getFullYear()} Kanjarla Narasimha Charyulu
                </span>
                <nav aria-label="Social links">
                  <a
                    href="https://github.com/rohitknc"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://leetcode.com/u/Knckanjarla"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LeetCode ↗
                  </a>
                  <a href={resume}>Résumé ↗</a>
                  <a href={`mailto:${email}`}>Email ↗</a>
                </nav>
                <span className="footer-location">
                  <span className="status-dot" /> Hyderabad, India <LocalTime />
                </span>
              </div>
            </footer>
          }
        >
          {children}
        </SiteFrame>
      </body>
    </html>
  );
}
