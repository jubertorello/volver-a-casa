"use client";

import React from "react";
import ImageSlot from "@/components/ImageSlot";

export default function Footer() {
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
                src="/assets/logo-volveracasa-blanco.png"
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
                <a href="tel:+34617293880">617 293 880</a>
              </li>
              <li>
                <a href="mailto:volveracasa@fundacionmanantial.org">
                  volveracasa@fundacionmanantial.org
                </a>
              </li>
              <li style={{ marginTop: "12px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <a
                    href="https://instagram.com/volveracasa"
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
                  <a
                    href="https://www.tiktok.com/@volveracasa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--verde)",
                      color: "#fff",
                      transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "18px", height: "18px" }}>
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@FundacionManantial"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--azul-deep)",
                      color: "#fff",
                      border: "1px solid oklch(0.974 0.013 83 / 0.15)",
                      transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px" }}>
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="footer__col" style={{ textAlign: "center" }}>
            <h4>¿Más info?</h4>
            <div className="footer__qr">
              <ImageSlot
                id="footer-qr"
                shape="rounded"
                radius={10}
                placeholder="QR"
                alt="Código QR para escanear y acceder a información adicional sobre el proyecto Volver a Casa"
              />
            </div>
            <span
              style={{
                fontSize: ".74rem",
                color: "oklch(0.974 0.013 83 / .55)",
                display: "block",
                marginTop: "8px",
              }}
            >
              Escanea el código
            </span>
          </div>
        </div>

        <p
          style={{
            borderTop: "1px solid oklch(0.974 0.013 83 / 0.14)",
            borderBottom: "1px solid oklch(0.974 0.013 83 / 0.14)",
            paddingTop: "32px",
            paddingBottom: "32px",
            marginTop: "32px",
            marginBottom: "32px",
            color: "oklch(0.974 0.013 83 / 0.65)",
            fontSize: "0.82rem",
            lineHeight: "1.6",
            textAlign: "center",
            width: "100%"
          }}
        >
          Cofinanciado por la Unión Europea, el Ministerio de Trabajo y Economía Social y Fondos Europeos, y el Ministerio de Derechos Sociales, Consumo y Agenda 2030. Con la colaboración de Fundación Nemesio Díez y la Dirección General de Infancia, Familia y Fomento de la Natalidad de la Comunidad de Madrid.
        </p>

        <div className="footer__funders" style={{ borderTop: "none", paddingTop: 0 }}>
          {/* 1. Ministerio */}
          <div className="funder">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-mdsca.jpg"
              alt="Ministerio de Derechos Sociales, Consumo y Agenda 2030"
              style={{ borderRadius: "4px" }}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 2. FSE+ */}
          <div className="funder">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-fse.png"
              alt="Cofinanciado por el FSE+"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 3. Unión Europea */}
          <div className="funder">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-union-europea.png"
              alt="Financiado por la Unión Europea · NextGenerationEU"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 4. Fundación Manantial */}
          <div className="funder">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-manantial.png"
              alt="Fundación Manantial"
              style={{ filter: "brightness(0) invert(1)" }}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 5. Nemesio Díez con texto arriba */}
          <div className="funder" style={{ flexDirection: "column", gap: "6px" }}>
            <span
              style={{
                fontSize: "10px",
                letterSpacing: ".05em",
                color: "oklch(0.974 0.013 83 / .6)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Con la colaboración de
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-nemesio-diez.png"
              alt="Fundación Nemesio Díez"
              style={{ maxHeight: "36px" }}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 6. Comunidad de Madrid */}
          <div className="funder">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-comunidad-madrid.png"
              alt="Comunidad de Madrid · D.G. de Infancia, Familia y Fomento de la Natalidad"
              style={{ borderRadius: "4px" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="footer__legal">
          <span>© 2026 Volver a Casa · Fundación Manantial. Todos los derechos reservados.</span>
          <span style={{ display: "flex", gap: "18px" }}>
            <a href="#">Privacidad</a>
            <a href="#">Aviso legal</a>
            <a href="#">Accesibilidad</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
