"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import {
  Article,
  ArticleType,
  ALL_TYPES,
  typeColor,
  formatDateShort,
} from "@/lib/articles";

interface ArticlesClientProps {
  articles: Article[];
}

const TYPE_COLOR_MAP: Record<ArticleType, string> = typeColor;

export default function ArticlesClient({ articles }: ArticlesClientProps) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<ArticleType | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchType = activeType ? a.type === activeType : true;
      const matchQuery =
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.shortDesc.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [articles, query, activeType]);

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="articles-toolbar">
        {/* Search */}
        <div className="articles-search">
          <svg
            className="articles-search__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="articles-search-input"
            className="articles-search__input"
            type="search"
            placeholder="Buscar artículos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar en actualidad"
          />
        </div>

        {/* Filters */}
        <div className="articles-filters" role="group" aria-label="Filtrar por tipo">
          <span className="articles-filters__label">Tipo:</span>
          <button
            id="filter-all"
            className={`articles-filter-btn${activeType === null ? " active" : ""}`}
            style={{ "--btn-color": "var(--azul)" } as React.CSSProperties}
            onClick={() => setActiveType(null)}
            aria-pressed={activeType === null}
          >
            Todos
          </button>
          {ALL_TYPES.map((t) => (
            <button
              key={t}
              id={`filter-${t.toLowerCase()}`}
              className={`articles-filter-btn${activeType === t ? " active" : ""}`}
              style={{ "--btn-color": TYPE_COLOR_MAP[t] } as React.CSSProperties}
              onClick={() => setActiveType(activeType === t ? null : t)}
              aria-pressed={activeType === t}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="articles-grid-wrap">
        <p className="articles-count">
          {filtered.length === 1 ? "1 resultado" : `${filtered.length} resultados`}
          {activeType && ` · ${activeType}`}
          {query && ` · "${query}"`}
        </p>

        {filtered.length === 0 ? (
          <div className="articles-empty" role="status">
            <span className="articles-empty__emoji">🔍</span>
            <h3>Sin resultados</h3>
            <p>Prueba con otra búsqueda o elimina los filtros activos.</p>
          </div>
        ) : (
          <div className="grid cols-3">
            {filtered.map((article) => (
              <article key={article.id} className="post">
                {/* Cover */}
                <div className="post__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover}
                    alt={`Portada de ${article.title}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Body */}
                <div className="post__body">
                  <span
                    className="post__cat"
                    style={{ color: TYPE_COLOR_MAP[article.type] }}
                  >
                    {article.type} · {formatDateShort(article.date)}
                  </span>
                  <h3 style={{ color: "var(--azul)", fontWeight: 400, fontSize: "1.18rem" }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--ink-soft)" }}>
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
        )}
      </div>
    </>
  );
}
