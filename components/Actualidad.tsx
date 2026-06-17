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
      title: "Sesiones con profesionales de protección a la infancia",
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
      </div>

      <div className="manantial-banner-container" data-reveal="">
        <a
          className="manantial-banner"
          href="https://www.fundacionmanantial.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/isotipo-blanco.png"
            alt=""
            className="manantial-banner__bg-image"
            loading="lazy"
            decoding="async"
          />
          <div className="wrap manantial-banner__inner">
            <div className="manantial-banner__left">
              <span className="manantial-banner__eyebrow">Un proyecto impulsado por</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo-manantial.png"
                alt="Fundación Manantial"
                className="manantial-banner__logo"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="manantial-banner__right">
              <span className="manantial-banner__link">
                Visitar Fundación <span className="arrow">→</span>
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
