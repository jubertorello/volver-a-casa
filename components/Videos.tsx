"use client";

import React from "react";
import ImageSlot from "@/components/ImageSlot";

export default function Videos() {
  const videoItems = [
    {
      id: "vid-1",
      title: "Presentación Volver a Casa",
      desc: "Conoce el proyecto de reunificación familiar que acompaña a niños, niñas y sus familias.",
      tag: "YouTube",
      tagColor: "var(--azul)",
      videoUrl: "https://www.youtube.com/watch?v=BSpFhnqwOCE",
    },
    {
      id: "vid-2",
      title: "Entrevista sobre Acogimiento Familiar",
      desc: "La importancia de crear entornos seguros y el impacto de la desinstitucionalización.",
      tag: "TikTok",
      tagColor: "var(--verde)",
      videoUrl: "https://www.tiktok.com/@volveracasa",
    },
    {
      id: "vid-3",
      title: "El proyecto Casa Verde en marcha",
      desc: "Prevención en salud mental infantil y el fortalecimiento de capacidades parentales.",
      tag: "Instagram",
      tagColor: "var(--naranja)",
      videoUrl: "https://instagram.com/volveracasa",
    },
  ];

  return (
    <section className="section section--tint" id="videos" data-screen-label="06 Vídeos">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="eyebrow eyebrow--naranja">Multimedia</p>
          <h2>Vídeos más significativos.</h2>
          <p className="lead" style={{ fontFamily: "Capriola", fontSize: "16px" }}>
            Descubre más sobre nuestro trabajo, testimonios y el impacto del acompañamiento a través de nuestros vídeos.
          </p>
        </div>

        <div className="grid cols-3" data-reveal="" data-delay="1">
          {videoItems.map((vid) => (
            <div key={vid.id} className="video-card">
              <a
                href={vid.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card__media-wrapper"
              >
                <div className="video-card__media">
                  <ImageSlot
                    id={vid.id}
                    shape="rect"
                    placeholder="Miniatura del vídeo"
                    alt={`Miniatura de: ${vid.title}`}
                    style={{ width: "100%", height: "100%" }}
                  />
                  <div className="video-card__overlay">
                    <div className="video-card__play-btn">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="30"
                        height="30"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
              <div className="video-card__body">
                <span
                  className="video-card__tag"
                  style={{ color: vid.tagColor }}
                >
                  {vid.tag}
                </span>
                <h3>{vid.title}</h3>
                <p>{vid.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner to follow on Social Media */}
        <div className="videos-cta" data-reveal="" data-delay="2">
          <div className="videos-cta__content">
            <h3>Síguenos en redes sociales</h3>
            <p>
              Únete a nuestra comunidad para estar al día con las novedades, historias y el día a día de Volver a Casa.
            </p>
          </div>
          <div className="videos-cta__actions">
            <a
              href="https://instagram.com/volveracasa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--naranja"
            >
              Instagram <span className="arrow">↗</span>
            </a>
            <a
              href="https://www.tiktok.com/@volveracasa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--verde"
            >
              TikTok <span className="arrow">↗</span>
            </a>
            <a
              href="https://www.youtube.com/@FundacionManantial"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              YouTube <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
