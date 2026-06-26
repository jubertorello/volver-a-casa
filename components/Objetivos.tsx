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

export default function Objetivos({ data }: { data?: any }) {
  const title = data?.title || "Crecer en familia lo cambia todo.";
  const description = data?.description || "La institucionalización prolongada afecta al desarrollo emocional, social y familiar de los niños y niñas, pudiendo tener un impacto futuro en su salud mental. Estos son los datos que mueven el proyecto y los objetivos que lo guían.";
  
  const items = data?.items || [
    "Reducir el tiempo que niños y niñas pasan en centros de protección.",
    "Acompañar reunificaciones seguras y sostenidas en el tiempo.",
    "Fortalecer las capacidades parentales de las familias.",
    "Contribuir a la mejora del sistema de protección mediante evidencia y conocimiento."
  ];

  const metrics = data?.metrics || [
    { val: "-40%", desc: "tiempo medio en acogimiento", sub: "Objetivo provisional" },
    { val: "85%", desc: "reunificaciones estables a 12 meses", sub: "Objetivo provisional" },
    { val: "120", desc: "familias acompañadas", sub: "Dato provisional" },
    { val: "70%", desc: "de las familias mejora con acompañamiento", sub: "Objetivo provisional" }
  ];

  const colors = ["on-verde", "on-azul", "on-naranja", "on-rosa"];
  const statClasses = ["stat--verde", "stat--naranja", "", "stat--verde"];

  // Helper to parse metric strings like "-40%" into { count: 40, prefix: "-", suffix: "%" }
  const parseMetric = (valStr: string) => {
    const match = valStr.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
    if (match) {
      return {
        prefix: match[1],
        count: parseFloat(match[2].replace(',', '.')),
        suffix: match[3]
      };
    }
    return { prefix: "", count: 0, suffix: valStr };
  };

  return (
    <section className="section section--tint" id="porque" data-screen-label="03 Objetivos">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <h2>{title}</h2>
          <p className="lead" style={{ fontFamily: "Capriola", fontSize: "16px" }}>
            {description}
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
              {items.map((item: string, idx: number) => (
                <li key={idx}>
                  <span className={colors[idx % colors.length]} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="porque-stats" data-reveal="" data-delay="2">
            {metrics.map((metric: any, idx: number) => {
              const { count, prefix, suffix } = parseMetric(metric.val);
              return (
                <StatCounter
                  key={idx}
                  count={count}
                  prefix={prefix}
                  suffix={suffix}
                  label={metric.desc}
                  provisionalLabel={metric.sub}
                  className={statClasses[idx % statClasses.length]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
