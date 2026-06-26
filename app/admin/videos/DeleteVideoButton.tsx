"use client";

import { useState } from "react";
import { archiveVideoAction } from "../../../lib/actions/admin";
import toast from 'react-hot-toast';

export default function DeleteVideoButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que deseas borrar este vídeo?")) {
      setIsDeleting(true);
      await archiveVideoAction(id);
      setIsDeleting(false);
      toast.success("Vídeo eliminado correctamente");
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="admin-btn" 
      style={{ padding: "4px 12px", fontSize: "0.8rem", color: isDeleting ? "var(--ink-faint)" : "var(--naranja)" }}
    >
      {isDeleting ? "Borrando..." : "Eliminar"}
    </button>
  );
}
