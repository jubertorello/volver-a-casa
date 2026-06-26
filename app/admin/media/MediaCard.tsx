"use client";

import { useState } from "react";
import DeleteMediaButton from "./DeleteMediaButton";
import MediaFileSize from "./MediaFileSize";

export default function MediaCard({ asset }: { asset: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="admin-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <button 
          onClick={() => setIsOpen(true)}
          style={{ display: 'block', height: "200px", backgroundColor: "var(--cream-3)", position: "relative", overflow: "hidden", border: "none", padding: 0, cursor: "pointer", width: "100%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={asset.secure_url} 
            alt={asset.alt_text || "Media"} 
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.2s ease" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </button>
        
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <p style={{ fontSize: "0.8rem", color: "var(--ink-faint)", marginBottom: "4px", wordBreak: "break-all" }}>
            {asset.title || asset.cloudinary_public_id || "Imagen"}
          </p>
          <div style={{ display: "flex", gap: "8px", fontSize: "0.75rem", color: "var(--ink-soft)", marginBottom: "12px", textTransform: "uppercase", fontWeight: 600 }}>
            <span style={{ backgroundColor: "var(--cream-3)", padding: "2px 6px", borderRadius: "4px" }}>
              {asset.format || "WEBP"}
            </span>
            <span style={{ backgroundColor: "var(--cream-3)", padding: "2px 6px", borderRadius: "4px" }}>
              {asset.width}x{asset.height}
            </span>
            <span style={{ backgroundColor: "var(--cream-3)", padding: "2px 6px", borderRadius: "4px" }}>
              <MediaFileSize url={asset.secure_url} />
            </span>
          </div>
          
          <div style={{ flexGrow: 1, marginBottom: "16px" }}>
            {asset.usages.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-soft)", marginBottom: "8px", textTransform: "uppercase" }}>
                  En uso en:
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  {asset.usages.map((u: any, idx: number) => (
                    <li key={idx} style={{ fontSize: "0.85rem", color: "var(--ink)", display: "flex", gap: "8px" }}>
                      <span>{u.icon}</span>
                      <span>{u.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ padding: "12px", backgroundColor: "var(--cream-3)", borderRadius: "var(--r-sm)", color: "var(--ink-soft)", fontSize: "0.85rem" }}>
                Esta imagen no se está usando en ningún sitio.
              </div>
            )}
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--cream-3)", paddingTop: "16px", marginTop: "auto" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>
              {new Date(asset.created_at).toLocaleDateString("es-ES")}
            </span>
            
            {asset.usages.length === 0 && (
              <DeleteMediaButton id={asset.id} publicId={asset.cloudinary_public_id} />
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '32px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={asset.secure_url} 
              alt={asset.alt_text || "Media Modal"} 
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} 
            />
          </div>
        </div>
      )}
    </>
  );
}
