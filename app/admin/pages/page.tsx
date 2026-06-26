import Link from "next/link";
import { getPages } from "../../../lib/services/pages.service";
import "../../../styles/admin.css";

// Remove 'use client' since this can be a Server Component

export default async function PagesList() {
  const pages = await getPages();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 className="admin-title" style={{ marginBottom: 0 }}>Páginas</h1>
      </div>
      
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--cream-3)", backgroundColor: "var(--paper)", color: "var(--ink-faint)" }}>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Título</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Ruta / Slug</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Estado</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Última modificación</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem", textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "var(--ink-faint)" }}>
                  No hay páginas creadas todavía.
                </td>
              </tr>
            ) : null}
            {pages.map((page) => (
              <tr key={page.id} style={{ borderBottom: "1px solid var(--cream-3)" }}>
                <td style={{ padding: "16px 24px", fontWeight: 500 }}>
                  <Link href={`/admin/pages/${page.slug}`} style={{ color: "var(--azul)" }}>
                    {page.title}
                  </Link>
                </td>
                <td style={{ padding: "16px 24px", color: "var(--ink-soft)", fontFamily: "monospace", fontSize: "0.9rem" }}>{page.slug}</td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ 
                    display: "inline-block",
                    padding: "4px 12px", 
                    borderRadius: "var(--r-pill)", 
                    fontSize: "0.8rem", 
                    fontWeight: 600,
                    backgroundColor: page.status === "published" ? "var(--verde-soft)" : "var(--cream-3)",
                    color: page.status === "published" ? "var(--verde-deep)" : "var(--ink-soft)"
                  }}>
                    {page.status === "published" ? "Publicado" : page.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
                  {page.updated_at ? new Date(page.updated_at).toLocaleDateString("es-ES", { day: 'numeric', month: 'short', year: 'numeric' }) : "-"}
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                  <Link href={`/admin/pages/${page.slug}`} className="admin-btn admin-btn-outline" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
