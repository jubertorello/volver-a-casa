import React from "react";

export default function Hero() {
  return (
    <section className="hero" data-variant="b" data-screen-label="Hero">
      {/* brand squiggle background */}
      <div className="hero__bg" aria-hidden="true" />

      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker hablemos" data-reveal="">
            Una infancia acompañada puede <b>cambiarlo todo</b>
          </p>
          <h1 data-reveal="" data-delay="1">
            Reconstruyendo <span className="accent">vínculos</span>, acompañando{" "}
            <span className="accent-verde">familias</span>.
          </h1>
        </div>
      </div>

      {/* erizos for variant B */}
      <div className="hero-bandstage">
        <div
          className="erizo e2 float-slow band-erizo"
          style={{ "--rot": "5deg" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/erizos/ansiedad.png"
            alt="Erizo ansiedad"
            style={{ transform: "scaleX(-1)" }}
          />
          <span className="erizo-bubble">Hola, soy ansiedad</span>
        </div>
        <div
          className="erizo e3 float-slow band-erizo"
          style={{ "--rot": "3deg" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/erizos/alegria.png" alt="Erizo alegría" />
          <span className="erizo-bubble">Hola, soy alegría</span>
        </div>
        <div
          className="erizo e4 float band-erizo"
          style={{ "--rot": "-5deg" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/erizos/miedo.png"
            alt="Erizo miedo"
            style={{ transform: "scaleX(-1)" }}
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
