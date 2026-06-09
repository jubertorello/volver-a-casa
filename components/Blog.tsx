import React from "react";
import ImageSlot from "@/components/ImageSlot";

export default function Blog() {
  const topics = [
    { label: "Salud mental", category: "salud" },
    { label: "Crianza", category: "crianza" },
    { label: "Prevención", category: "prev" },
    { label: "Reunificación familiar", category: "salud" },
    { label: "Infancia", category: "crianza" },
    { label: "Derechos de el blog", category: "prev" },
  ];

  return (
    <section className="section section--tint" id="hablemos" data-screen-label="08 Blog">
      <div className="wrap">
        <div className="section-head" data-reveal="" style={{ maxWidth: "64ch" }}>
          <p className="eyebrow">Blog</p>
          <h2>Un espacio para hablar de lo que importa.</h2>
          <p className="lead" style={{ maxWidth: "60ch", fontFamily: "Capriola", fontSize: "16px" }}>
            Píldoras, vídeos y recursos sobre infancia, salud mental y vínculos. Un
            lugar para divulgar y compartir —inspirado en el café de Manantial.
          </p>
        </div>

        <div className="topics" data-reveal="" data-delay="1" style={{ marginBottom: "34px" }}>
          {topics.map((topic, idx) => (
            <span key={idx} className="topic" data-c={topic.category}>
              {topic.label}
            </span>
          ))}
        </div>

        <article className="post post--featured" data-reveal="" data-delay="2" style={{ marginBottom: "24px" }}>
          <div className="post__media">
            <ImageSlot
              id="post-feat"
              shape="rect"
              placeholder="Foto editorial destacada"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="post__body" style={{ padding: "clamp(28px,3vw,44px)", gap: "14px", justifyContent: "center" }}>
            <span className="post__cat" style={{ color: "var(--azul-deep)" }}>
              Salud mental · Vídeo
            </span>
            <h3 style={{ fontSize: "clamp(1.5rem,2.6vw,2.2rem)" }}>
              Por qué el vínculo seguro es la mejor prevención
            </h3>
            <p style={{ color: "var(--ink-soft)" }}>
              Una conversación sobre cómo los primeros vínculos sostienen el desarrollo
              emocional de el blog.
            </p>
            <div className="post__meta">
              <span>▶ 8 min</span>
              <span>·</span>
              <span>Café de Manantial</span>
            </div>
            <a href="#" className="link-arrow" style={{ marginTop: "8px" }}>
              Ver el episodio <span>→</span>
            </a>
          </div>
        </article>

        <div className="grid cols-3">
          <article className="post" data-reveal="" data-delay="1">
            <div className="post__media">
              <ImageSlot
                id="post-1"
                shape="rect"
                placeholder="Imagen artículo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="post__body">
              <span className="post__cat" style={{ color: "var(--naranja-deep)" }}>
                Crianza
              </span>
              <h3>Acompañar las emociones difíciles</h3>
              <div className="post__meta">
                <span>Lectura · 5 min</span>
              </div>
            </div>
          </article>
          <article className="post" data-reveal="" data-delay="2">
            <div className="post__media">
              <ImageSlot
                id="post-2"
                shape="rect"
                placeholder="Imagen artículo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="post__body">
              <span className="post__cat" style={{ color: "var(--verde-deep)" }}>
                Prevención
              </span>
              <h3>Desinstitucionalización: hacia un nuevo modelo</h3>
              <div className="post__meta">
                <span>Lectura · 7 min</span>
              </div>
            </div>
          </article>
          <article className="post" data-reveal="" data-delay="3">
            <div className="post__media">
              <ImageSlot
                id="post-3"
                shape="rect"
                placeholder="Imagen artículo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="post__body">
              <span className="post__cat" style={{ color: "var(--azul-deep)" }}>
                Derechos
              </span>
              <h3>El interés superior del menor, en la práctica</h3>
              <div className="post__meta">
                <span>Lectura · 6 min</span>
              </div>
            </div>
          </article>
        </div>
        <div style={{ textAlign: "center", marginTop: "42px" }} data-reveal="">
          <a href="#" className="btn btn--ghost">
            Ver todo el Blog <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
