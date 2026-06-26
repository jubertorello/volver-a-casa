"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { updateLegalPageAction } from "../../../../lib/actions/admin";
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import "../../../../styles/admin.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

export default function LegalEditorClient({ initialPage }: { initialPage: any }) {
  const router = useRouter();
  const quillRef = useRef<any>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: initialPage.id,
    title: initialPage.title || "",
    content: initialPage.content || "",
    status: initialPage.status || "Borrador"
  });

  const handleUpdate = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const res = await updateLegalPageAction(formData.id, {
      title: formData.title,
      content: formData.content,
      status: formData.status
    });
    
    setIsSaving(false);
    if (res.success) {
      toast.success("Página legal guardada correctamente");
    } else {
      toast.error("Error al guardar: " + res.error);
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ]
  }), []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <button 
            onClick={() => router.push("/admin/legal")} 
            style={{ color: "var(--ink-faint)", fontSize: "0.9rem", marginBottom: "8px", display: "inline-block", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            ← Volver a páginas legales
          </button>
          <h1 className="admin-title" style={{ marginBottom: "8px" }}>
            Editar {initialPage.title}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>
        
        {/* Main Editor */}
        <div className="admin-card" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título de la Página</label>
            <input className="admin-input" value={formData.title} onChange={e => handleUpdate('title', e.target.value)} required style={{ fontSize: "1.2rem", fontWeight: 600, padding: "16px" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Cuerpo (Texto Legal)</label>
            <div className="proyecto-editor">
              <ReactQuill 
                theme="snow" 
                value={formData.content} 
                onChange={(val: string) => handleUpdate('content', val)} 
                modules={modules}
                ref={quillRef}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="admin-card">
            <h3 style={{ fontSize: "1rem", color: "var(--ink-soft)", marginBottom: "16px" }}>Publicación</h3>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Estado</label>
              <select className="admin-input" value={formData.status} onChange={e => handleUpdate('status', e.target.value)}>
                <option value="Borrador">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
