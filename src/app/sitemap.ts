import type { MetadataRoute } from "next";

const siteUrl = "https://humaflo.github.io/gar2025-resilience-dashboard";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      priority: 1,
    },
    {
      url: `${siteUrl}/timor-leste-stunting/`,
      priority: 0.8,
    },
  ];
}
