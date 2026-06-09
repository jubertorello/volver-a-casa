import React from "react";

export default function Actualidad() {
  const newsItems = [
    {
      date: "Jun 2026",
      tag: "Jornada",
      title: "Presentación pública de Volver a Casa",
      href: "#",
    },
    {
      date: "May 2026",
      tag: "Hito",
      title: "Primeras familias incorporadas al programa",
      href: "#",
    },
    {
      date: "Abr 2026",
      tag: "Congreso",
      title: "Participación en encuentro sobre desinstitucionalización",
      href: "#",
    },
    {
      date: "Mar 2026",
      tag: "Alianza",
      title: "Nuevo acuerdo de colaboración con entidades sociales",
      href: "#",
    },
    {
      date: "Feb 2026",
      tag: "Formación",
      title: "Sesiones con profesionales de protección a el blog",
      href: "#",
    },
    {
      date: "Ene 2026",
      tag: "Publicación",
      title: "Primeros aprendizajes del modelo Casa Verde",
      href: "#",
    },
  ];

  return (
    <section className="section" id="actualidad" data-screen-label="10 Actualidad">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="eyebrow eyebrow--verde">Actualidad</p>
          <h2>Lo último del proyecto.</h2>
          <p className="lead" style={{ fontFamily: "Capriola", fontSize: "16px" }}>
            Noticias, jornadas, hitos y participación en congresos.
          </p>
        </div>
        <div className="news news--cols" data-reveal="">
          {newsItems.map((item, idx) => (
            <a key={idx} href={item.href} className="news__item">
              <span className="news__date">{item.date}</span>
              <div>
                <span className="news__tag">{item.tag}</span>
                <h4>{item.title}</h4>
              </div>
              <span className="news__arrow">→</span>
            </a>
          ))}
        </div>

        <div className="actualidad__more" data-reveal="">
          <a href="#" className="btn btn--ghost" style={{ whiteSpace: "nowrap" }}>
            Ver todas las noticias <span className="arrow">→</span>
          </a>
        </div>

        <a
          className="manantial-credit"
          href="https://www.fundacionmanantial.org/"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal=""
        >
          <span>Volver a Casa es un proyecto de</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-manantial.png" alt="Fundación Manantial" loading="lazy" decoding="async" />
        </a>
      </div>
    </section>
  );
}
