"use client";

import React, { useEffect, useRef } from "react";

interface ContactoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactoModal({ isOpen, onClose }: ContactoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap and escape key handler
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // ensure clean up
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal open" id="contactoModal" aria-hidden="false">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__card" role="dialog" aria-modal="true" aria-labelledby="contactoTitle">
        <button
          ref={closeButtonRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <p className="eyebrow">Hablemos</p>
        <h2 id="contactoTitle" style={{ margin: "10px 0 12px" }}>¿Hablamos?</h2>
        <p className="lead" style={{ marginBottom: "26px" }}>
          Cuéntanos en qué podemos acompañarte. Estamos aquí para escucharte.
        </p>
        <div className="contact-rows">
          <a className="contact-row" href="tel:+34617293880">
            <span className="contact-row__ic" style={{ background: "var(--azul)" }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "20px", height: "20px" }}
              >
                <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z" />
              </svg>
            </span>
            <span className="contact-row__t">
              <b>Teléfono</b>
              <span>617 293 880</span>
            </span>
            <span className="contact-row__a">→</span>
          </a>
          <a className="contact-row" href="mailto:volveracasa@fundacionmanantial.org">
            <span className="contact-row__ic" style={{ background: "var(--verde)" }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "20px", height: "20px" }}
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span className="contact-row__t">
              <b>Email</b>
              <span>volveracasa@fundacionmanantial.org</span>
            </span>
            <span className="contact-row__a">→</span>
          </a>
          <div className="contact-row" style={{ cursor: "default" }}>
            <span className="contact-row__ic" style={{ background: "var(--naranja)" }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "20px", height: "20px" }}
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </span>
            <span className="contact-row__t" style={{ width: "100%" }}>
              <b>Redes sociales</b>
              <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                <a
                  href="https://instagram.com/volveracasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--naranja)",
                    color: "#fff",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "16px", height: "16px" }}
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--verde)",
                    color: "#fff",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "16px", height: "16px" }}
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
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
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--azul)",
                    color: "#fff",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "16px", height: "16px" }}
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </span>
          </div>
        </div>
        <p style={{ marginTop: "22px", fontSize: "var(--fs-sm)", color: "var(--ink-faint)" }}>
          Un proyecto de{" "}
          <a
            href="https://www.fundacionmanantial.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--azul)", fontWeight: 700, textDecoration: "underline" }}
          >
            Fundación Manantial
          </a>
          .
        </p>
      </div>
    </div>
  );
}
