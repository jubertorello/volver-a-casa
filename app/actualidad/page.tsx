import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ArticlesClient from "./ArticlesClient";
import Footer from "@/components/Footer";
import ActualidadHeader from "@/components/ActualidadHeader";
import { getNews } from "@/lib/services/news.service";
import { getSettings } from "@/lib/services/settings.service";
import { getPageBySlug } from "@/lib/services/pages.service";
import { DEFAULT_COVER, Article, ArticleType, generateShortDesc } from "@/lib/articles";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageBySlug('actualidad');
  const seoTitle = pageData?.seo_meta?.title || "Actualidad y Noticias | Volver a Casa - Fundación Manantial";
  const seoDesc = pageData?.seo_meta?.description || "Descubre las últimas noticias, jornadas, hitos y publicaciones del proyecto Volver a Casa. Acompañamos a familias en el proceso de reunificación familiar.";

  return {
    title: seoTitle,
    description: seoDesc,
  };
}

export const revalidate = 0;

export default async function ActualidadPage() {
  const rawNews = await getNews();
  const socialLinks = await getSettings('social') || {};
  const generalSettings = await getSettings('general') || {};
  const contactEmail = generalSettings.contactEmail || "volveracasa@fundacionmanantial.org";
  const contactPhone = generalSettings.contactPhone || "617 293 880";
  const footerLogos = await getSettings('footer_logos') || [];
  
  const pageData = await getPageBySlug('actualidad');
  const heroData = pageData?.blocks?.find((b: any) => b.type === 'hero')?.content_json || {};
  const heroTitle = heroData.title || "Actualidad";
  const heroDescription = heroData.description || "Noticias, jornadas, hitos y publicaciones del proyecto.";
  
  const articles: Article[] = rawNews
    .filter(n => new Date(n.publication_date) <= new Date())
    .map(n => {
      const shortDesc = generateShortDesc(n.content_html);
      
      return {
        id: n.id,
        title: n.title,
        type: n.category as ArticleType,
        date: n.publication_date,
        shortDesc: shortDesc || "Sin descripción",
        cover: n.featured_image || DEFAULT_COVER,
        content: n.content_html || ""
      };
    });

  return (
    <div className="articles-page">
      {/* ── Nav ──────────────────────────────────────────────── */}
      <ActualidadHeader />


      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="articles-hero">
        {/* Erizo azul — apoyado en el borde inferior derecho */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/erizo-azul.gif"
          alt=""
          aria-hidden="true"
          className="articles-hero__erizo"
          style={{
            position: "absolute",
            right: "clamp(20px, 5vw, 80px)",
            height: "clamp(160px, 26vw, 320px)",
            width: "auto",
            zIndex: 2,
            pointerEvents: "none",
            transform: "scaleX(-1)",
          }}
        />

        <div className="articles-hero__inner" style={{ position: "relative", zIndex: 3 }}>
          <Link href="/" className="articles-hero__back">
            ← Inicio
          </Link>
          <h1>{heroTitle}</h1>
          <p>{heroDescription}</p>
        </div>
      </section>

      {/* ── Client: búsqueda + grid ───────────────────────────── */}
      <ArticlesClient articles={articles} />

      {/* ── Footer ───────────────────────────────────────────── */}
      <Footer socialLinks={socialLinks} contactEmail={contactEmail} contactPhone={contactPhone} logos={footerLogos} />
    </div>
  );
}
