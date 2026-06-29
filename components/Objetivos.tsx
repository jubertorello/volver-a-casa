"use client";

import React, { useState, useEffect, useRef } from "react";



export default function Objetivos({ data }: { data?: any }) {
  const title = data?.title || "Crecer en familia lo cambia todo.";
  const description = data?.description || "La institucionalización prolongada afecta al desarrollo emocional, social y familiar de los niños y niñas, pudiendo tener un impacto futuro en su salud mental. Estos son los datos que mueven el proyecto y los objetivos que lo guían.";
  
  const items = data?.items || [
    "Reducir el tiempo que niños y niñas pasan en centros de protección.",
    "Acompañar reunificaciones seguras y sostenidas en el tiempo.",
    "Fortalecer las capacidades parentales de las familias.",
    "Contribuir a la mejora del sistema de protección mediante evidencia y conocimiento."
  ];

  const colors = ["on-verde", "on-azul", "on-naranja", "on-rosa"];
  const statClasses = ["stat--verde", "stat--naranja", "", "stat--verde"];

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
            gridTemplateColumns: "1fr",
            gap: "clamp(32px,5vw,72px)",
            alignItems: "start",
          }}
        >
          <div className="porque-stats" data-reveal="" data-delay="1">
            {items.map((item: string, idx: number) => (
              <div 
                key={idx} 
                className={`card stat ${statClasses[idx % statClasses.length]}`} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "16px", 
                  padding: "clamp(24px, 2vw, 32px)",
                  textAlign: "left"
                }}
              >
                <span className={`dot ${colors[idx % colors.length]}`} style={{ width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0 }} />
                <span className="stat__label" style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
