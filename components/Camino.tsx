"use client";

import React, { useEffect, useRef } from "react";

interface StepItem {
  phase: string;
  title: string;
  description: string;
}

export default function Camino() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stepsData: StepItem[] = [
    {
      phase: "Recepción",
      title: "Detección de la necesidad",
      description: "Conocemos la situación de la familia y del niño o la niña, y construimos el primer vínculo de confianza.",
    },
    {
      phase: "Valoración",
      title: "Evaluación profesional",
      description: "Equipo interdisciplinar que valora condiciones, recursos y posibilidades reales de retorno seguro.",
    },
    {
      phase: "Vínculo",
      title: "Inicio del acompañamiento",
      description: "Apoyo emocional y terapéutico para reconstruir el vínculo entre la familia y el menor.",
    },
    {
      phase: "Preparación",
      title: "Construcción de un entorno seguro",
      description: "Fortalecemos las capacidades parentales y preparamos un hogar protector y estable.",
    },
    {
      phase: "Retorno",
      title: "Proceso de reunificación",
      description: "El regreso al hogar, gradual y acompañado, cuando existen garantías de cuidado y bienestar.",
    },
    {
      phase: "Seguimiento",
      title: "Seguimiento y apoyo continuo",
      description: "Seguimos cerca para que la reunificación sea estable y sostenida en el tiempo.",
    },
  ];

  useEffect(() => {
    const pathEl = containerRef.current;
    if (!pathEl) return;

    const waveEl = pathEl.querySelector(".path__wave") as SVGElement | null;
    const waveTrack = pathEl.querySelector(".track") as SVGPathElement | null;
    const stepsEls = Array.from(pathEl.querySelectorAll(".step")) as HTMLElement[];

    if (!waveEl || !waveTrack) return;

    let waveLen = 0;
    let waveH = 0;

    const roadSpan = () => {
      const pr = pathEl.getBoundingClientRect();
      const sectionEl = pathEl.closest(".section");
      const sr = sectionEl ? sectionEl.getBoundingClientRect() : pr;
      return Math.max(pr.height, sr.bottom - pr.top);
    };

    const buildWave = () => {
      const H = pathEl.getBoundingClientRect().height;
      if (!H) return;
      waveH = H;
      const span = roadSpan();
      const Htotal = span + 90; // extra padding
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const cx = isMobile ? 40 : 60; // centre of svg
      
      let d = "";
      const isMobileWave = isMobile;

      if (isMobileWave) {
        // Mobile timeline curve
        const off = 24;
        const seg = 140;
        d = `M ${cx} 0`;
        let yy = 0;
        while (yy < Htotal) {
          let end = yy + seg;
          if (end > Htotal) end = Htotal;
          const len = end - yy;
          const o = off * Math.min(1, len / seg);
          d += ` C ${cx + o} ${yy + len * 0.42}, ${cx - o} ${yy + len * 0.62}, ${cx} ${end}`;
          yy += seg;
        }
      } else {
        // Desktop pocket timeline curves
        const off = 48; // horizontal amplitude
        const pts = [{ x: cx, y: 0 }];
        stepsEls.forEach((s, i) => {
          const home = s.querySelector(".step__home") as HTMLElement | null;
          const homeOffset = home ? home.offsetTop : 0;
          const homeHeight = home ? home.offsetHeight : 0;
          const yc = s.offsetTop + homeOffset + homeHeight / 2;
          const rightSide = i % 2 === 0; // step 1, 3, 5 sit right
          pts.push({ x: cx + (rightSide ? -off : off), y: yc });
        });
        pts.push({ x: cx, y: Htotal });

        d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const p0 = pts[i - 1];
          const p1 = pts[i];
          const my = (p0.y + p1.y) / 2;
          d += ` C ${p0.x} ${my}, ${p1.x} ${my}, ${p1.x} ${p1.y}`;
        }
      }

      waveTrack.setAttribute("d", d);
      waveLen = waveTrack.getTotalLength();
      waveTrack.style.strokeDasharray = `${waveLen}`;
      waveTrack.style.strokeDashoffset = `${waveLen}`;
    };

    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      // Rebuild if wave size changed
      if (!waveLen || Math.abs(pathEl.getBoundingClientRect().height - waveH) > 2) {
        buildWave();
      }

      const pr = pathEl.getBoundingClientRect();
      const span = roadSpan();
      const passed = Math.min(Math.max(vh * 0.7 - pr.top, 0), span);
      const p = span ? passed / span : 0;

      if (waveTrack && waveLen) {
        waveTrack.style.strokeDashoffset = `${waveLen * (1 - p)}`;
      }

      stepsEls.forEach((s) => {
        s.classList.toggle("active", s.getBoundingClientRect().top < vh * 0.6);
      });
    };

    // Throttled scroll observer
    let last = 0;
    let queued: NodeJS.Timeout | null = null;

    const onScroll = () => {
      const now = Date.now();
      if (now - last > 60) {
        last = now;
        update();
      } else {
        if (queued) clearTimeout(queued);
        queued = setTimeout(() => {
          last = Date.now();
          update();
        }, 70);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    
    // First trigger
    buildWave();
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (queued) clearTimeout(queued);
    };
  }, []);

  return (
    <div className="wrap" style={{ paddingTop: "clamp(60px, 8vw, 100px)" }}>
      <div className="section-head center" data-reveal="">
        <h2>
          Volver no es solo llegar.
          <br />
          Es todo lo que pasa en el camino.
        </h2>
        <p className="lead" style={{ marginInline: "auto", textAlign: "center" }}>
          Cada reunificación es un proceso acompañado paso a paso. Así recorremos el camino
          junto a las familias.
        </p>
      </div>

      <div ref={containerRef} className="path">
        <svg className="path__wave" preserveAspectRatio="none" aria-hidden="true">
          <path className="track" />
          <path className="fill" />
        </svg>

        {stepsData.map((step, idx) => (
          <div key={idx} className="step" data-reveal="">
            <div className="step__group">
              <div className="step__home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="step__home-img" src="/assets/casita-azul.png" alt={`Ilustración de casita azul que representa la etapa ${idx + 1} del proceso de reunificación: ${step.phase}`} loading="lazy" />
                <span className="step__n">{idx + 1}</span>
              </div>
              <div className="step__card">
                <span className="step__phase">{step.phase}</span>
                <h4>{step.title}</h4>
                <p style={{ fontFamily: "Capriola", fontSize: "16px" }}>{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
