import React from "react";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import { articles, typeColor, formatDateShort } from "@/lib/articles";

export default function Actualidad() {
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1, 4);

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

        {/* Featured article */}
        <article
          className="post post--featured"
          data-reveal=""
          data-delay="2"
          style={{ marginBottom: "34px" }}
        >
          <div className="post__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredArticle.cover}
              alt={`Portada de ${featuredArticle.title}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            className="post__body"
            style={{ padding: "clamp(28px,3vw,44px)", gap: "14px", justifyContent: "center" }}
          >
            <span className="post__cat" style={{ color: typeColor[featuredArticle.type] }}>
              {featuredArticle.type} · {formatDateShort(featuredArticle.date)}
            </span>
            <h3
              style={{
                fontSize: "clamp(1.5rem,2.6vw,2.2rem)",
                color: "var(--azul)",
                fontWeight: 400,
              }}
            >
              {featuredArticle.title}
            </h3>
            <p style={{ color: "var(--ink-soft)" }}>{featuredArticle.shortDesc}</p>
            <Link
              href={`/actualidad/${featuredArticle.id}`}
              className="link-arrow"
              style={{ marginTop: "8px" }}
            >
              Leer más <span>→</span>
            </Link>
          </div>
        </article>

        {/* Grid of 3 articles */}
        <div className="grid cols-3" data-reveal="" data-delay="3">
          {gridArticles.map((article) => (
            <article key={article.id} className="post">
                <div className="post__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover}
                    alt={`Portada de ${article.title}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              <div className="post__body">
                <span className="post__cat" style={{ color: typeColor[article.type] }}>
                  {article.type} · {formatDateShort(article.date)}
                </span>
                <h3 style={{ color: "var(--azul)", fontWeight: 400, fontSize: "1.25rem" }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>
                  {article.shortDesc}
                </p>
                <Link
                  href={`/actualidad/${article.id}`}
                  className="link-arrow"
                  style={{ marginTop: "auto", paddingTop: "8px" }}
                >
                  Leer más <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="actualidad__more" data-reveal="" style={{ marginTop: "48px" }}>
          <Link href="/actualidad" className="btn btn--ghost" style={{ whiteSpace: "nowrap" }}>
            Ver todas las noticias <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
