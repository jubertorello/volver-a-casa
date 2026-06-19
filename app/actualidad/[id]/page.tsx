import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articles,
  getArticle,
  getRelated,
  typeColor,
  formatDate,
  formatDateShort,
} from "@/lib/articles";
import ArticleGallery from "@/components/ArticleGallery";
import ImageSlot from "@/components/ImageSlot";
import ActualidadHeader from "@/components/ActualidadHeader";
import Footer from "@/components/Footer";

// ── Static generation ─────────────────────────────────────────
export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

// ── SEO metadata ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) return {};
  return {
    title: `${article.title} — Volver a Casa`,
    description: article.shortDesc,
  };
}

// ── Page ──────────────────────────────────────────────────────
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) notFound();

  const related = getRelated(article.id, article.type, 3);
  const color = typeColor[article.type];
  const hasGallery = article.gallery && article.gallery.length > 0;

  return (
    <>
      {/* ── Floating nav ─────────────────────────────────── */}
      <ActualidadHeader />

      {/* ── Hero ──────────────────────────────────────────── */}
      <div
        className="article-hero"
        style={{ "--type-color": color } as React.CSSProperties}
      >
        <div className="article-hero__bg-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover}
            alt={`Portada de ${article.title}`}
            fetchPriority="high"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="article-hero__overlay" />
        </div>

        <div className="article-hero__inner">
          <Link href="/actualidad" className="article-hero__back">
            ← Volver a Actualidad
          </Link>

          <div className="article-hero__meta">
            <span className="article-hero__type">{article.type}</span>
            <span className="article-hero__date">{formatDate(article.date)}</span>
          </div>

          <h1>{article.title}</h1>
          <p className="article-hero__desc">{article.shortDesc}</p>
        </div>
      </div>

      {/* ── Cuerpo del artículo ────────────────────────────── */}
      <main className="article-page">
        <div className="article-page__inner">
          <div
            className="article-body"
            style={{ "--type-color": color } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </main>

      {/* ── Galería opcional ──────────────────────────────── */}
      {hasGallery && <ArticleGallery images={article.gallery!} />}

      {/* ── Artículos relacionados ────────────────────────── */}
      {related.length > 0 && (
        <section className="article-related">
          <div className="article-related__inner">
            <h2 className="article-related__title">Más artículos</h2>
            <div className="grid cols-3">
              {related.map((rel) => (
                <article key={rel.id} className="post">
                  <div className="post__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.cover}
                      alt={`Portada de ${rel.title}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="post__body">
                    <span
                      className="post__cat"
                      style={{ color: typeColor[rel.type] }}
                    >
                      {rel.type} · {formatDateShort(rel.date)}
                    </span>
                    <h3
                      style={{
                        color: "var(--azul)",
                        fontWeight: 400,
                        fontSize: "1.15rem",
                      }}
                    >
                      {rel.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>
                      {rel.shortDesc}
                    </p>
                    <Link
                      href={`/actualidad/${rel.id}`}
                      className="link-arrow"
                      style={{ marginTop: "auto", paddingTop: "8px" }}
                    >
                      Leer más <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
