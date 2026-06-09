import React from "react";

export default function Proyecto() {
  return (
    <section className="section" id="proyecto" data-screen-label="01 El proyecto">
      <div className="wrap proyecto-const">
        <div className="proyecto-const__head">
          <div data-reveal="">
            <p className="eyebrow">Hablemos de Volver a Casa</p>
            <h2 className="proyecto-const__title">¿Qué es Volver a Casa?</h2>
          </div>
          <div className="proyecto-const__intro" data-reveal="" data-delay="1">
            <p className="lead" style={{ fontFamily: "Capriola", fontSize: "18px" }}>
              Un proyecto de innovación social que acompaña a niños, niñas y sus familias
              en procesos de reunificación familiar, creando las condiciones necesarias para
              reconstruir vínculos protectores y entornos de cuidado y bienestar.
            </p>
            <p style={{ color: "var(--ink-soft)", fontFamily: "Capriola", fontWeight: 400 }}>
              No se trata solo de volver, sino de hacerlo a un entorno que pueda sostener
              el bienestar del niño o la niña. Por eso acompañamos{" "}
              <strong>antes, durante y después</strong> del regreso.
            </p>
          </div>
        </div>
        <div className="proyecto-const__body">
          <div className="proyecto__media" data-reveal="" data-reveal-mode="scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/foto-editorial.png" alt="Niñas y niños dibujando juntos" />
            <div className="float-slow erizo-loose band-erizo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/erizos/ilusion.png" alt="Erizo ilusión" />
              <span className="erizo-bubble">Hola, soy ilusión</span>
            </div>
          </div>
          <div className="proyecto-const__pillars" data-reveal="" data-delay="2">
            <div className="pcard">
              <span className="pcard__dot on-azul" />
              <b>Apoyo psicológico</b>
              <span className="pcard__desc">A niños, niñas y familias.</span>
            </div>
            <div className="pcard">
              <span className="pcard__dot on-verde" />
              <b>Intervención social</b>
              <span className="pcard__desc">Fortalecer capacidades parentales.</span>
            </div>
            <div className="pcard">
              <span className="pcard__dot on-naranja" />
              <b>Trabajo en red</b>
              <span className="pcard__desc">Con los sistemas de protección.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
