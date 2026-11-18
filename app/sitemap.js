import { projects, siteUrl } from "@/lib/content";
export default function sitemap() {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
