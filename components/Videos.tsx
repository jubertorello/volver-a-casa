"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ImageSlot from "@/components/ImageSlot";

export default function Videos({ data, videos, socialLinks }: { data?: any, videos?: any[], socialLinks?: any }) {
  const title = data?.title || "Multimedia";
  const overhead = data?.overhead || "Vídeos más significativos.";
  const description = data?.description || "Descubre más sobre nuestro trabajo, testimonios y el impacto del acompañamiento a través de nuestros vídeos.";

  const videoItems = (videos && videos.length > 0) ? videos.map(v => {
    const isYouTube = v.video_url?.includes('youtube') || v.video_url?.includes('youtu.be');
    const isVimeo = v.video_url?.includes('vimeo');
    
    return {
      id: v.id,
      title: v.title,
      desc: v.description,
      tag: isYouTube ? "YouTube" : (isVimeo ? "Vimeo" : "Video"),
      tagColor: isYouTube ? "var(--naranja)" : "var(--azul)",
      videoUrl: v.video_url,
      thumbnail: v.thumbnail
    };
  }).slice(0, 6) : [];

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:.*#|.*\/videos\/)?([0-9]+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    return null; 
  };

  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

  return (
    <section className="section section--tint" id="videos" data-screen-label="06 Vídeos">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <p className="eyebrow eyebrow--naranja">{title}</p>
          <h2>{overhead}</h2>
          <p className="lead" style={{ fontFamily: "Capriola", fontSize: "16px" }}>
            {description}
          </p>
        </div>

        {videoItems.length > 0 ? (
          <div className="grid cols-3" data-reveal="" data-delay="1">
            {videoItems.map((vid) => {
              const embedUrl = getEmbedUrl(vid.videoUrl);
              return (
            <div key={vid.id} className="video-card">
              {embedUrl ? (
                <button
                  type="button"
                  onClick={() => setActiveVideo(embedUrl)}
                  className="video-card__media-wrapper"
                  style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  <div className="video-card__media">
                    {vid.thumbnail ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <Image 
                        src={vid.thumbnail} 
                        alt={`Miniatura de: ${vid.title}`} 
                        fill
                        style={{ objectFit: "cover" }} 
                      />
                    ) : (
                      <ImageSlot
                        id={vid.id}
                        shape="rect"
                        placeholder="Miniatura del vídeo"
                        alt={`Miniatura de: ${vid.title}`}
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                    <div className="video-card__overlay">
                      <div className="video-card__play-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              ) : (
                <a
                  href={vid.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card__media-wrapper"
                >
                  <div className="video-card__media">
                    {vid.thumbnail ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <Image 
                        src={vid.thumbnail} 
                        alt={`Miniatura de: ${vid.title}`} 
                        fill
                        style={{ objectFit: "cover" }} 
                      />
                    ) : (
                      <ImageSlot
                        id={vid.id}
                        shape="rect"
                        placeholder="Miniatura del vídeo"
                        alt={`Miniatura de: ${vid.title}`}
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                    <div className="video-card__overlay">
                      <div className="video-card__play-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              )}
              <div className="video-card__body">
                <span
                  className="video-card__tag"
                  style={{ color: vid.tagColor }}
                >
                  {vid.tag}
                </span>
                <h3>{vid.title}</h3>
                <p>{vid.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        ) : (
          <div data-reveal="" style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
            <p style={{ fontSize: "1.2rem", fontStyle: "italic" }}>Muy pronto...</p>
          </div>
        )}

        {/* Video Modal Overlay */}
        <div className="videos-cta" data-reveal="" data-delay="2">
          <div className="videos-cta__content">
            <h3>Síguenos en redes sociales</h3>
            <p>
              Únete a nuestra comunidad para estar al día con las novedades, historias y el día a día de Volver a Casa.
            </p>
          </div>
          <div className="videos-cta__actions">
            {socialLinks?.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--naranja"
              >
                Instagram <span className="arrow">↗</span>
              </a>
            )}
            {socialLinks?.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Facebook <span className="arrow">↗</span>
              </a>
            )}
            {socialLinks?.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ backgroundColor: "var(--ink)" }}
              >
                X <span className="arrow">↗</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ backgroundColor: "var(--azul-deep)" }}
              >
                LinkedIn <span className="arrow">↗</span>
              </a>
            )}
          </div>
        </div>
        {/* Video Modal Overlay */}
        {activeVideo && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setActiveVideo(null)}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', aspectRatio: '16/9' }}>
              <button
                onClick={() => setActiveVideo(null)}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
              <iframe
                src={activeVideo}
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
