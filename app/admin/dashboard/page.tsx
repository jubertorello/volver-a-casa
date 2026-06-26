import Link from "next/link";
import "../../../styles/admin.css";
import { getPages } from "@/lib/services/pages.service";
import { getNews } from "@/lib/services/news.service";
import { getVideos } from "@/lib/services/videos.service";

export const revalidate = 0; // Ensure data is fresh

export default async function DashboardPage() {
  const pages = await getPages();
  const news = await getNews(true); // Include drafts
  const videos = await getVideos();

  // Calculate KPIs
  const pagesCount = pages.length;
  const publishedNewsCount = news.filter((n: any) => 
    n.status === 'published' || n.status === 'Publicado' || (!n.status && new Date(n.publication_date) <= new Date())
  ).length;
  const publishedVideosCount = videos.filter((v: any) => v.status === 'published').length;

  // Build Recent Activity list
  const recentItems: any[] = [];
  
  pages.forEach((p: any) => {
    recentItems.push({
      id: `page_${p.id}`,
      title: p.title,
      type: "Página",
      status: "Publicado", // Pages don't have drafts in this schema
      dateObj: new Date(p.updated_at || p.created_at),
      editLink: `/admin/pages` // No specific page editor right now, just list
    });
  });

  news.forEach((n: any) => {
    const isPublished = n.status === 'published' || n.status === 'Publicado' || (!n.status && new Date(n.publication_date) <= new Date());
    recentItems.push({
      id: `news_${n.id}`,
      title: n.title,
      type: "Noticia",
      status: isPublished ? "Publicado" : "Borrador",
      dateObj: new Date(n.created_at || n.publication_date),
      editLink: `/admin/news/${n.id}`
    });
  });

  videos.forEach((v: any) => {
    recentItems.push({
      id: `vid_${v.id}`,
      title: v.title,
      type: "Vídeo",
      status: v.status === 'published' ? "Publicado" : "Borrador",
      dateObj: new Date(v.created_at),
      editLink: `/admin/videos` // No specific video editor right now
    });
  });

  // Sort by most recent
  recentItems.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
  const topRecent = recentItems.slice(0, 5);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <h1 className="admin-title">Bienvenido al Panel, Editor</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {/* Stat Cards */}
        <div className="admin-card">
          <div style={{ color: "var(--ink-faint)", fontSize: "0.9rem", fontWeight: 600 }}>Páginas Activas</div>
          <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--azul)", margin: "8px 0" }}>{pagesCount}</div>
          <Link href="/admin/pages" style={{ color: "var(--naranja)", fontSize: "0.9rem", textDecoration: "underline" }}>Gestionar páginas</Link>
        </div>
        
        <div className="admin-card">
          <div style={{ color: "var(--ink-faint)", fontSize: "0.9rem", fontWeight: 600 }}>Noticias Publicadas</div>
          <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--azul)", margin: "8px 0" }}>{publishedNewsCount}</div>
          <Link href="/admin/news" style={{ color: "var(--naranja)", fontSize: "0.9rem", textDecoration: "underline" }}>Redactar noticia</Link>
        </div>

        <div className="admin-card">
          <div style={{ color: "var(--ink-faint)", fontSize: "0.9rem", fontWeight: 600 }}>Vídeos Publicados</div>
          <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-display)", color: "var(--azul)", margin: "8px 0" }}>{publishedVideosCount}</div>
          <Link href="/admin/videos" style={{ color: "var(--naranja)", fontSize: "0.9rem", textDecoration: "underline" }}>Actualizar vídeos</Link>
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--azul)", marginBottom: "20px" }}>
        Actividad Reciente
      </h2>
      
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--cream-3)", backgroundColor: "var(--paper)", color: "var(--ink-faint)" }}>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Contenido</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Tipo</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Estado</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem" }}>Fecha</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, fontSize: "0.9rem", textAlign: "right" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {topRecent.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid var(--cream-3)" }}>
                <td style={{ padding: "16px 24px", fontWeight: 500 }}>{item.title}</td>
                <td style={{ padding: "16px 24px", color: "var(--ink-soft)" }}>{item.type}</td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ 
                    display: "inline-block",
                    padding: "4px 12px", 
                    borderRadius: "var(--r-pill)", 
                    fontSize: "0.8rem", 
                    fontWeight: 600,
                    backgroundColor: item.status === "Publicado" ? "var(--verde-soft)" : "var(--cream-3)",
                    color: item.status === "Publicado" ? "var(--verde-deep)" : "var(--ink-soft)"
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", color: "var(--ink-soft)", fontSize: "0.9rem" }}>{formatDate(item.dateObj)}</td>
                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                  <Link href={item.editLink} className="admin-btn admin-btn-outline" style={{ padding: "6px 12px", fontSize: "0.8rem", textDecoration: "none" }}>
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {topRecent.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "var(--ink-faint)" }}>No hay actividad reciente.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
