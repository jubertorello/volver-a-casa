import Link from "next/link";
import { getLegalPages } from "../../../lib/services/legal.service";
import "../../../styles/admin.css";

export default async function LegalPagesList() {
  const legalPages = await getLegalPages();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 className="admin-title" style={{ marginBottom: "8px" }}>Páginas Legales</h1>
          <p style={{ color: "var(--ink-soft)" }}>Gestiona los textos legales (Aviso Legal, Política de Privacidad).</p>
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--cream-3)", backgroundColor: "var(--paper)", color: "var(--ink-faint)" }}>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Documento</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Ruta</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Estado</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem", textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {legalPages.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "var(--ink-faint)" }}>
                  No hay páginas legales todavía.
                </td>
              </tr>
            ) : null}
            {legalPages.map((page) => (
              <tr key={page.id} style={{ borderBottom: "1px solid var(--cream-3)" }}>
                <td style={{ padding: "16px 24px", fontWeight: 500 }}>
                  <Link href={`/admin/legal/${page.slug}`} style={{ color: "var(--azul)" }}>
                    {page.title}
                  </Link>
                </td>
                <td style={{ padding: "16px 24px", color: "var(--ink-soft)", fontFamily: "monospace", fontSize: "0.9rem" }}>/{page.slug}</td>
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
                    {page.status === 'published' ? 'Publicado' : page.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                  <Link href={`/admin/legal/${page.slug}`} className="admin-btn admin-btn-outline" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                    Editar Texto
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
