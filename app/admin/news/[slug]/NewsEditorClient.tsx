"use client";

import React, { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { saveNewsAction } from "../../../../lib/actions/admin";
import CloudinaryUpload from "../../../../components/admin/CloudinaryUpload";
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import "../../../../styles/admin.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

export default function NewsEditorClient({ initialNews, isNew }: { initialNews: any, isNew: boolean }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const quillRef = useRef<any>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: isNew ? 'new' : initialNews.id,
    title: initialNews.title || "",
    slug: initialNews.slug || "",
    category: initialNews.category || "Noticia",
    featured_image: initialNews.featured_image || "",
    gallery: initialNews.gallery || [],
    content_html: initialNews.content_html || "",
    publication_date: initialNews.publication_date ? initialNews.publication_date.split('T')[0] : new Date().toISOString().split('T')[0],
    status: initialNews.status || "published",
    seo_meta: initialNews.seo_meta || { title: "", description: "" }
  });

  const categories = ["Jornada", "Hito", "Congreso", "Alianza", "Formación", "Publicación", "Noticia"];

  const handleUpdate = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateSeo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      seo_meta: { ...(prev.seo_meta || {}), [field]: value }
    }));
  };

  const handleGalleryAdd = (url: string) => {
    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, url] }));
  };

  const handleGalleryRemove = (index: number) => {
    if (confirm("¿Estás seguro de que deseas quitar esta imagen de la galería?")) {
      setFormData(prev => {
        const newGallery = [...prev.gallery];
        newGallery.splice(index, 1);
        return { ...prev, gallery: newGallery };
      });
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const fd = new FormData();
      fd.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: fd
        });
        const data = await res.json();
        
        if (data.url && quillRef.current) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', data.url);
        } else if (data.error) {
          toast.error('Error al subir: ' + data.error);
        }
      } catch (err) {
        console.error("Error uploading image", err);
        toast.error('Error de red al subir la imagen');
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones obligatorias
    if (!formData.title.trim()) return toast.error("El titular es obligatorio.");
    if (!formData.featured_image) return toast.error("La imagen principal (portada) es obligatoria.");
    if (!formData.content_html || formData.content_html === '<p><br></p>') return toast.error("El cuerpo de la noticia es obligatorio.");
    if (!formData.publication_date) return toast.error("La fecha de publicación es obligatoria.");
    
    if (new Date(formData.publication_date) > new Date()) {
      return toast.error("La fecha de publicación no puede ser futura.");
    }

    setIsSaving(true);
    
    // Generar slug si no existe
    const generateSlug = (text: string) => {
      return text.toString().toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
    };

    const generateShortDescLocal = (html: string) => {
      if (!html) return "Sin descripción";
      const text = html.replace(/<[^>]*>?/gm, '').trim();
      return text.length > 120 ? text.substring(0, 117) + "..." : text;
    };

    const autoSeoTitle = formData.seo_meta?.title?.trim() ? formData.seo_meta.title : `${formData.title} | Volver a casa`;
    const autoSeoDesc = formData.seo_meta?.description?.trim() ? formData.seo_meta.description : generateShortDescLocal(formData.content_html);

    const finalSeoMeta = { title: autoSeoTitle, description: autoSeoDesc };

    const payload = {
      ...formData,
      seo_meta: finalSeoMeta,
      slug: formData.slug || generateSlug(formData.title)
    };
    
    setFormData(prev => ({ ...prev, seo_meta: finalSeoMeta }));
    
    const res = await saveNewsAction(payload);
    
    setIsSaving(false);
    if (res.success) {
      toast.success("Noticia guardada correctamente");
      if (isNew) {
        router.push(`/admin/news/${res.data.id}`);
      }
    } else {
      toast.error("Error al guardar: " + res.error);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <button 
            onClick={() => router.push("/admin/news")} 
            style={{ color: "var(--ink-faint)", fontSize: "0.9rem", marginBottom: "8px", display: "inline-block", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            ← Volver a noticias
          </button>
          <h1 className="admin-title" style={{ marginBottom: "8px" }}>
            {isNew ? "Redactar Nueva Noticia" : "Editar Noticia"}
          </h1>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>
        
        {/* Main Editor */}
        <div className="admin-card" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Titular de la noticia *</label>
            <input className="admin-input" value={formData.title} onChange={e => handleUpdate('title', e.target.value)} placeholder="Ej. Nuevo programa de voluntariado..." required style={{ fontSize: "1.2rem", fontWeight: 600, padding: "16px" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Tipo (Categoría)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {categories.map(cat => (
                <label key={cat} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 16px", border: "1px solid var(--cream-3)", borderRadius: "var(--r-pill)", cursor: "pointer", fontSize: "0.9rem", backgroundColor: formData.category === cat ? "var(--azul)" : "var(--paper)", color: formData.category === cat ? "white" : "var(--ink-soft)" }}>
                  <input type="radio" name="category" value={cat} checked={formData.category === cat} onChange={e => handleUpdate('category', e.target.value)} style={{ display: "none" }} />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Cuerpo de la Noticia *</label>
            {React.createElement(ReactQuill, {
              theme: "snow",
              value: formData.content_html,
              onChange: (val: string) => handleUpdate('content_html', val),
              modules: modules,
              ref: quillRef
            })}
          </div>
          
          <div style={{ borderTop: "1px solid var(--cream-3)", paddingTop: "24px", marginTop: "16px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Galería de Imágenes (Opcional)</label>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "16px" }}>Añade imágenes extra que se mostrarán en la parte inferior de la noticia.</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              {formData.gallery.map((url: string, i: number) => (
                <div key={i} style={{ position: "relative", borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--cream-3)" }}>
                  <img src={url} alt={`Galería ${i}`} style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }} />
                  <button type="button" onClick={() => handleGalleryRemove(i)} style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(255,0,0,0.8)", color: "white", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                </div>
              ))}
            </div>
            
            {formData.gallery.length < 8 ? (
              <CloudinaryUpload value="" onChange={(url) => { if(url) handleGalleryAdd(url); }} placeholder="Añadir imagen a la galería" />
            ) : (
              <p style={{ color: "var(--naranja)", fontSize: "0.85rem", fontWeight: 600 }}>Has alcanzado el límite máximo de 8 imágenes.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="admin-card">
            <h3 style={{ fontSize: "1rem", color: "var(--ink-soft)", marginBottom: "16px" }}>Publicación</h3>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Estado *</label>
              <select className="admin-input" value={formData.status} onChange={e => handleUpdate('status', e.target.value)} required>
                <option value="published">Público</option>
                <option value="draft">Borrador</option>
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Fecha de publicación *</label>
              <input type="date" className="admin-input" value={formData.publication_date} max={todayStr} onChange={e => handleUpdate('publication_date', e.target.value)} required />
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>

          <div className="admin-card">
            <h3 style={{ fontSize: "1rem", color: "var(--ink-soft)", marginBottom: "16px" }}>Imagen Principal *</h3>
            <CloudinaryUpload value={formData.featured_image} onChange={url => handleUpdate('featured_image', url)} placeholder="URL de la portada" />
            
            {formData.featured_image && (
              <div style={{ marginTop: "16px", width: "100%", borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--cream-3)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.featured_image} alt="Portada" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            )}
          </div>

          <div className="admin-card">
            <h3 style={{ fontSize: "1rem", color: "var(--ink-soft)", marginBottom: "16px" }}>SEO (Opcional)</h3>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <label style={{ fontSize: "0.85rem", color: "var(--ink-faint)" }}>Título SEO</label>
                <span style={{ fontSize: "0.75rem", color: (formData.seo_meta?.title?.length || 0) >= 60 ? "var(--rojo)" : "var(--ink-faint)" }}>
                  {formData.seo_meta?.title?.length || 0} / 60
                </span>
              </div>
              <input 
                className="admin-input" 
                value={formData.seo_meta?.title || ""} 
                onChange={e => handleUpdateSeo('title', e.target.value)} 
                maxLength={60}
                placeholder="Ej. Noticia | Volver a casa" 
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <label style={{ fontSize: "0.85rem", color: "var(--ink-faint)" }}>Descripción SEO</label>
                <span style={{ fontSize: "0.75rem", color: (formData.seo_meta?.description?.length || 0) >= 160 ? "var(--rojo)" : "var(--ink-faint)" }}>
                  {formData.seo_meta?.description?.length || 0} / 160
                </span>
              </div>
              <textarea 
                className="admin-input" 
                rows={3} 
                value={formData.seo_meta?.description || ""} 
                onChange={e => handleUpdateSeo('description', e.target.value)} 
                maxLength={160}
                placeholder="Descripción para buscadores..." 
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
