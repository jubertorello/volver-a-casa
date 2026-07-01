"use client";

import React, { useEffect, useRef } from "react";

interface ContactoModalProps {
  isOpen: boolean;
  onClose: () => void;
  socialLinks?: any;
  contactEmail?: string;
  contactPhone?: string;
}

export default function ContactoModal({ isOpen, onClose, socialLinks, contactEmail, contactPhone }: ContactoModalProps) {
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
          <a className="contact-row" href={`tel:${(contactPhone || '617 293 880').startsWith('+') ? (contactPhone || '617 293 880') : '+34' + (contactPhone || '617 293 880').replace(/\s+/g, '')}`}>
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
              <span>{contactPhone || "617 293 880"}</span>
            </span>
            <span className="contact-row__a">→</span>
          </a>
          <a className="contact-row" href={`mailto:${contactEmail || 'volveracasa@fundacionmanantial.org'}`}>
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
              <span>{contactEmail || "volveracasa@fundacionmanantial.org"}</span>
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
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "var(--ink)",
                      color: "#fff",
                      transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
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
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "var(--azul-deep)",
                      color: "#fff",
                      transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "15px", height: "15px" }}>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                )}
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
