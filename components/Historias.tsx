import React from "react";
import ImageSlot from "@/components/ImageSlot";

export default function Historias() {
  return (
    <section className="section section--tint" id="historias" data-screen-label="07 Historias">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="eyebrow eyebrow--naranja">Hablemos de historias</p>
          <h2>Detrás de cada proceso, una vida que vuelve a empezar.</h2>
          <p className="lead" style={{ fontFamily: "Capriola", fontSize: "16px" }}>
            Compartimos experiencias reales cuidando siempre la dignidad y la
            privacidad de los niños y las niñas. Sus voces, sin exponerles.
          </p>
        </div>
        <div
          className="grid mstack"
          style={{
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "clamp(24px,4vw,48px)",
            alignItems: "stretch",
          }}
        >
          <article
            className="card"
            data-reveal=""
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "24px",
              background: "var(--azul)",
              color: "var(--paper)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "4rem",
                lineHeight: "1",
                opacity: 0.5,
                display: "block",
                marginBottom: "-16px",
                marginLeft: "-4px",
              }}
            >
              “
            </span>
            <p className="quote" style={{ color: "var(--paper)", maxWidth: "24ch" }}>
              Cuando volvió a casa, no solo regresó él. Volvimos a confiar todos.
            </p>
            <p style={{ color: "oklch(0.992 0.006 85 / .8)", fontWeight: 700 }}>
              — Testimonio de una familia acompañada
              <br />
              <span style={{ fontWeight: 400, opacity: 0.8 }}>
                Nombre protegido por privacidad.
              </span>
            </p>
          </article>
          <div className="grid" style={{ gap: "18px" }} data-reveal="" data-delay="2">
            <article className="post" style={{ boxShadow: "var(--shadow-md)" }}>
              <div className="post__media">
                <ImageSlot
                  id="historia-1"
                  shape="rect"
                  placeholder="Ilustración / detalle (sin rostros de menores)"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="post__body">
                <span className="post__cat" style={{ color: "var(--verde-deep)" }}>
                  Proceso real
                </span>
                <h3 style={{ fontSize: "1.15rem" }}>El valor del seguimiento</h3>
                <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-soft)" }}>
                  Cómo el acompañamiento continuo sostiene la reunificación.
                </p>
              </div>
            </article>
            <a
              href="#"
              className="link-arrow"
              data-reveal=""
              data-delay="3"
              style={{ paddingLeft: "4px" }}
            >
              Ver más historias y procesos <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
