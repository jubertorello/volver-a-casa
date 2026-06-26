"use client";

import React, { useState, useEffect } from "react";

interface HeaderProps {
  onOpenContacto: () => void;
  forceSolid?: boolean;
}

export default function Header({ onOpenContacto, forceSolid }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(forceSolid || false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Monitor scroll to apply .scrolled class to the navbar
  useEffect(() => {
    if (forceSolid) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceSolid]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.includes("#") ? href.substring(href.indexOf("#")) : "";
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    setIsMenuOpen(false);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 76,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const navLinks = [
    { label: "Proyecto", href: "/#proyecto" },
    { label: "Objetivos", href: "/#porque" },
    { label: "Experiencia", href: "/#recorrido" },
    { label: "Actualidad", href: "/#actualidad" },
    { label: "Vídeos", href: "/#videos" },
    { label: "Fundación Manantial", href: "https://www.fundacionmanantial.org/", external: true },
  ];

  return (
    <>
      <header className={`nav ${isScrolled ? "scrolled" : ""}`} data-screen-label="Nav">
        <a
          className="nav__brand"
          href="/#top"
          aria-label="Volver a Casa y Fundación Manantial — inicio"
          onClick={(e) => handleAnchorClick(e, "/#top")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav__logo" src="/assets/logo-volveracasa.png" alt="Volver a Casa" fetchPriority="high" loading="eager" decoding="async" />
          <div className="nav__brand-separator" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav__logo-manantial" src="/assets/logo-manantial.png" alt="Fundación Manantial" fetchPriority="high" loading="eager" decoding="async" />
        </a>
        <nav className="nav__links" aria-label="Principal">
          {navLinks.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  {link.label} <span style={{ fontSize: "0.82em", opacity: 0.8 }}>↗</span>
                </a>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="nav__cta">
          <button
            type="button"
            className="btn"
            onClick={onOpenContacto}
            aria-haspopup="dialog"
          >
            Hablemos <span className="arrow">→</span>
          </button>
          <button
            type="button"
            className={`nav__burger ${isMenuOpen ? "open" : ""}`}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`} id="mobileMenu">
        <div className="mobile-menu__inner">
          {navLinks.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  {link.label} <span style={{ fontSize: "0.82em", opacity: 0.8 }}>↗</span>
                </a>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
          <button
            type="button"
            className="btn"
            onClick={() => {
              setIsMenuOpen(false);
              onOpenContacto();
            }}
            aria-haspopup="dialog"
            style={{ marginTop: "24px", justifyContent: "center" }}
          >
            Hablemos <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </>
  );
}
