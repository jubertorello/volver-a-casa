import React from "react";

export default function Principios() {
  const cards = [
    {
      erizo: "/assets/erizos/alegria.png",
      title: "Acompañamiento profesional",
      description: "Acompañamiento especializado a niños, niñas y familias para fortalecer vínculos y construir entornos seguros.",
      delay: "1",
    },
    {
      erizo: "/assets/erizos/miedo.png",
      title: "Reunificación familiar",
      description: "Que niños y niñas puedan volver con sus familias cuando exista un entorno preparado y protector.",
      delay: "2",
    },
    {
      erizo: "/assets/erizos/ira.png",
      title: "Prevención y salud mental",
      description: "Trabajamos desde la prevención temprana, porque el vínculo seguro es la base del bienestar emocional.",
      delay: "3",
    },
    {
      erizo: "/assets/erizos/ilusion.png",
      title: "Comunidad y trabajo en red",
      description: "Colaboramos con instituciones, profesionales, entidades y empresas para transformar vidas juntos.",
      delay: "1",
    },
    {
      erizo: "/assets/erizos/tristeza-naranja.png",
      title: "Proceso, no solo resultados",
      description: "Escuchamos, comprendemos, guiamos y celebramos cada pequeño avance hacia un nuevo comienzo.",
      delay: "2",
    },
    {
      erizo: "/assets/erizos/ansiedad.png",
      title: "Enfoque de derechos",
      description: "El interés superior del menor en el centro, en todas las fases de la intervención.",
      delay: "3",
    },
  ];

  return (
    <section className="section" id="metodo" data-screen-label="05 Principios">
      <div className="wrap">
        <div className="section-head center" data-reveal="">
          <p className="eyebrow eyebrow--verde">Hablemos de principios</p>
          <h2>Un proceso para volver a conectar.</h2>
          <p className="lead" style={{ marginInline: "auto", textAlign: "center", fontFamily: "Capriola", fontSize: "18px" }}>
            Seis principios que guían cada intervención y cada proceso de acompañamiento,
            poniendo el valor en cada persona y su realidad.
          </p>
        </div>
        <div className="grid cols-3">
          {cards.map((card, idx) => (
            <div key={idx} className="card" data-reveal="" data-delay={card.delay}>
              <div className="mtd-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.erizo} alt={`Erizo ilustrado que representa el principio de ${card.title.toLowerCase()}`} loading="lazy" />
              </div>
              <h3 style={{ fontSize: "26px" }}>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
