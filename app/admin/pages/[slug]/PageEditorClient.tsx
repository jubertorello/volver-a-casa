"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { savePageBlockAction, updatePageAction } from "../../../../lib/actions/admin";
import toast from 'react-hot-toast';
import "../../../../styles/admin.css";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

export default function PageEditorClient({ initialPage, slug }: { initialPage: any, slug: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const quillRef = useRef<any>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
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
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const restrictedModules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['clean']
    ]
  }), []);

  const homeTabs = [
    { id: "hero", label: "Hero Banner" },
    { id: "proyecto", label: "Proyecto" },
    { id: "objetivos", label: "Objetivos" },
    { id: "experiencia", label: "Experiencia" },
    { id: "actualidad", label: "Actualidad" },
    { id: "videos", label: "Vídeos" }
  ];

  // Helper to find initial block data
  const getBlockData = (type: string) => {
    const block = initialPage.blocks?.find((b: any) => b.type === type);
    return block?.content_json || {};
  };

  const [formData, setFormData] = useState({
    title: initialPage.title || '',
    description: initialPage.description || '',
    hero: {
      overhead: getBlockData('hero').overhead || "Una infancia acompañada puede cambiarlo todo",
      title: getBlockData('hero').title || "Reconstruyendo vínculos,\nacompañando familias."
    },
    proyecto: {
      title: getBlockData('proyecto').title || "¿Qué es Volver a Casa?",
      description: getBlockData('proyecto').description || "El programa de apoyo al acogimiento familiar...",
      items: getBlockData('proyecto').items || [
        { title: "Título 1", description: "Desc 1" },
        { title: "Título 2", description: "Desc 2" },
        { title: "Título 3", description: "Desc 3" }
      ]
    },
    objetivos: {
      title: getBlockData('objetivos').title || "Crecer en familia lo cambia todo.",
      description: getBlockData('objetivos').description || "La institucionalización prolongada afecta...",
      items: getBlockData('objetivos').items || [
        "Punto 1", "Punto 2", "Punto 3", "Punto 4"
      ],
      metrics: getBlockData('objetivos').metrics || [
        { val: "-40%", desc: "tiempo", sub: "OBJ" },
        { val: "85%", desc: "reunificaciones", sub: "OBJ" },
        { val: "120", desc: "familias", sub: "DATO" },
        { val: "70%", desc: "mejora", sub: "OBJ" }
      ]
    },
    experiencia: {
      overhead: getBlockData('experiencia').overhead || "HABLEMOS DE NUESTRA EXPERIENCIA",
      title: getBlockData('experiencia').title || "Volver a Casa es el resultado...",
      description: getBlockData('experiencia').description || "Es el resultado de años...",
      hitos: getBlockData('experiencia').hitos || [
        { sub: "ORIGEN", title: "Casa Verde", desc: "Más de 15 años..." },
        { sub: "INVESTIGACIÓN", title: "Más Casa", desc: "Investigación..." },
        { sub: "CREACIÓN", title: "Prevención", desc: "Prevención..." },
        { sub: "HOY", title: "Volver a Casa", desc: "Conocimiento..." }
      ],
      cta: getBlockData('experiencia').cta || {
        text: "Volver a Casa es un proyecto...",
        btnText: "Conocer la Plataforma VIDAS ↗",
        btnUrl: "https://plataformavidas.org"
      }
    },
    actualidad: {
      title: getBlockData('actualidad').title || "Actualidad",
      overhead: getBlockData('actualidad').overhead || "Lo último del proyecto.",
      description: getBlockData('actualidad').description || "Noticias, jornadas..."
    },
    videos: {
      title: getBlockData('videos').title || "Multimedia",
      overhead: getBlockData('videos').overhead || "Vídeos más significativos.",
      description: getBlockData('videos').description || "Descubre más sobre nuestro trabajo..."
    }
  });

  const handleUpdate = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const handleUpdateArray = (section: string, field: string, index: number, subfield: string | null, value: any) => {
    setFormData(prev => {
      const sectionData = (prev as any)[section];
      const arr = [...sectionData[field]];
      if (subfield) {
        arr[index] = { ...arr[index], [subfield]: value };
      } else {
        arr[index] = value;
      }
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: arr
        }
      };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Save Page Data
    await updatePageAction(initialPage.id, { title: formData.title, description: formData.description });

    if (slug === 'home') {
      // Save blocks
      const blocksToSave = [
        { type: 'hero', json: formData.hero, order: 0 },
        { type: 'proyecto', json: formData.proyecto, order: 1 },
        { type: 'objetivos', json: formData.objetivos, order: 2 },
        { type: 'experiencia', json: formData.experiencia, order: 3 },
        { type: 'actualidad', json: formData.actualidad, order: 4 },
        { type: 'videos', json: formData.videos, order: 5 },
      ];

      for (const block of blocksToSave) {
        await savePageBlockAction(initialPage.id, block.type, block.json, block.order);
      }
    }

    setIsSaving(false);
    toast.success("Cambios guardados exitosamente");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <button 
            onClick={() => router.push("/admin/pages")} 
            style={{ color: "var(--ink-faint)", fontSize: "0.9rem", marginBottom: "8px", display: "inline-block", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            ← Volver a páginas
          </button>
          <h1 className="admin-title" style={{ marginBottom: "8px" }}>Editar: {initialPage.title}</h1>
          <div style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>Estado: <strong>{initialPage.status}</strong></div>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="admin-btn admin-btn-outline" style={{ borderColor: "var(--ink-faint)", color: "var(--ink-soft)" }}>
            Vista Previa
          </button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div className="admin-card">
            <h2 style={{ fontSize: "1.2rem", color: "var(--azul)", marginBottom: "16px" }}>Información General</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título de la página/sección</label>
                <input className="admin-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Descripción general</label>
                <textarea className="admin-input" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
          </div>

          {slug === "home" ? (
            <div className="admin-card" style={{ padding: "0" }}>
              <div style={{ padding: "24px 24px 0 24px" }}>
                <h2 style={{ fontSize: "1.2rem", color: "var(--azul)", marginBottom: "8px" }}>Contenido por Secciones</h2>
                <p style={{ fontSize: "0.9rem", color: "var(--ink-faint)", marginBottom: "24px" }}>
                  Selecciona la sección de la portada que deseas editar.
                </p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", borderBottom: "1px solid var(--cream-3)", paddingBottom: "16px", marginBottom: "24px" }}>
                  {homeTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "var(--r-pill)",
                        border: "1px solid",
                        borderColor: activeTab === tab.id ? "var(--azul)" : "var(--cream-3)",
                        backgroundColor: activeTab === tab.id ? "var(--azul)" : "var(--paper)",
                        color: activeTab === tab.id ? "white" : "var(--ink-soft)",
                        fontSize: "0.9rem",
                        fontWeight: activeTab === tab.id ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: "0 24px 24px 24px" }}>
                
                <div style={{ display: activeTab === "hero" ? "flex" : "none", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s ease" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Texto Superior (Sobre-título)</label>
                    <input className="admin-input" value={formData.hero.overhead} onChange={e => handleUpdate('hero', 'overhead', e.target.value)} />
                    <p style={{ fontSize: "0.8rem", color: "var(--ink-faint)", marginTop: "4px" }}>Texto pequeño que aparece encima del título principal.</p>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título Principal</label>
                    <textarea className="admin-input" rows={3} value={formData.hero.title} onChange={e => handleUpdate('hero', 'title', e.target.value)} />
                    <p style={{ fontSize: "0.8rem", color: "var(--ink-faint)", marginTop: "4px" }}>Usa etiquetas HTML como &lt;span class="text-blue"&gt;texto&lt;/span&gt; o &lt;span class="text-green"&gt;texto&lt;/span&gt; si necesitas cambiar el color de una palabra específica.</p>
                  </div>
                </div>

                <div style={{ display: activeTab === "proyecto" ? "flex" : "none", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título de la Sección</label>
                        <input className="admin-input" value={formData.proyecto.title} onChange={e => handleUpdate('proyecto', 'title', e.target.value)} />
                      </div>
                      <div className="proyecto-editor">
                        <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Descripción Principal</label>
                        <ReactQuill 
                          theme="snow" 
                          value={formData.proyecto.description} 
                          onChange={(val: string) => handleUpdate('proyecto', 'description', val)} 
                          modules={restrictedModules}
                          ref={quillRef}
                        />
                      </div>
                    </div>
                  
                  <hr style={{ border: "none", borderTop: "1px solid var(--cream-3)" }} />
                  
                  <div>
                    <h3 style={{ fontSize: "1.05rem", color: "var(--azul)", marginBottom: "16px" }}>Características (3 Ítems)</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {formData.proyecto.items.map((item: any, idx: number) => (
                        <div key={idx} style={{ backgroundColor: "var(--paper)", border: "1px solid var(--cream-3)", borderRadius: "var(--r-sm)", padding: "16px" }}>
                          <h4 style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "12px" }}>Ítem {idx + 1}</h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Título</label>
                              <input className="admin-input" value={item.title} onChange={e => handleUpdateArray('proyecto', 'items', idx, 'title', e.target.value)} />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Descripción</label>
                              <textarea className="admin-input" rows={2} value={item.description} onChange={e => handleUpdateArray('proyecto', 'items', idx, 'description', e.target.value)} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: activeTab === "objetivos" ? "flex" : "none", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título</label>
                      <input className="admin-input" value={formData.objetivos.title} onChange={e => handleUpdate('objetivos', 'title', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Descripción Principal</label>
                      <textarea className="admin-input" rows={3} value={formData.objetivos.description} onChange={e => handleUpdate('objetivos', 'description', e.target.value)} />
                    </div>
                  </div>
                  
                  <hr style={{ border: "none", borderTop: "1px solid var(--cream-3)" }} />
                  
                  <div>
                    <h3 style={{ fontSize: "1.05rem", color: "var(--azul)", marginBottom: "16px" }}>Lista de Objetivos (Izquierda)</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {formData.objetivos.items.map((text: string, idx: number) => (
                        <div key={idx}>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Punto {idx + 1}</label>
                          <input className="admin-input" value={text} onChange={e => handleUpdateArray('objetivos', 'items', idx, null, e.target.value)} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid var(--cream-3)" }} />

                  <div>
                    <h3 style={{ fontSize: "1.05rem", color: "var(--azul)", marginBottom: "16px" }}>Tarjetas de Métricas (Derecha)</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      {formData.objetivos.metrics.map((card: any, idx: number) => (
                        <div key={idx} style={{ backgroundColor: "var(--paper)", border: "1px solid var(--cream-3)", borderRadius: "var(--r-sm)", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)" }}>Tarjeta {idx + 1}</label>
                          <div>
                            <input className="admin-input" style={{ fontWeight: "bold", fontSize: "1.1rem" }} value={card.val} onChange={e => handleUpdateArray('objetivos', 'metrics', idx, 'val', e.target.value)} placeholder="Valor principal (ej: 85%)" />
                          </div>
                          <div>
                            <textarea className="admin-input" rows={2} value={card.desc} onChange={e => handleUpdateArray('objetivos', 'metrics', idx, 'desc', e.target.value)} placeholder="Descripción de la métrica" />
                          </div>
                          <div>
                            <input className="admin-input" style={{ fontSize: "0.85rem", color: "var(--naranja)" }} value={card.sub} onChange={e => handleUpdateArray('objetivos', 'metrics', idx, 'sub', e.target.value)} placeholder="Sub-etiqueta (ej: DATO PROVISIONAL)" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: activeTab === "experiencia" ? "flex" : "none", flexDirection: "column", gap: "24px", animation: "fadeIn 0.3s ease" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Texto Superior (Sobre-título)</label>
                      <input className="admin-input" value={formData.experiencia.overhead} onChange={e => handleUpdate('experiencia', 'overhead', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título Principal</label>
                      <textarea className="admin-input" rows={2} value={formData.experiencia.title} onChange={e => handleUpdate('experiencia', 'title', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Descripción</label>
                      <textarea className="admin-input" rows={3} value={formData.experiencia.description} onChange={e => handleUpdate('experiencia', 'description', e.target.value)} />
                    </div>
                  </div>
                  
                  <hr style={{ border: "none", borderTop: "1px solid var(--cream-3)" }} />
                  
                  <div>
                    <h3 style={{ fontSize: "1.05rem", color: "var(--azul)", marginBottom: "16px" }}>Línea de Tiempo (Hitos del recorrido)</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {formData.experiencia.hitos.map((hito: any, idx: number) => (
                        <div key={idx} style={{ backgroundColor: "var(--paper)", border: "1px solid var(--cream-3)", borderRadius: "var(--r-sm)", padding: "16px" }}>
                          <h4 style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "12px" }}>Hito {idx + 1}</h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Sobre-título (ej: ORIGEN)</label>
                              <input className="admin-input" value={hito.sub} onChange={e => handleUpdateArray('experiencia', 'hitos', idx, 'sub', e.target.value)} />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Título</label>
                              <input className="admin-input" value={hito.title} onChange={e => handleUpdateArray('experiencia', 'hitos', idx, 'title', e.target.value)} />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "4px" }}>Descripción</label>
                              <textarea className="admin-input" rows={2} value={hito.desc} onChange={e => handleUpdateArray('experiencia', 'hitos', idx, 'desc', e.target.value)} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid var(--cream-3)" }} />

                  <div>
                    <h3 style={{ fontSize: "1.05rem", color: "var(--azul)", marginBottom: "16px" }}>Llamada a la Acción (Plataforma VIDAS)</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Texto del bloque</label>
                        <textarea className="admin-input" rows={3} value={formData.experiencia.cta.text} onChange={e => handleUpdate('experiencia', 'cta', { ...formData.experiencia.cta, text: e.target.value })} />
                      </div>
                      <div style={{ display: "flex", gap: "16px" }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Texto del Botón</label>
                          <input className="admin-input" value={formData.experiencia.cta.btnText} onChange={e => handleUpdate('experiencia', 'cta', { ...formData.experiencia.cta, btnText: e.target.value })} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Enlace del Botón</label>
                          <input className="admin-input" value={formData.experiencia.cta.btnUrl} onChange={e => handleUpdate('experiencia', 'cta', { ...formData.experiencia.cta, btnUrl: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: activeTab === "actualidad" ? "flex" : "none", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s ease" }}>
                  <div style={{ padding: "12px 16px", backgroundColor: "var(--cream-3)", borderRadius: "var(--r-sm)", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
                    💡 <strong>Nota:</strong> Las noticias en sí se gestionan en la pestaña "Noticias" del menú principal. Aquí solo editas el texto introductorio.
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título de la sección</label>
                    <input className="admin-input" value={formData.actualidad.title} onChange={e => handleUpdate('actualidad', 'title', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Sobre-título / Destacado</label>
                    <input className="admin-input" value={formData.actualidad.overhead} onChange={e => handleUpdate('actualidad', 'overhead', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Descripción Principal</label>
                    <textarea className="admin-input" rows={2} value={formData.actualidad.description} onChange={e => handleUpdate('actualidad', 'description', e.target.value)} />
                  </div>
                </div>

                <div style={{ display: activeTab === "videos" ? "flex" : "none", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s ease" }}>
                  <div style={{ padding: "12px 16px", backgroundColor: "var(--cream-3)", borderRadius: "var(--r-sm)", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
                    💡 <strong>Nota:</strong> Los vídeos se gestionan en la pestaña "Vídeos" del menú principal. Aquí solo editas el texto introductorio.
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Título de la sección</label>
                    <input className="admin-input" value={formData.videos.title} onChange={e => handleUpdate('videos', 'title', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Sobre-título / Destacado</label>
                    <input className="admin-input" value={formData.videos.overhead} onChange={e => handleUpdate('videos', 'overhead', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px", fontWeight: 600 }}>Descripción Principal</label>
                    <textarea className="admin-input" rows={3} value={formData.videos.description} onChange={e => handleUpdate('videos', 'description', e.target.value)} />
                  </div>
                </div>

              </div>
            </div>
          ) : null}

        </div>

        <div className="admin-card" style={{ position: "sticky", top: "96px" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--azul)" }}>Ajustes de Página</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "4px" }}>Título de la Página (Interno)</label>
              <input className="admin-input" defaultValue={initialPage.title} disabled style={{ backgroundColor: "var(--cream-3)" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "4px" }}>URL / Slug</label>
              <input className="admin-input" defaultValue={initialPage.slug} disabled style={{ backgroundColor: "var(--cream-3)" }} />
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
