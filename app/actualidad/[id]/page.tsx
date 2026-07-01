import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  typeColor,
  formatDate,
  formatDateShort,
  DEFAULT_COVER,
  generateShortDesc,
  ArticleType
} from "@/lib/articles";
import ArticleGallery from "@/components/ArticleGallery";
import ImageSlot from "@/components/ImageSlot";
import ActualidadHeader from "@/components/ActualidadHeader";
import Footer from "@/components/Footer";
import { getNewsById, getNews } from "@/lib/services/news.service";
import { getSettings } from "@/lib/services/settings.service";

export const revalidate = 0;

/**
 * Clean up Quill-generated HTML:
 * 1. Replace &nbsp; with normal spaces (Quill replaces all spaces with &nbsp;)
 * 2. Strip inline style properties that break text layout
 */
function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    // Replace &nbsp; with a regular space so the browser can wrap words normally
    .replace(/&nbsp;/gi, ' ')
    // Remove specific style properties that cause broken word wrapping
    .replace(/style="([^"]*)"/gi, (_match, styles: string) => {
      const cleaned = styles
        .split(';')
        .map((s: string) => s.trim())
        .filter((s: string) => {
          const prop = s.split(':')[0]?.trim().toLowerCase();
          return prop && !['white-space', 'word-break', 'overflow-wrap', 'word-wrap'].includes(prop);
        })
        .join('; ');
      return cleaned ? `style="${cleaned}"` : '';
    });
}

// ── SEO metadata ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsById(id);
  if (!article) return {};
  
  const shortDesc = generateShortDesc(article.content_html);

  return {
    title: `${article.title} — Volver a Casa`,
    description: shortDesc || "Sin descripción",
  };
}

// ── Page ──────────────────────────────────────────────────────
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rawArticle = await getNewsById(id);
  if (!rawArticle) notFound();

  const shortDesc = generateShortDesc(rawArticle.content_html);

  const article = {
    id: rawArticle.id,
    title: rawArticle.title,
    type: (rawArticle.category || "Noticia") as ArticleType,
    date: rawArticle.publication_date,
    shortDesc,
    cover: rawArticle.featured_image || DEFAULT_COVER,
    content: sanitizeHtml(rawArticle.content_html || ""),
    gallery: rawArticle.gallery || []
  };

  const allNews = await getNews();
  const socialLinks = await getSettings('social') || {};
  const generalSettings = await getSettings('general') || {};
  const contactEmail = generalSettings.contactEmail || "volveracasa@fundacionmanantial.org";
  const contactPhone = generalSettings.contactPhone || "617 293 880";
  const footerLogos = await getSettings('footer_logos') || [];
  const related: Array<{ id: string; title: string; type: ArticleType; date: string; shortDesc: string; cover: string }> = allNews
    .filter((n: any) => n.id !== article.id && new Date(n.publication_date) <= new Date())
    .map((n: any) => ({
      id: n.id as string,
      title: n.title as string,
      type: (n.category || "Noticia") as ArticleType,
      date: n.publication_date as string,
      shortDesc: generateShortDesc(n.content_html),
      cover: (n.featured_image || DEFAULT_COVER) as string
    }))
    .sort((a: { type: ArticleType }, b: { type: ArticleType }) => a.type === article.type ? -1 : 1)
    .slice(0, 3);

  const color = typeColor[article.type] || "var(--azul)";
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
                    <p className="post__desc" style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>
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
      <Footer socialLinks={socialLinks} contactEmail={contactEmail} contactPhone={contactPhone} logos={footerLogos} />
    </>
  );
}
