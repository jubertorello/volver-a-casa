"use client";

import { useState, useRef } from "react";

export default function CloudinaryUpload({ 
  value, 
  onChange, 
  placeholder 
}: { 
  value: string, 
  onChange: (url: string) => void, 
  placeholder?: string 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert("Error al subir la imagen: " + (data.error || 'Desconocido'));
      }
    } catch (err) {
      console.error(err);
      alert("Error de red al subir la imagen.");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input 
        type="text" 
        className="admin-input" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder || "URL de la imagen..."} 
        style={{ flex: 1 }} 
      />
      <label 
        className="admin-btn admin-btn-outline" 
        style={{ 
          cursor: isUploading ? 'wait' : 'pointer', 
          margin: 0, 
          padding: '8px 12px',
          whiteSpace: 'nowrap',
          backgroundColor: isUploading ? 'var(--cream-2)' : 'transparent',
          color: isUploading ? 'var(--ink-faint)' : 'var(--azul)'
        }}
      >
        {isUploading ? 'Subiendo...' : 'Subir'}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          disabled={isUploading} 
          ref={fileInputRef}
        />
      </label>
    </div>
  );
}
