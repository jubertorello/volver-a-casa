import React from "react";

export default function Proyecto() {
  return (
    <section className="section" id="proyecto" data-screen-label="01 El proyecto">
      <div className="wrap proyecto-const">
        <div className="proyecto-const__head">
          <div data-reveal="">
            <h2 className="proyecto-const__title">¿Qué es Volver a Casa?</h2>
          </div>
          <div className="proyecto-const__intro" data-reveal="" data-delay="1">
            <p className="lead" style={{ fontFamily: "Capriola", fontSize: "18px" }}>
              Un proyecto de <a href="https://www.manantial.org" target="_blank" rel="noopener noreferrer"><strong>Fundación Manantial</strong></a>, de innovación social que acompaña a niños y niñas institucionalizados y sus familias
              en procesos de reunificación familiar, creando las condiciones necesarias para
              reconstruir vínculos protectores y entornos de cuidado y bienestar.
            </p>
            <p style={{ color: "var(--ink-soft)", fontFamily: "Capriola", fontWeight: 400 }}>
              No se trata solo de volver, sino de hacerlo a un entorno que pueda sostener
              el bienestar del niño o la niña. Por eso acompañamos{" "}
              <strong>antes, durante y después</strong> del regreso.
            </p>
            <p style={{ color: "var(--ink-soft)", fontFamily: "Capriola", fontWeight: 400, marginTop: "16px" }}>
              Cofinanciado por la Unión Europea, el Ministerio de Trabajo y Economía Social y Fondos Europeos, y el Ministerio de Derechos Sociales, Consumo y Agenda 2030. Con la colaboración de Fundación Nemesio Díez y la Dirección General de Infancia, Familia y Fomento de la Natalidad de la Comunidad de Madrid.
            </p>
          </div>
        </div>
        <div className="proyecto-const__body">
          <div className="proyecto__media" data-reveal="" data-reveal-mode="scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/foto-editorial.png" alt="Niñas y niños dibujando juntos" loading="lazy" decoding="async" />
            <div className="float-slow erizo-loose band-erizo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/erizos/ilusion.png" alt="Ilustración de erizo que representa la emoción de la ilusión" loading="lazy" decoding="async" />
              <span className="erizo-bubble">Hola, soy ilusión</span>
            </div>
          </div>
          <div className="proyecto-const__pillars" data-reveal="" data-delay="2">
            <div className="pcard">
              <span className="pcard__dot on-azul" />
              <b>Apoyo psicológico</b>
              <span className="pcard__desc">A niños y niñas institucionalizados en centros residenciales y a sus familias de origen.</span>
            </div>
            <div className="pcard">
              <span className="pcard__dot on-verde" />
              <b>Intervención social</b>
              <span className="pcard__desc">Fortalecer capacidades parentales para lograr el retorno de los niños al hogar en condiciones de seguridad y estabilidad.</span>
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
