"use client";

import { useState } from "react";
import { deleteMediaAction } from "../../../lib/actions/admin";
import toast from 'react-hot-toast';

export default function DeleteMediaButton({ id, publicId }: { id: string, publicId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta imagen de forma permanente? Esta acción no se puede deshacer.")) {
      setIsDeleting(true);
      const res = await deleteMediaAction(id, publicId);
      setIsDeleting(false);
      if (!res.success) {
        toast.error("Error al eliminar: " + res.error);
      } else {
        toast.success("Imagen eliminada correctamente");
      }
      // If success, the page will revalidate and the item will disappear.
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      style={{ 
        background: "none", 
        border: "none", 
        color: "var(--rojo)", 
        cursor: isDeleting ? "wait" : "pointer",
        padding: "4px 8px",
        borderRadius: "var(--r-sm)",
        fontSize: "0.85rem",
        fontWeight: 600,
        opacity: isDeleting ? 0.5 : 1
      }}
    >
      {isDeleting ? "Borrando..." : "🗑️ Eliminar"}
    </button>
  );
}
