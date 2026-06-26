import { getVideos } from "../../../lib/services/videos.service";
import Link from "next/link";
import DeleteVideoButton from "./DeleteVideoButton";
import "../../../styles/admin.css";

export default async function VideosList() {
  const videos = await getVideos();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 className="admin-title" style={{ marginBottom: 0 }}>Vídeos Destacados</h1>
        <Link href="/admin/videos/new" className="admin-btn admin-btn-primary">
          + Añadir Vídeo
        </Link>
      </div>
      
      <p style={{ color: "var(--ink-soft)", marginBottom: "24px", maxWidth: "600px" }}>
        Gestiona los vídeos que aparecen en la sección principal y otras áreas de la web. Solo necesitas el enlace de YouTube o Vimeo.
      </p>

      {videos.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", color: "var(--ink-faint)", padding: "48px" }}>
          No hay vídeos añadidos todavía.
        </div>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
        {videos.map((video) => {
          const isYouTube = video.video_url?.includes('youtube') || video.video_url?.includes('youtu.be');
          const isVimeo = video.video_url?.includes('vimeo');
          const platform = isYouTube ? "YouTube" : (isVimeo ? "Vimeo" : "Video");
          
          return (
            <div key={video.id} className="admin-card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "180px", backgroundColor: "var(--cream-3)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-faint)", overflow: "hidden" }}>
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "3rem" }}>▶</span>
                )}
                <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "rgba(0,0,0,0.6)", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold" }}>
                  {platform}
                </div>
              </div>
              
              <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--ink)" }}>{video.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", marginBottom: "16px", wordBreak: "break-all" }}>
                  <a href={video.video_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--azul)", textDecoration: "underline" }}>
                    {video.video_url}
                  </a>
                </p>
                
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid var(--cream-3)" }}>
                  <span style={{ 
                    display: "inline-block",
                    padding: "4px 12px", 
                    borderRadius: "var(--r-pill)", 
                    fontSize: "0.8rem", 
                    fontWeight: 600,
                    backgroundColor: video.status === "published" ? "var(--verde-soft)" : "var(--cream-3)",
                    color: video.status === "published" ? "var(--verde-deep)" : "var(--ink-soft)"
                  }}>
                    {video.status === 'published' ? 'Publicado' : video.status}
                  </span>
                  
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link href={`/admin/videos/${video.id}`} className="admin-btn admin-btn-outline" style={{ padding: "4px 12px", fontSize: "0.8rem" }}>Editar</Link>
                    <DeleteVideoButton id={video.id} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
