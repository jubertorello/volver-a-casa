import React from "react";
import ImageSlot from "@/components/ImageSlot";

export default function Actualidad() {
  const newsItems = [
    {
      date: "Jun 2026",
      tag: "Jornada",
      title: "Presentación pública de Volver a Casa",
      desc: "Presentación oficial del proyecto Volver a Casa, un modelo de innovación social para la reunificación familiar.",
      href: "#",
    },
    {
      date: "May 2026",
      tag: "Hito",
      title: "Primeras familias incorporadas al programa",
      desc: "Comenzamos el acompañamiento especializado con las primeras familias y menores del proyecto.",
      href: "#",
    },
    {
      date: "Abr 2026",
      tag: "Congreso",
      title: "Participación en encuentro sobre desinstitucionalización",
      desc: "Compartiendo aprendizajes y debate sobre los retos de los sistemas de protección a la infancia.",
      href: "#",
    },
    {
      date: "Mar 2026",
      tag: "Alianza",
      title: "Nuevo acuerdo de colaboración con entidades sociales",
      desc: "Fortalecemos la red de apoyo para garantizar un acompañamiento integral a las familias.",
      href: "#",
    },
    {
      date: "Feb 2026",
      tag: "Formación",
      title: "Sesiones con profesionales de protección a la infancia",
      desc: "Formación especializada en metodologías de intervención y revinculación familiar.",
      href: "#",
    },
    {
      date: "Ene 2026",
      tag: "Publicación",
      title: "Primeros aprendizajes del modelo Casa Verde",
      desc: "Publicación de los resultados y lecciones aprendidas tras años de experiencia en salud mental.",
      href: "#",
    },
  ];

  const featuredNews = newsItems[0];
  const gridNews = newsItems.slice(1);

  return (
    <section className="section" id="actualidad" data-screen-label="05 Actualidad">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="eyebrow eyebrow--verde">Actualidad</p>
          <h2>Lo último del proyecto.</h2>
          <p className="lead" style={{ fontFamily: "Capriola", fontSize: "16px" }}>
            Noticias, jornadas, hitos y participación en congresos.
          </p>
        </div>

        {/* Featured News Item */}
        <article className="post post--featured" data-reveal="" data-delay="2" style={{ marginBottom: "34px" }}>
          <div className="post__media">
            <ImageSlot
              id="news-feat"
              shape="rect"
              placeholder="Foto destacada"
              alt={`Foto de portada de la noticia: ${featuredNews.title}`}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="post__body" style={{ padding: "clamp(28px,3vw,44px)", gap: "14px", justifyContent: "center" }}>
            <span className="post__cat" style={{ color: "var(--verde-deep)" }}>
              {featuredNews.tag} · {featuredNews.date}
            </span>
            <h3 style={{ fontSize: "clamp(1.5rem,2.6vw,2.2rem)", color: "var(--azul)", fontWeight: 400 }}>
              {featuredNews.title}
            </h3>
            <p style={{ color: "var(--ink-soft)" }}>
              {featuredNews.desc}
            </p>
            <a href={featuredNews.href} className="link-arrow" style={{ marginTop: "8px" }}>
              Leer más <span>→</span>
            </a>
          </div>
        </article>

        {/* Grid of remaining news */}
        <div className="grid cols-3" data-reveal="" data-delay="3">
          {gridNews.map((item, idx) => (
            <article key={idx} className="post">
              <div className="post__media">
                <ImageSlot
                  id={`news-item-${idx}`}
                  shape="rect"
                  placeholder="Imagen noticia"
                  alt={`Imagen de la noticia: ${item.title}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="post__body">
                <span className="post__cat" style={{ color: idx % 2 === 0 ? "var(--azul-deep)" : "var(--naranja-deep)" }}>
                  {item.tag} · {item.date}
                </span>
                <h3 style={{ color: "var(--azul)", fontWeight: 400, fontSize: "1.25rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>{item.desc}</p>
                <a href={item.href} className="link-arrow" style={{ marginTop: "auto", paddingTop: "8px" }}>
                  Leer más <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="actualidad__more" data-reveal="" style={{ marginTop: "48px" }}>
          <a href="#" className="btn btn--ghost" style={{ whiteSpace: "nowrap" }}>
            Ver todas las noticias <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
