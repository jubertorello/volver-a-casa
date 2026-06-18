import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Actualidad — Volver a Casa",
  description:
    "Todas las noticias, jornadas, hitos y publicaciones del proyecto Volver a Casa de Fundación Manantial.",
};

export default function ActualidadPage() {
  return (
    <div className="articles-page">
      {/* ── Nav ──────────────────────────────────────────────── */}
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

        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }} aria-label="Principal">
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
                color: link.href === "/actualidad" ? "var(--azul)" : "var(--ink-soft)",
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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="articles-hero">
        {/* Erizo azul — apoyado en el borde inferior derecho */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/erizo-azul.gif"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "clamp(20px, 5vw, 80px)",
            bottom: "0",
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
