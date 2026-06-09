"use client";

import React, { useState, useEffect, useRef } from "react";

interface StatCounterProps {
  count: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  provisionalLabel: string;
  className?: string;
}

function StatCounter({
  count,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  provisionalLabel,
  className = "",
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(
    prefix + (0).toLocaleString("es-ES") + suffix
  );
  const elementRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const runCounter = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setDisplayValue(prefix + count.toLocaleString("es-ES") + suffix);
        return;
      }

      const dur = 1500;
      const t0 = performance.now();

      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3); // cubic ease-out
        const currentVal = count * eased;
        setDisplayValue(
          prefix +
            Number(currentVal.toFixed(decimals)).toLocaleString("es-ES") +
            suffix
        );

        if (k < 1) {
          requestAnimationFrame(tick);
        } else {
          setDisplayValue(prefix + count.toLocaleString("es-ES") + suffix);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runCounter();
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [count, decimals, prefix, suffix]);

  return (
    <div className={`card stat ${className}`}>
      <span ref={elementRef} className="stat__num">
        {displayValue}
      </span>
      <span className="stat__label">{label}</span>
      <span className="provisional">{provisionalLabel}</span>
    </div>
  );
}

export default function Objetivos() {
  return (
    <section className="section section--tint" id="porque" data-screen-label="03 Objetivos">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="eyebrow eyebrow--naranja">Hablemos de objetivos</p>
          <h2>Crecer en familia lo cambia todo.</h2>
          <p className="lead" style={{ fontFamily: "Capriola", fontSize: "16px" }}>
            La institucionalización prolongada afecta al desarrollo emocional, social y a
            la salud mental. Estos son los datos que mueven el proyecto y los objetivos que lo
            guían.
          </p>
        </div>
        <div
          className="porque-body grid mstack"
          style={{
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "clamp(32px,5vw,72px)",
            alignItems: "start",
          }}
        >
          <div className="porque-objetivos" data-reveal="" data-delay="1">
            <p className="porque-kicker">Nuestros objetivos</p>
            <ul className="impact-list">
              <li>
                <span className="on-verde" />
                Reducir el tiempo que niños y niñas pasan en centros de protección.
              </li>
              <li>
                <span className="on-azul" />
                Acompañar reunificaciones seguras y sostenidas en el tiempo.
              </li>
              <li>
                <span className="on-naranja" />
                Fortalecer las capacidades parentales de las familias.
              </li>
              <li>
                <span className="on-rosa" />
                Contribuir a la mejora del sistema de protección mediante evidencia y
                conocimiento.
              </li>
            </ul>
          </div>
          <div className="porque-stats" data-reveal="" data-delay="2">
            <StatCounter
              count={40}
              prefix="−"
              suffix="%"
              label="tiempo medio en acogimiento"
              provisionalLabel="Objetivo provisional"
              className="stat--verde"
            />
            <StatCounter
              count={85}
              suffix="%"
              label="reunificaciones estables a 12 meses"
              provisionalLabel="Objetivo provisional"
              className="stat--naranja"
            />
            <StatCounter
              count={120}
              label="familias acompañadas"
              provisionalLabel="Dato provisional"
            />
            <StatCounter
              count={70}
              suffix="%"
              label="de las familias mejora con acompañamiento"
              provisionalLabel="Objetivo provisional"
              className="stat--verde"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
