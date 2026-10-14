import type { MetadataRoute } from "next";
import { getTracks } from "@/lib/microcms";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tracks = await getTracks();
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tracks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...tracks.map((t) => ({
      url: `${SITE_URL}/tracks/${t.id}`,
      lastModified: t.releasedAt ? new Date(t.releasedAt) : new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
