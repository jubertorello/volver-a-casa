"use client";

import React from "react";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";

export default function Footer({ logos, socialLinks, contactEmail, contactPhone }: { logos?: any[], socialLinks?: any, contactEmail?: string, contactPhone?: string }) {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 76,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <footer className="footer" id="contacto" data-screen-label="Footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="footer__logo"
                src="https://res.cloudinary.com/djqtkbyez/image/upload/f_auto,q_auto,w_384/v1780685493/LOGOSVOLVERACASA-05_u9b62r.png"
                alt="Logo Volver a Casa en blanco"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p
              style={{
                color: "oklch(0.974 0.013 83 / .72)",
                maxWidth: "36ch",
                marginBottom: "20px",
                fontFamily: "Capriola",
                fontSize: "12px",
                lineHeight: "1.5",
              }}
            >
              Reconstruyendo vínculos, acompañando familias. Un proyecto de innovación
              social de <strong>Fundación Manantial</strong>, referente en prevención en salud mental en la infancia y la adolescencia.
            </p>
          </div>
          <div className="footer__col">
            <h4>Explora</h4>
            <ul>
              <li>
                <a href="#proyecto" onClick={(e) => handleAnchorClick(e, "#proyecto")}>
                  Proyecto
                </a>
              </li>
              <li>
                <a href="#porque" onClick={(e) => handleAnchorClick(e, "#porque")}>
                  Objetivos
                </a>
              </li>
              <li>
                <a href="#recorrido" onClick={(e) => handleAnchorClick(e, "#recorrido")}>
                  Experiencia
                </a>
              </li>
              <li>
                <a href="#actualidad" onClick={(e) => handleAnchorClick(e, "#actualidad")}>
                  Actualidad
                </a>
              </li>
              <li>
                <a href="#videos" onClick={(e) => handleAnchorClick(e, "#videos")}>
                  Vídeos
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href={`tel:${(contactPhone || '617 293 880').startsWith('+') ? (contactPhone || '617 293 880') : '+34' + (contactPhone || '617 293 880').replace(/\s+/g, '')}`}>
                  {contactPhone || "617 293 880"}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail || 'volveracasa@fundacionmanantial.org'}`}>
                  {contactEmail || "volveracasa@fundacionmanantial.org"}
                </a>
              </li>
              <li style={{ marginTop: "12px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {socialLinks?.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--naranja)",
                        color: "#fff",
                        transition: "transform 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "18px", height: "18px" }}>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </a>
                  )}
                  {socialLinks?.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--azul)",
                        color: "#fff",
                        transition: "transform 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "18px", height: "18px" }}>
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </a>
                  )}
                  {socialLinks?.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--ink)",
                        color: "#fff",
                        transition: "transform 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px" }}>
                        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                        <path d="M9 11L4 20"/>
                        <path d="M20 4l-5 6"/>
                      </svg>
                    </a>
                  )}
                  {socialLinks?.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--azul-deep)",
                        color: "#fff",
                        transition: "transform 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "17px", height: "17px" }}>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__funders" style={{ borderTop: "1px solid oklch(0.974 0.013 83 / 0.14)", paddingTop: "32px", marginTop: "32px" }}>
          {logos?.map((logo, idx) => (
            <div key={idx} className="funder" style={{ flexDirection: logo.overhead ? "column" : "row", gap: logo.overhead ? "6px" : "0" }}>
              {logo.overhead && (
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: ".05em",
                    color: "var(--azul)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {logo.overhead}
                </span>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.imgUrl}
                alt={logo.alt}
                style={{ 
                  borderRadius: "4px",
                  maxHeight: logo.overhead ? "70px" : "95px",
                  maxWidth: "100%",
                  objectFit: "contain"
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <div className="footer__legal">
          <span>
            © 2026 Volver a Casa · Fundación Manantial. Todos los derechos reservados. | Diseñado y Desarrollado By{" "}
            <a 
              href="https://wa.me/34660104026" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Honest Tech Factory
            </a>
          </span>
          <span style={{ display: "flex", gap: "18px" }}>
            <Link href="/politica-privacidad">Política de privacidad</Link>
            <Link href="/aviso-legal">Aviso legal</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
