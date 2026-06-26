"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveVideoAction } from "../../../../lib/actions/admin";
import CloudinaryUpload from "../../../../components/admin/CloudinaryUpload";
import toast from 'react-hot-toast';
import "../../../../styles/admin.css";

export default function VideoEditorClient({ initialVideo, isNew }: { initialVideo: any, isNew: boolean }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: isNew ? 'new' : initialVideo.id,
    title: initialVideo.title || "",
    video_url: initialVideo.video_url || "",
    thumbnail: initialVideo.thumbnail || "",
    description: initialVideo.description || "",
    status: initialVideo.status || "Borrador"
  });

  const handleUpdate = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const res = await saveVideoAction(formData);
    
    setIsSaving(false);
    if (res.success) {
      toast.success("Vídeo guardado correctamente");
      if (isNew) {
        router.push(`/admin/videos/${res.data.id}`);
      }
    } else {
      toast.error("Error al guardar: " + res.error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <button 
            onClick={() => router.push("/admin/videos")} 
            style={{ color: "var(--ink-faint)", fontSize: "0.9rem", marginBottom: "8px", display: "inline-block", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            ← Volver a vídeos
          </button>
          <h1 className="admin-title" style={{ marginBottom: "8px" }}>
            {isNew ? "Añadir Nuevo Vídeo" : "Editar Vídeo"}
          </h1>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>
        
        {/* Main Editor */}
        <div className="admin-card" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--ink-soft)", fontWeight: 600 }}>Título del Vídeo</label>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-faint)" }}>{formData.title.length}/70</span>
            </div>
            <input className="admin-input" value={formData.title} maxLength={70} onChange={e => handleUpdate('title', e.target.value)} placeholder="Ej. Entrevista Volver a Casa..." required style={{ fontSize: "1.2rem", fontWeight: 600, padding: "16px" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>URL del Vídeo (YouTube o Vimeo)</label>
            <input type="url" className="admin-input" value={formData.video_url} onChange={e => handleUpdate('video_url', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." required />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--ink-soft)", fontWeight: 600 }}>Descripción Corta (Opcional)</label>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-faint)" }}>{formData.description.length}/160</span>
            </div>
            <textarea className="admin-input" rows={4} maxLength={160} value={formData.description} onChange={e => handleUpdate('description', e.target.value)} placeholder="Breve descripción del vídeo..." />
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

          <div className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1rem", color: "var(--ink-soft)", margin: 0 }}>Miniatura (Thumbnail)</h3>
              <button 
                type="button" 
                className="admin-btn admin-btn-outline" 
                style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                onClick={() => {
                  if (!formData.video_url) return toast.error("Primero pon una URL de YouTube o Vimeo.");
                  const ytMatch = formData.video_url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
                  if (ytMatch && ytMatch[1]) {
                    handleUpdate('thumbnail', `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`);
                  } else {
                    toast.error("No se pudo detectar el ID de YouTube en el enlace. Solo funciona con YouTube por ahora.");
                  }
                }}
              >
                Autocompletar
              </button>
            </div>
            
            <CloudinaryUpload value={formData.thumbnail} onChange={url => handleUpdate('thumbnail', url)} placeholder="URL de la miniatura" />
            
            {formData.thumbnail && (
              <div style={{ marginTop: "16px", width: "100%", borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--cream-3)", backgroundColor: "var(--cream-3)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.thumbnail} alt="Miniatura" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            )}
            {!formData.thumbnail && (
              <p style={{ fontSize: "0.8rem", color: "var(--ink-faint)", marginTop: "12px" }}>
                Haz clic en "Subir" para cargar una foto desde tu PC, o haz clic en "Autocompletar" si el vídeo es de YouTube.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
