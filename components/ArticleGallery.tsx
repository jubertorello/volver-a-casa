"use client";

import React, { useState, useEffect } from "react";

interface ArticleGalleryProps {
  images: string[];
}

export default function ArticleGallery({ images }: ArticleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, images]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  };

  return (
    <>
      <section className="article-gallery">
        <h2 className="article-gallery__title">Galería</h2>
        <div className="article-gallery__grid">
          {images.map((src, i) => (
            <button
              key={i}
              className="article-gallery__item"
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver imagen ${i + 1} en grande`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Galería imagen ${i + 1}`} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className="article-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
          onClick={() => setActiveIndex(null)}
        >
          {/* Botón Anterior */}
          <button
            className="article-lightbox__prev"
            onClick={handlePrev}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="article-lightbox__img"
            src={images[activeIndex]}
            alt={`Imagen ampliada ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Botón Siguiente */}
          <button
            className="article-lightbox__next"
            onClick={handleNext}
            aria-label="Imagen siguiente"
          >
            ›
          </button>

          <button
            className="article-lightbox__close"
            onClick={() => setActiveIndex(null)}
            aria-label="Cerrar imagen"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
