import React from "react";

export default function Hero({ data }: { data?: any }) {
  const overhead = data?.overhead || "Una infancia acompañada puede <b>cambiarlo todo</b>";
  const titleHtml = data?.title || "Reconstruyendo <span class=\"accent\">vínculos</span>, acompañando <span class=\"accent-verde\">familias</span>.";
  return (
    <section className="hero" data-variant="b" data-screen-label="Hero">
      {/* brand squiggle background */}
      <div className="hero__bg" aria-hidden="true" />

      <div className="wrap hero__inner">
        <div className="hero__copy">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/djqtkbyez/image/upload/f_auto,q_auto/v1780667034/LOGOSVOLVERACASA_Mesa_de_trabajo_1_eh3gyo.png"
            alt="Logo Volver a Casa"
            className="hero-mobile-logo"
            width={240}
            height={80}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <p className="hero__kicker hablemos" data-reveal="" dangerouslySetInnerHTML={{ __html: overhead }} />
          <h1 data-reveal="" data-delay="1" dangerouslySetInnerHTML={{ __html: titleHtml }} />
        </div>
      </div>

      {/* erizos for variant B */}
      <div className="hero-bandstage" aria-hidden="true">
        <div
          className="erizo e2 float-slow band-erizo"
          style={{ "--rot": "5deg" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/erizos/ansiedad.png"
            alt="Ilustración de erizo que representa la emoción de la ansiedad"
            style={{ transform: "scaleX(-1)" }}
            width={150}
            height={150}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <span className="erizo-bubble">Hola, soy ansiedad</span>
        </div>
        <div
          className="erizo e3 float-slow band-erizo"
          style={{ "--rot": "3deg" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/erizos/alegria.png"
            alt="Ilustración de erizo que representa la emoción de la alegría"
            width={150}
            height={150}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <span className="erizo-bubble">Hola, soy alegría</span>
        </div>
        <div
          className="erizo e4 float band-erizo"
          style={{ "--rot": "-5deg" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/erizos/miedo.png"
            alt="Ilustración de erizo que representa la emoción del miedo"
            style={{ transform: "scaleX(-1)" }}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <span className="erizo-bubble">Hola, soy miedo</span>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="mouse" />
        Desliza
      </div>
    </section>
  );
}
