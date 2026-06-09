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
                alt="Volver a Casa"
              />
            </div>
            <p
              style={{
                color: "oklch(0.974 0.013 83 / .72)",
                maxWidth: "34ch",
                marginBottom: "20px",
                fontFamily: "Capriola",
                fontSize: "12px",
              }}
            >
              Reconstruyendo vínculos, acompañando familias. Un proyecto de innovación
              social de Fundación Manantial.
            </p>
            <div className="social">
              <a
                href="https://instagram.com/volveracasa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <span style={{ fontWeight: 700 }}>IG</span>
              </a>
              <a href="#" aria-label="LinkedIn">
                <span style={{ fontWeight: 700 }}>in</span>
              </a>
              <a href="#" aria-label="YouTube">
                <span style={{ fontWeight: 700 }}>▶</span>
              </a>
            </div>
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
                <a href="#hablemos" onClick={(e) => handleAnchorClick(e, "#hablemos")}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#metodo" onClick={(e) => handleAnchorClick(e, "#metodo")}>
                  Principios
                </a>
              </li>
              <li>
                <a href="#historias" onClick={(e) => handleAnchorClick(e, "#historias")}>
                  Historias
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
                <a href="https://volveracasa.com" target="_blank" rel="noopener noreferrer">
                  volveracasa.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/volveracasa" target="_blank" rel="noopener noreferrer">
                  @volveracasa
                </a>
              </li>
              <li>
                <a href="#recorrido" onClick={(e) => handleAnchorClick(e, "#recorrido")}>
                  Experiencia
                </a>
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

        <div className="footer__funders">
          <span
            style={{
              fontSize: ".74rem",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "oklch(0.974 0.013 83 / .5)",
              fontWeight: 700,
              width: "100%",
            }}
          >
            Con el impulso y la colaboración de
          </span>
          <span className="funder">Fundación Manantial</span>
          <span className="funder">
            Comunidad de Madrid · D.G. de Infancia, Familia y Fomento de la Natalidad
          </span>
          <span className="funder">Ministerio de Derechos Sociales, Consumo y Agenda 2030</span>
          <span className="funder">Cofinanciado por el FSE+</span>
          <span className="funder">Fundación Nemesio Díez</span>
          <span className="funder">Financiado por la Unión Europea · NextGenerationEU</span>
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
