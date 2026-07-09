import React from "react";
import Image from "next/image";

export default function Recorrido({ data }: { data?: any }) {
  const overhead = data?.overhead || "Hablemos de nuestra experiencia";
  const title = data?.title || "Volver a Casa es el resultado de un largo recorrido.";
  const description = data?.description || "Es el resultado de años de experiencia, investigación, prevención y aprendizaje junto a familias, profesionales y organizaciones. Este es el recorrido que lo ha hecho posible.";
  
  const hitos = data?.hitos || [
    { sub: "Origen · +15 años", title: "Casa Verde", desc: "Más de 15 años trabajando en salud mental para evitar la separación de los niños con sus madres promoviendo vínculos seguros y estables." },
    { sub: "Investigación", title: "Más Casa", desc: "Investigación, evaluación, impacto y retorno social de la metodología Casa Verde" },
    { sub: "Creación área", title: "Prevención y bienestar infantojuvenil", desc: "Prevención de la salud mental y promoción del bienestar emocional en niños y adolescentes" },
    { sub: "El proyecto · Hoy", title: "Volver a Casa", desc: "Conocimiento aplicado al acompañamiento especializado en procesos de reunificación familiar." }
  ];

  const cta = data?.cta || {
    text: "Volver a Casa es un proyecto que forma parte de la plataforma VIDAS, un ecosistema de innovación social que conecta a diferentes actores e iniciativas que abordan los retos complejos relacionados con la desinstitucionalización.",
    btnText: "Conocer la Plataforma VIDAS",
    btnUrl: "https://plataformavidas.gob.es/"
  };

  return (
    <section className="section section--ink" id="recorrido" data-screen-label="09 El recorrido">
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-head" data-reveal="" style={{ maxWidth: "none" }}>
          <p className="eyebrow eyebrow--cream">{overhead}</p>
          <h2 style={{ maxWidth: "18ch" }}>{title}</h2>
          <p
            className="lead"
            style={{
              color: "oklch(0.974 0.013 83 / .82)",
              maxWidth: "62ch",
              fontFamily: "Capriola",
            }}
          >
            {description}
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
            <a
              href="https://www.youtube.com/watch?v=BSpFhnqwOCE&pp=ygUUY2FzYSB2ZXJkZSBtYW5hbnRpYWw%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="exp-node__dot"
            >
              01
            </a>
            <div className="exp-node__card">
              <span className="exp-stage">{hitos[0]?.sub}</span>
              <h3>{hitos[0]?.title}</h3>
              <p>{hitos[0]?.desc}</p>
            </div>
          </div>

          <div
            className="exp-node"
            data-pos="top"
            style={{ "--x": "37.5%", "--y": "76.92%" } as React.CSSProperties}
          >
            <a
              href="https://mascasaverde.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="exp-node__dot"
            >
              02
            </a>
            <div className="exp-node__card">
              <span className="exp-stage">{hitos[1]?.sub}</span>
              <h3>{hitos[1]?.title}</h3>
              <p>{hitos[1]?.desc}</p>
            </div>
          </div>

          <div
            className="exp-node"
            data-pos="bottom"
            style={{ "--x": "62.5%", "--y": "23.08%" } as React.CSSProperties}
          >
            <a
              href="https://www.fundacionmanantial.org/servicios-de-salud-mental/prevencion-temprana-salud-mental/"
              target="_blank"
              rel="noopener noreferrer"
              className="exp-node__dot"
            >
              03
            </a>
            <div className="exp-node__card">
              <span className="exp-stage">{hitos[2]?.sub}</span>
              <h3>{hitos[2]?.title}</h3>
              <p>{hitos[2]?.desc}</p>
            </div>
          </div>

          <div
            className="exp-node exp-node--hl"
            data-pos="top"
            style={{ "--x": "87.5%", "--y": "76.92%" } as React.CSSProperties}
          >
            <span className="exp-node__dot exp-node__dot--casa">
              <Image src="/assets/casita-blanca.png" alt="Ilustración de una casita blanca que represents el regreso al hogar" width={24} height={24} loading="lazy" />
            </span>
            <div className="exp-node__card">
              <span className="exp-stage">{hitos[3]?.sub}</span>
              <h3>{hitos[3]?.title}</h3>
              <p>{hitos[3]?.desc}</p>
            </div>
          </div>
        </div>

        <div className="recorrido__foot" data-reveal="">
          <p className="recorrido__msg">{cta?.text}</p>
          <a
            href={cta?.btnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--cream"
          >
            {/* Strip any trailing arrow from btnText to avoid duplication */}
            {String(cta?.btnText || '').replace(/\s*↗\s*$/, '')} <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
