import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";
import Footer from "@/components/Footer";

import ActualidadHeader from "@/components/ActualidadHeader";

export const metadata: Metadata = {
  title: "Actualidad — Volver a Casa",
  description:
    "Todas las noticias, jornadas, hitos y publicaciones del proyecto Volver a Casa de Fundación Manantial.",
};

export default function ActualidadPage() {
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
