"use client";

import { useState } from "react";
import "../../../styles/admin.css";

export default function SeoSettings() {
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 className="admin-title" style={{ marginBottom: "8px" }}>Configuración SEO Global</h1>
          <p style={{ color: "var(--ink-soft)" }}>Ajustes generales para motores de búsqueda (Google, Bing) y redes sociales.</p>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ maxWidth: "800px" }}>
        <div className="admin-card" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título del Sitio (Sufijo)</label>
            <input className="admin-input" defaultValue=" - Volver a Casa" placeholder="Ej. | Volver a Casa" />
            <p style={{ fontSize: "0.8rem", color: "var(--ink-faint)", marginTop: "4px" }}>Este texto se añadirá al final del título de todas las páginas.</p>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Meta Descripción Global (Por defecto)</label>
            <textarea className="admin-input" rows={3} defaultValue="Volver a Casa es un proyecto de Fundación Manantial enfocado en el bienestar infantojuvenil..." />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Imagen Social (Open Graph / Twitter)</label>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "120px", height: "63px", backgroundColor: "var(--cream-3)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                🖼️
              </div>
              <button type="button" className="admin-btn admin-btn-outline">Cambiar Imagen</button>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--ink-faint)", marginTop: "8px" }}>Imagen que aparece al compartir la web en WhatsApp, Twitter, Facebook, etc.</p>
          </div>

          <div>
             <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Indexación</label>
             <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem" }}>
               <input type="checkbox" defaultChecked />
               Permitir que los motores de búsqueda indexen este sitio
             </label>
          </div>
          
          <div style={{ borderTop: "1px solid var(--cream-3)", paddingTop: "24px", marginTop: "8px", textAlign: "right" }}>
            <button type="submit" className="admin-btn admin-btn-primary">Guardar Configuración SEO</button>
          </div>
        </div>
      </form>

      {/* Mock Toast */}
      {showToast && (
        <div style={{
          position: "fixed", bottom: "24px", right: "24px", backgroundColor: "var(--verde)", color: "white", padding: "16px 24px", borderRadius: "var(--r-sm)", boxShadow: "var(--shadow-md)", display: "flex", alignItems: "center", gap: "12px", animation: "slideIn 0.3s ease-out", zIndex: 1000
        }}>
          <span>✓</span> Ajustes SEO guardados exitosamente
        </div>
      )}
    </div>
  );
}
