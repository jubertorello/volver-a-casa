"use client";

import { useState } from "react";
import { updateSettingsAction } from "../../../lib/actions/admin";
import toast from 'react-hot-toast';
import "../../../styles/admin.css";

export default function SettingsClient({ 
  initialGeneral, 
  initialSocial, 
  initialSeo
}: { 
  initialGeneral: any, 
  initialSocial: any, 
  initialSeo: any
}) {
  const [isSaving, setIsSaving] = useState(false);

  const [general, setGeneral] = useState(initialGeneral);
  const [social, setSocial] = useState(initialSocial);
  const [seo, setSeo] = useState(initialSeo || { title: "", description: "" });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    await updateSettingsAction('general', general);
    await updateSettingsAction('social', social);
    await updateSettingsAction('seo', seo);

    setIsSaving(false);
    toast.success("Ajustes generales guardados");
  };

  return (
    <div>
      <h1 className="admin-title" style={{ marginBottom: "24px" }}>Ajustes del Sitio</h1>

      <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Columna Izquierda */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div className="admin-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--azul)" }}>Información General</h3>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "4px" }}>Nombre del Proyecto</label>
              <input className="admin-input" value={general.projectName} onChange={e => setGeneral({...general, projectName: e.target.value})} />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "4px" }}>Email de Contacto</label>
              <input className="admin-input" value={general.contactEmail} onChange={e => setGeneral({...general, contactEmail: e.target.value})} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "4px" }}>Teléfono de Contacto</label>
              <input className="admin-input" value={general.contactPhone || ""} onChange={e => setGeneral({...general, contactPhone: e.target.value})} />
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontSize: "1.2rem", color: "var(--azul)", marginBottom: "16px" }}>Configuración SEO</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título para Buscadores (Google)</label>
                <input 
                  className="admin-input" 
                  value={seo.title || ""} 
                  onChange={e => setSeo({...seo, title: e.target.value})} 
                  placeholder="Ej: Volver a Casa — Fundación Manantial"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Meta Descripción (Google)</label>
                <textarea 
                  className="admin-input" 
                  rows={4} 
                  value={seo.description || ""} 
                  onChange={e => setSeo({...seo, description: e.target.value})} 
                  placeholder="Descripción que aparecerá en los resultados de búsqueda de Google..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div className="admin-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--azul)" }}>Redes Sociales</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "16px" }}>Enlaces que aparecen en el pie de página y modal de contacto.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "30px", textAlign: "center" }}>📷</span>
                <input className="admin-input" value={social.instagram} onChange={e => setSocial({...social, instagram: e.target.value})} placeholder="Instagram URL" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "30px", textAlign: "center" }}>📘</span>
                <input className="admin-input" value={social.facebook} onChange={e => setSocial({...social, facebook: e.target.value})} placeholder="Facebook URL" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "30px", textAlign: "center" }}>𝕏</span>
                <input className="admin-input" value={social.twitter} onChange={e => setSocial({...social, twitter: e.target.value})} placeholder="X (Twitter) URL" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "30px", textAlign: "center" }}>💼</span>
                <input className="admin-input" value={social.linkedin} onChange={e => setSocial({...social, linkedin: e.target.value})} placeholder="LinkedIn URL" />
              </div>
            </div>
          </div>

        </div>

        <div style={{ gridColumn: "1 / -1", textAlign: "right", marginTop: "16px" }}>
           <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
             {isSaving ? "Guardando..." : "Guardar Ajustes"}
           </button>
        </div>
      </form>
    </div>
  );
}
