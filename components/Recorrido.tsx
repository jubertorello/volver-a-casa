import React from "react";

export default function Recorrido() {
  return (
    <section className="section section--ink" id="recorrido" data-screen-label="09 El recorrido">
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-head" data-reveal="" style={{ maxWidth: "none" }}>
          <p className="eyebrow eyebrow--cream">Hablemos de nuestra experiencia</p>
          <h2 style={{ maxWidth: "18ch" }}>Volver a Casa es el resultado de un largo recorrido.</h2>
          <p
            className="lead"
            style={{
              color: "oklch(0.974 0.013 83 / .82)",
              maxWidth: "62ch",
              fontFamily: "Capriola",
            }}
          >
            Es el resultado de años de experiencia, investigación, prevención y
            aprendizaje junto a familias, profesionales y organizaciones. Este es el
            recorrido que lo ha hecho posible.
          </p>
        </div>

        <div className="exp-wave" data-reveal="">
          <svg
            className="exp-wave__svg"
            viewBox="0 0 1200 260"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path
              className="exp-wave__path"
              d="M 0 130 C 75 130 75 60 150 60 C 300 60 300 200 450 200 C 600 200 600 60 750 60 C 900 60 900 200 1050 200 C 1125 200 1125 130 1200 130"
            />
          </svg>

          {/* Vertical wavy SVG for mobile only */}
          <svg
            className="exp-wave__svg-mobile"
            viewBox="0 0 50 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="exp-wave__path"
              d="M 25 0 C 25 30, 8 50, 8 80 C 8 110, 42 130, 42 160 C 42 190, 8 210, 8 240 C 8 270, 42 290, 42 320 C 42 350, 25 370, 25 400"
            />
          </svg>

          <div
            className="exp-node"
            data-pos="bottom"
            style={{ "--x": "12.5%", "--y": "23.08%" } as React.CSSProperties}
          >
            <span className="exp-node__dot">01</span>
            <div className="exp-node__card">
              <span className="exp-stage">Origen · +15 años</span>
              <h3>Casa Verde</h3>
              <p>
                Más de 15 años trabajando con infancia, familias y salud mental para
                prevenir la ruptura del vínculo.
              </p>
            </div>
          </div>

          <div
            className="exp-node"
            data-pos="top"
            style={{ "--x": "37.5%", "--y": "76.92%" } as React.CSSProperties}
          >
            <span className="exp-node__dot">02</span>
            <div className="exp-node__card">
              <span className="exp-stage">Investigación</span>
              <h3>Más Casa</h3>
              <p>
                Investigación, aprendizaje y evaluación del modelo para comprender qué
                funciona y generar mayor impacto.
              </p>
            </div>
          </div>

          <div
            className="exp-node"
            data-pos="bottom"
            style={{ "--x": "62.5%", "--y": "23.08%" } as React.CSSProperties}
          >
            <span className="exp-node__dot">03</span>
            <div className="exp-node__card">
              <span className="exp-stage">Red estatal</span>
              <h3>Plataforma VIDAS</h3>
              <p>
                Red de innovación social impulsada por el Ministerio de Derechos
                Sociales, de la que formamos parte.
              </p>
            </div>
          </div>

          <div
            className="exp-node exp-node--hl"
            data-pos="top"
            style={{ "--x": "87.5%", "--y": "76.92%" } as React.CSSProperties}
          >
            <span className="exp-node__dot exp-node__dot--casa">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/casita-blanca.png" alt="" />
            </span>
            <div className="exp-node__card">
              <span className="exp-stage">El proyecto · Hoy</span>
              <h3>Volver a Casa</h3>
              <p>
                Ese conocimiento aplicado a los procesos de reunificación familiar y al
                acompañamiento especializado.
              </p>
            </div>
          </div>
        </div>

        <div className="recorrido__foot" data-reveal="">
          <p className="recorrido__msg">
            Cada paso ha sumado experiencia, evidencia y red. Volver a Casa es todo ese
            aprendizaje puesto al servicio de las familias.
          </p>
          <a
            href="https://plataformavidas.gob.es/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--cream"
          >
            Conocer la Plataforma VIDAS <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
