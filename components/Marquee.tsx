import React from "react";
import Image from "next/image";

export default function Marquee() {
  const marqueeItems = [
    "Conexión",
    "Reconstrucción",
    "Escucha",
    "Tiempo",
    "Acompañamiento",
    "Familia",
    "Infancia",
    "Nuevos comienzos",
  ];

  const renderTrack = () => (
    <span className="marquee__item">
      {marqueeItems.map((item, idx) => (
        <React.Fragment key={idx}>
          <span>{item}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image className="star" src="/assets/sep-icon.png" alt="" width={32} height={32} />
        </React.Fragment>
      ))}
    </span>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {renderTrack()}
        {renderTrack()}
      </div>
    </div>
  );
}
