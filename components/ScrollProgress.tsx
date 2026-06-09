"use client";

import React, { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const bar = barRef.current;
      if (!bar) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const h = document.documentElement.scrollHeight - vh;
      bar.style.width = `${h > 0 ? (y / h) * 100 : 0}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize immediately
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
