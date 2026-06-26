"use client";

import { useState } from "react";
import { updateSettingsAction } from "../../../lib/actions/admin";
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload";
import toast from 'react-hot-toast';
import "../../../styles/admin.css";

export default function SettingsClient({ 
  initialGeneral, 
  initialSocial, 
  initialFooterLogos,
  initialSeo
}: { 
  initialGeneral: any, 
  initialSocial: any, 
  initialFooterLogos: any[],
  initialSeo: any
}) {
  const [isSaving, setIsSaving] = useState(false);

  const [general, setGeneral] = useState(initialGeneral);
  const [social, setSocial] = useState(initialSocial);
  const [footerLogos, setFooterLogos] = useState(initialFooterLogos || []);
  const [seo, setSeo] = useState(initialSeo || { title: "", description: "" });

  const handleUpdateLogo = (idx: number, field: string, value: string) => {
    const newLogos = [...footerLogos];
    newLogos[idx] = { ...newLogos[idx], [field]: value };
    setFooterLogos(newLogos);
  };

  const handleAddLogo = () => {
    setFooterLogos([...footerLogos, { id: `logo-${Date.now()}`, imgUrl: '', alt: '', overhead: '' }]);
  };

  const handleRemoveLogo = (idx: number) => {
    const newLogos = [...footerLogos];
    newLogos.splice(idx, 1);
    setFooterLogos(newLogos);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    await updateSettingsAction('general', general);
    await updateSettingsAction('social', social);
    await updateSettingsAction('footer_logos', footerLogos);
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
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "4px" }}>Email de Contacto</label>
              <input className="admin-input" value={general.contactEmail} onChange={e => setGeneral({...general, contactEmail: e.target.value})} />
            </div>
          </div>

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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--azul)" }}>Logos del Footer (Colaboradores)</h3>
              <button type="button" onClick={handleAddLogo} className="admin-btn admin-btn-outline" style={{ fontSize: "0.85rem", padding: "6px 12px" }}>+ Añadir Logo</button>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "16px" }}>Gestiona los logotipos institucionales que aparecen en el pie de página.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {footerLogos.length === 0 && (
                <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>No hay logos configurados.</p>
              )}
              {footerLogos.map((logo, idx) => (
                <div key={idx} style={{ padding: "16px", backgroundColor: "var(--paper)", border: "1px solid var(--cream-3)", borderRadius: "var(--r-sm)", position: "relative" }}>
                  <button type="button" onClick={() => handleRemoveLogo(idx)} style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)" }}>✕</button>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <div style={{ width: "80px", height: "80px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo.imgUrl} alt={logo.alt} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div>
                        <label style={{ fontSize: "0.8rem", color: "var(--ink-faint)", display: "block", marginBottom: "2px" }}>URL de la imagen</label>
                        <CloudinaryUpload 
                          value={logo.imgUrl} 
                          onChange={(url) => handleUpdateLogo(idx, 'imgUrl', url)} 
                          placeholder="/assets/logo.png" 
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.8rem", color: "var(--ink-faint)", display: "block", marginBottom: "2px" }}>Texto alternativo (Alt)</label>
                        <input className="admin-input" style={{ fontSize: "0.85rem", padding: "6px" }} value={logo.alt} onChange={e => handleUpdateLogo(idx, 'alt', e.target.value)} placeholder="Ej: Fundación Manantial" />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.8rem", color: "var(--ink-faint)", display: "block", marginBottom: "2px" }}>Texto superior (Opcional)</label>
                        <input className="admin-input" style={{ fontSize: "0.85rem", padding: "6px" }} value={logo.overhead || ''} onChange={e => handleUpdateLogo(idx, 'overhead', e.target.value)} placeholder="Ej: Con la colaboración de" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
