"use client";

import React, { useState, useEffect } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const Proyecto = dynamic(() => import("@/components/Proyecto"));
const Camino = dynamic(() => import("@/components/Camino"));
const Objetivos = dynamic(() => import("@/components/Objetivos"));
const Recorrido = dynamic(() => import("@/components/Recorrido"));
const Actualidad = dynamic(() => import("@/components/Actualidad"));
const Videos = dynamic(() => import("@/components/Videos"));
const Footer = dynamic(() => import("@/components/Footer"));
const ContactoModal = dynamic(() => import("@/components/ContactoModal"));
import LoadingScreen from "@/components/LoadingScreen";

export default function HomePageClient({ 
  heroData,
  proyectoData,
  caminoData,
  objetivosData,
  experienciaData,
  actualidadData,
  videosData,
  footerLogos,
  socialLinks,
  news = [],
  videos = [],
  contactEmail,
  contactPhone
}: {
  heroData: any,
  proyectoData: any,
  caminoData: any,
  objetivosData: any,
  experienciaData: any,
  actualidadData: any,
  videosData: any,
  footerLogos: any[],
  socialLinks: any,
  news?: any[],
  videos?: any[],
  contactEmail?: string,
  contactPhone?: string
}) {
  const [isContactoOpen, setIsContactoOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let MOTION = true;
    let armed = false;
    
    // Select all reveal elements on mount
    let revealEls = Array.from(document.querySelectorAll("[data-reveal]")) as HTMLElement[];

    const finalCount = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      el.textContent =
        (el.dataset.prefix || "") +
        target.toLocaleString("es-ES") +
        (el.dataset.suffix || "");
      el.dataset.done = "1";
    };

    const runAllFinalCounts = () => {
      const countEls = Array.from(document.querySelectorAll("[data-count]")) as HTMLElement[];
      countEls.forEach(finalCount);
    };

    const updateReveals = () => {
      const vh = window.innerHeight;
      if (armed) {
        for (let i = revealEls.length - 1; i >= 0; i--) {
          const el = revealEls[i];
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.9 && r.bottom > -40) {
            el.classList.add("in");
            revealEls.splice(i, 1);
          }
        }
      }
    };

    const updateParallax = () => {
      if (MOTION && !reduce) {
        const y = window.scrollY;
        const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]")) as HTMLElement[];
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0.2");
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
      }
    };

    const handleScroll = () => {
      updateReveals();
      updateParallax();
    };

    // Throttle scroll
    let last = 0;
    let queued: NodeJS.Timeout | null = null;
    const onScroll = () => {
      const now = Date.now();
      if (now - last > 60) {
        last = now;
        handleScroll();
      } else {
        if (queued) clearTimeout(queued);
        queued = setTimeout(() => {
          last = Date.now();
          handleScroll();
        }, 70);
      }
    };

    // Probe motion-capability to handle iframe freezing
    const detectMotion = () => {
      if (reduce) {
        root.classList.remove("fx");
        revealEls.forEach((e) => e.classList.add("in"));
        revealEls = [];
        runAllFinalCounts();
        return;
      }

      // Append style for motion probe keyframe animation
      const styleNode = document.createElement("style");
      styleNode.innerHTML = `
        @keyframes vac-probe {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(10px,0,0); }
        }
      `;
      document.head.appendChild(styleNode);

      const probe = document.createElement("div");
      probe.style.cssText =
        "position:fixed;left:-9999px;top:0;width:2px;height:2px;pointer-events:none;animation:vac-probe 1s linear infinite";
      document.body.appendChild(probe);

      const a = getComputedStyle(probe).transform;

      setTimeout(() => {
        const b = getComputedStyle(probe).transform;
        probe.remove();
        styleNode.remove();

        if (a === b) {
          // CSS animations frozen
          MOTION = false;
          root.classList.remove("fx");
          revealEls.forEach((e) => e.classList.add("in"));
          revealEls = [];
          runAllFinalCounts();
        } else {
          // CSS animations active
          armed = true;
          handleScroll();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll, { passive: true });
          [40, 160, 380, 800].forEach((ms) => setTimeout(handleScroll, ms));
        }
      }, 160);
    };

    detectMotion();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (queued) clearTimeout(queued);
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Header onOpenContacto={() => setIsContactoOpen(true)} />

      <main id="top">
        <Hero data={heroData} />
        <Proyecto data={proyectoData} />
        <Camino data={caminoData} />
        <Objetivos data={objetivosData} />
        <Recorrido data={experienciaData} />
        <Actualidad data={actualidadData} news={news} />
        <Videos data={videosData} videos={videos} socialLinks={socialLinks} />
        <Footer logos={footerLogos} socialLinks={socialLinks} contactEmail={contactEmail} contactPhone={contactPhone} />
      </main>

      <ContactoModal
        isOpen={isContactoOpen}
        onClose={() => setIsContactoOpen(false)}
        socialLinks={socialLinks}
        contactEmail={contactEmail}
        contactPhone={contactPhone}
      />
    </>
  );
}
