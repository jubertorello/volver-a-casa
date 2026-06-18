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
      <header
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "14px var(--gutter)",
          background: "oklch(0.974 0.013 83 / 0.92)",
          backdropFilter: "blur(16px) saturate(1.3)",
          boxShadow: "0 1px 0 oklch(0.3 0.03 255 / 0.07), var(--shadow-sm)",
        }}
      >
        <Link
          href="/"
          aria-label="Volver a Casa — inicio"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-volveracasa.png"
            alt="Volver a Casa"
            style={{ height: "40px", width: "auto", display: "block" }}
          />
          <div style={{ width: "1px", height: "20px", background: "oklch(0 0 0 / 0.14)" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-manantial.png"
            alt="Fundación Manantial"
            style={{ height: "22px", width: "auto", display: "block" }}
          />
        </Link>

        <nav
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
          aria-label="Principal"
        >
          {[
            { label: "Proyecto", href: "/#proyecto" },
            { label: "Objetivos", href: "/#porque" },
            { label: "Experiencia", href: "/#recorrido" },
            { label: "Actualidad", href: "/actualidad" },
            { label: "Vídeos", href: "/#videos" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "0.5em 0.85em",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "0.93rem",
                color:
                  link.href === "/actualidad" ? "var(--azul)" : "var(--ink-soft)",
                background:
                  link.href === "/actualidad"
                    ? "oklch(0.3 0.035 255 / 0.07)"
                    : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

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
