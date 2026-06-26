import Link from "next/link";
import { getNews } from "../../../lib/services/news.service";
import "../../../styles/admin.css";

import DeleteNewsButton from "./DeleteNewsButton";

export default async function NewsList() {
  const newsList = await getNews(true);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 className="admin-title" style={{ marginBottom: 0 }}>Noticias</h1>
        <Link href="/admin/news/new" className="admin-btn admin-btn-primary">
          + Redactar Noticia
        </Link>
      </div>
      
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--cream-3)", backgroundColor: "var(--paper)", color: "var(--ink-faint)" }}>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem", width: "80px" }}>Imagen</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Titular</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Fecha</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Estado</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem", textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "var(--ink-faint)" }}>
                  No hay noticias publicadas todavía.
                </td>
              </tr>
            ) : null}
            {newsList.map((newsItem) => {
              const isPublished = newsItem.status === 'published' || (!newsItem.status && new Date(newsItem.publication_date) <= new Date());
              return (
              <tr key={newsItem.id} style={{ borderBottom: "1px solid var(--cream-3)" }}>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ width: "48px", height: "48px", backgroundColor: "var(--cream-3)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {newsItem.featured_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={newsItem.featured_image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : <span style={{ color: "var(--ink-faint)", fontSize: "0.8rem" }}>Sin Img</span>}
                  </div>
                </td>
                <td style={{ padding: "16px 24px", fontWeight: 500 }}>
                  <Link href={`/admin/news/${newsItem.id}`} style={{ color: "var(--azul)" }}>
                    {newsItem.title}
                  </Link>
                </td>
                <td style={{ padding: "16px 24px", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
                  {newsItem.publication_date ? new Date(newsItem.publication_date).toLocaleDateString("es-ES", { day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ 
                    display: "inline-block",
                    padding: "4px 12px", 
                    borderRadius: "var(--r-pill)", 
                    fontSize: "0.8rem", 
                    fontWeight: 600,
                    backgroundColor: isPublished ? "var(--verde-soft)" : "var(--cream-3)",
                    color: isPublished ? "var(--verde-deep)" : "var(--ink-soft)"
                  }}>
                    {isPublished ? 'Público' : 'Borrador'}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                  <Link href={`/admin/news/${newsItem.id}`} className="admin-btn admin-btn-outline" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                    Editar
                  </Link>
                  <DeleteNewsButton id={newsItem.id} />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}
