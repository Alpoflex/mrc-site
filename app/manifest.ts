import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MRC Makine Sanayi",
    short_name: "MRC",
    description:
      "Kırıkkale Hacılar'da çelik konstrüksiyon, fiber lazer kesim, abkant büküm, sac işleme ve inşaat taahhüt.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#D32D27",
    lang: "tr",
    icons: [
      { src: "/icon.jpeg", type: "image/jpeg", sizes: "900x900" },
      { src: "/apple-icon.jpeg", type: "image/jpeg", sizes: "900x900" },
    ],
  };
}
