"use client";

import { useState } from "react";
import { updateSettingsAction } from "../../../lib/actions/admin";
import CloudinaryUpload from "../../../components/admin/CloudinaryUpload";
import toast from 'react-hot-toast';
import "../../../styles/admin.css";

export default function FooterClient({ 
  initialFooterLogos
}: { 
  initialFooterLogos: any[]
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [footerLogos, setFooterLogos] = useState(initialFooterLogos || []);

  const handleUpdateLogo = (idx: number, field: string, value: string) => {
    const newLogos = [...footerLogos];
    newLogos[idx] = { ...newLogos[idx], [field]: value };
    setFooterLogos(newLogos);
  };

  const handleAddLogo = () => {
    setFooterLogos([...footerLogos, { id: `logo-${Date.now()}`, imgUrl: '', alt: '' }]);
  };

  const handleRemoveLogo = (idx: number) => {
    if (confirm("¿Estás seguro de que deseas quitar este logo del pie de página?")) {
      const newLogos = [...footerLogos];
      newLogos.splice(idx, 1);
      setFooterLogos(newLogos);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Remove overhead property before saving, just in case
    const cleanedLogos = footerLogos.map(logo => {
      const { overhead, ...rest } = logo;
      return rest;
    });

    await updateSettingsAction('footer_logos', cleanedLogos);

    setIsSaving(false);
    toast.success("Logos del footer guardados exitosamente");
  };

  return (
    <div>
      <h1 className="admin-title" style={{ marginBottom: "24px" }}>Pie de Página (Footer)</h1>

      <form onSubmit={handleSave}>
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--azul)" }}>Logos de Colaboradores</h3>
            <button type="button" onClick={handleAddLogo} className="admin-btn admin-btn-outline" style={{ fontSize: "0.85rem", padding: "6px 12px" }}>+ Añadir Logo</button>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "16px" }}>Gestiona los logotipos institucionales que aparecen en el pie de página. El campo de "texto superior" ha sido eliminado.</p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {footerLogos.length === 0 && (
              <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>No hay logos configurados.</p>
            )}
            {footerLogos.map((logo, idx) => (
              <div key={idx} style={{ padding: "16px", backgroundColor: "var(--paper)", border: "1px solid var(--cream-3)", borderRadius: "var(--r-sm)", position: "relative" }}>
                <button type="button" onClick={() => handleRemoveLogo(idx)} style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)" }}>✕</button>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "80px", height: "80px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px" }}>
                    <img src={logo.imgUrl || '/placeholder.png'} alt={logo.alt || 'Logo'} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
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
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "right", marginTop: "24px" }}>
             <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
               {isSaving ? "Guardando..." : "Guardar Logos"}
             </button>
          </div>
        </div>
      </form>
    </div>
  );
}
