import type { MetadataRoute } from "next";
import { services } from "../data/site";

const BASE = "https://mrcmaksan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/hakkimizda", "/hizmetler", "/projeler", "/iletisim"].map((p) => ({
    url: `${BASE}${p}/`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE}/hizmetler/${s.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
