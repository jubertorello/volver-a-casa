"use client";

import { useState } from "react";
import { archiveNewsAction } from "../../../lib/actions/admin";
import toast from 'react-hot-toast';

export default function DeleteNewsButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("¿Seguro que quieres eliminar esta noticia? Pasará a la papelera (archivada).")) {
      setIsDeleting(true);
      await archiveNewsAction(id);
      setIsDeleting(false);
      toast.success("Noticia eliminada correctamente");
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="admin-btn" 
      style={{ padding: "6px 12px", fontSize: "0.8rem", color: isDeleting ? "var(--ink-faint)" : "var(--naranja)" }}
    >
      {isDeleting ? "Borrando..." : "Borrar"}
    </button>
  );
}
