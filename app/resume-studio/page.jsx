import { ResumeStudio } from "@/components/resume-studio/studio";
import "./studio.css";
export const metadata = {
  title: { absolute: "Paper / Studio — Interactive PDF Preview" },
  description:
    "An interactive React PDF preview composed as a quiet desktop still life. Explore the sample resume and cover letter, change pages, zoom, or preview your own PDF locally.",
  alternates: { canonical: "/resume-studio" },
  robots: { index: false, follow: true },
};
export default function StudioPage() {
  return <ResumeStudio />;
}
