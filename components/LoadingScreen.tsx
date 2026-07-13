"use client";

import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Hide as soon as the document is fully loaded
    const hide = () => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 650);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      // Fallback just in case load event never fires
      const fallback = setTimeout(hide, 5000);
      return () => clearTimeout(fallback);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        background: "var(--paper, #faf5ec)",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
        transition: "opacity 0.6s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* Erizos animados */}
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/djqtkbyez/image/upload/f_auto,q_auto,w_120/v1783939309/_PST_GIF_18_d7b945.gif"
          alt=""
          width={100}
          height={100}
          style={{
            width: "clamp(72px, 15vw, 110px)",
            height: "auto",
            transform: "scaleX(-1)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/djqtkbyez/image/upload/f_auto,q_auto,w_100/v1783939309/_PST_GIF_19_vh4q8t.gif"
          alt=""
          width={80}
          height={80}
          style={{
            width: "clamp(56px, 11vw, 84px)",
            height: "auto",
            marginBottom: "6px",
          }}
        />
      </div>

      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://res.cloudinary.com/djqtkbyez/image/upload/f_auto,q_auto,w_384/v1783939639/LOGOSVOLVERACASA-04_lfru81.png"
        alt="Volver a Casa"
        width={180}
        height={60}
        style={{
          width: "clamp(120px, 30vw, 180px)",
          height: "auto",
          opacity: 0.85,
        }}
      />

      {/* Barra de carga animada */}
      <div
        style={{
          width: "clamp(100px, 22vw, 160px)",
          height: "3px",
          borderRadius: "2px",
          background: "oklch(0.88 0.04 83)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "2px",
            background: "var(--azul, #2560c4)",
            animation: "loading-bar 2.5s ease-in-out forwards",
            transformOrigin: "left",
          }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%; }
          40%  { width: 60%; }
          80%  { width: 88%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
