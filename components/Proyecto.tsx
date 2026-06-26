import React from "react";

export default function Proyecto({ data }: { data?: any }) {
  const title = data?.title || "¿Qué es Volver a Casa?";
  const descriptionHtml = data?.description || '<p class="lead" style="font-family: Capriola; font-size: 18px;">Un proyecto de <a href="https://www.manantial.org" target="_blank" rel="noopener noreferrer"><strong>Fundación Manantial</strong></a>, de innovación social que acompaña a niños y niñas institucionalizados y sus familias en procesos de reunificación familiar, creando las condiciones necesarias para reconstruir vínculos protectores y entornos de cuidado y bienestar.</p><p style="color: var(--ink-soft); font-family: Capriola; font-weight: 400;">No se trata solo de volver, sino de hacerlo a un entorno que pueda sostener el bienestar del niño o la niña. Por eso acompañamos <strong>antes, durante y después</strong> del regreso.</p><p style="color: var(--ink-soft); font-family: Capriola; font-weight: 400; margin-top: 16px;">Cofinanciado por la Unión Europea, el Ministerio de Trabajo y Economía Social y Fondos Europeos, y el Ministerio de Derechos Sociales, Consumo y Agenda 2030. Con la colaboración de Fundación Nemesio Díez y la Dirección General de Infancia, Familia y Fomento de la Natalidad de la Comunidad de Madrid.</p>';

  const items = data?.items || [
    { title: "Apoyo psicológico", description: "A niños y niñas institucionalizados en centros residenciales y a sus familias de origen." },
    { title: "Intervención social", description: "Fortalecer capacidades parentales para lograr el retorno de los niños al hogar en condiciones de seguridad y estabilidad." },
    { title: "Trabajo en red", description: "Con los sistemas de protección." }
  ];

  const colors = ["on-azul", "on-verde", "on-naranja"];

  return (
    <section className="section" id="proyecto" data-screen-label="01 El proyecto">
      <div className="wrap proyecto-const">
        <div className="proyecto-const__head">
          <div data-reveal="">
            <h2 className="proyecto-const__title">{title}</h2>
          </div>
          <div className="proyecto-const__intro" data-reveal="" data-delay="1" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div>
        <div className="proyecto-const__body">
          <div className="proyecto__media" data-reveal="" data-reveal-mode="scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/foto-editorial.png" alt="Niñas y niños dibujando juntos" loading="lazy" decoding="async" />
            <div className="float-slow erizo-loose band-erizo" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/erizos/ilusion.png" alt="Ilustración de erizo que representa la emoción de la ilusión" loading="lazy" decoding="async" />
              <span className="erizo-bubble">Hola, soy ilusión</span>
            </div>
          </div>
          <div className="proyecto-const__pillars" data-reveal="" data-delay="2">
            {items.map((item: any, idx: number) => (
              <div className="pcard" key={idx}>
                <span className={`pcard__dot ${colors[idx % colors.length]}`} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--azul)", margin: 0 }}>{item.title}</h3>
                <span className="pcard__desc">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
