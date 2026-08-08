import { Suspense } from "react";
import PageHero from "../../components/PageHero";
import ProjectsGallery from "../../components/ProjectsGallery";

export const metadata = {
  title: "Projeler",
  description: "MRC Makine Sanayi'nin çelik konstrüksiyon, inşaat ve lazer kesim alanlarındaki çalışmalarından fotoğraf ve video örnekleri.",
  alternates: { canonical: "/projeler/" },
  openGraph: {
    title: "Projeler | MRC Makine Sanayi",
    description: "Çelik konstrüksiyon, inşaat, lazer kesim ve abkant büküm çalışmalarımızdan örnekler.",
    url: "https://mrcmaksan.com/projeler/",
  },
};

export default function Projeler() {
  return (
    <>
      <PageHero
        eyebrow="Projeler"
        title="Çalışmalarımızdan örnekler"
        desc="Çelik konstrüksiyon, inşaat ve lazer kesim alanlarında gerçekleştirdiğimiz işlerden bir seçki."
        image="/images/celik/celik-04.jpeg"
      />
      <section className="section">
        <div className="container">
          <Suspense fallback={null}>
            <ProjectsGallery />
          </Suspense>
        </div>
      </section>
    </>
  );
}
