import PageHero from "../../components/PageHero";
import ProjectsGallery from "../../components/ProjectsGallery";

export const metadata = {
  title: "Projeler",
  description: "MRC Makine Sanayi'nin çelik konstrüksiyon, inşaat ve lazer kesim alanlarındaki çalışmalarından örnekler.",
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
          <ProjectsGallery />
        </div>
      </section>
    </>
  );
}
