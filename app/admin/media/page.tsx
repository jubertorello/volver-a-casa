import { getMediaAssets } from "../../../lib/services/cloudinary.service";
import { getNews } from "../../../lib/services/news.service";
import { getVideos } from "../../../lib/services/videos.service";
import { getPages } from "../../../lib/services/pages.service";
import { getSettings } from "../../../lib/services/settings.service";
import { createClient } from "../../../lib/supabase/server";
import MediaCard from "./MediaCard";
import "../../../styles/admin.css";

export const revalidate = 0;

export default async function MediaPage() {
  const mediaAssets = await getMediaAssets();
  
  // Fetch all content to check for associations
  const news = await getNews(true); // all news including drafts
  const videos = await getVideos();
  const pages = await getPages();
  const footerLogos = await getSettings("footer_logos") || [];
  
  // Fetch page blocks directly
  const supabase = await createClient();
  const { data: pageBlocks } = await supabase.from("page_blocks").select("*");

  // Map each media asset to its usages
  const mediaWithUsages = mediaAssets.map((asset: any) => {
    const usages: { type: string; title: string; icon: string }[] = [];
    const url = asset.secure_url;
    
    // Check News
    news.forEach((n: any) => {
      let isUsed = false;
      if (n.featured_image === url) isUsed = true;
      if (n.gallery && Array.isArray(n.gallery) && n.gallery.includes(url)) isUsed = true;
      if (n.content_html && n.content_html.includes(url)) isUsed = true;
      
      if (isUsed) {
        usages.push({ type: "Noticia", title: n.title, icon: "📰" });
      }
    });

    // Check Videos
    videos.forEach((v: any) => {
      if (v.thumbnail === url) {
        usages.push({ type: "Vídeo", title: v.title, icon: "🎬" });
      }
    });

    // Check Pages
    if (pageBlocks) {
      pageBlocks.forEach((block: any) => {
        const blockJson = JSON.stringify(block.content_json || {});
        if (blockJson.includes(url)) {
          const page = pages.find((p: any) => p.id === block.page_id);
          const pageTitle = page ? page.title : "Página Desconocida";
          // Check if we already added this page
          if (!usages.some(u => u.type === "Página" && u.title === pageTitle)) {
            usages.push({ type: "Página", title: pageTitle, icon: "📄" });
          }
        }
      });
    }

    // Check Settings
    footerLogos.forEach((logo: any) => {
      if (logo.imgUrl === url || logo.image_url === url) {
        usages.push({ type: "Ajuste", title: "Logos del Footer", icon: "⚙️" });
      }
    });

    return {
      ...asset,
      usages
    };
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 className="admin-title" style={{ marginBottom: "8px" }}>Media 🖼️</h1>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>
            Aquí puedes ver todas las imágenes que has subido. Para mantener la web funcionando correctamente, las imágenes que están siendo utilizadas en alguna noticia, página, vídeo o ajuste no pueden eliminarse.
          </p>
        </div>
      </div>
      
      {mediaWithUsages.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", color: "var(--ink-faint)", padding: "48px" }}>
          No hay ninguna imagen subida todavía.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {mediaWithUsages.map((asset: any) => (
            <MediaCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
}
