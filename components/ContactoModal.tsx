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
          <a className="contact-row" href="mailto:info@volveracasa.com">
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
              <span>info@volveracasa.com</span>
            </span>
            <span className="contact-row__a">→</span>
          </a>
          <a
            className="contact-row"
            href="https://instagram.com/volveracasa"
            target="_blank"
            rel="noopener noreferrer"
          >
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
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="#fff" stroke="none" />
              </svg>
            </span>
            <span className="contact-row__t">
              <b>Instagram</b>
              <span>@volveracasa</span>
            </span>
            <span className="contact-row__a">↗</span>
          </a>
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
