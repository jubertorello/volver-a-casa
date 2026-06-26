import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ArticlesClient from "./ArticlesClient";
import Footer from "@/components/Footer";
import ActualidadHeader from "@/components/ActualidadHeader";
import { getNews } from "@/lib/services/news.service";
import { DEFAULT_COVER, Article, ArticleType, generateShortDesc } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Actualidad — Volver a Casa",
  description:
    "Todas las noticias, jornadas, hitos y publicaciones del proyecto Volver a Casa de Fundación Manantial.",
};

export const revalidate = 0;

export default async function ActualidadPage() {
  const rawNews = await getNews();
  
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
          <h1>Actualidad</h1>
          <p>Noticias, jornadas, hitos y publicaciones del proyecto.</p>
        </div>
      </section>

      {/* ── Client: búsqueda + grid ───────────────────────────── */}
      <ArticlesClient articles={articles} />

      {/* ── Footer ───────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
