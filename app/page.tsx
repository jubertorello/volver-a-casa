import { getPageBySlug } from '@/lib/services/pages.service';
import { getNews } from '@/lib/services/news.service';
import { getVideos } from '@/lib/services/videos.service';
import { generateShortDesc } from '@/lib/articles';
import HomePageClient from './HomePageClient';

// Add revalidation if needed (e.g., revalidate = 60, or rely on on-demand revalidation)
export const revalidate = 0; // Para ver los cambios instantaneamente durante el dev

export default async function Page() {
  const pageData = await getPageBySlug('home');
  
  // Extraer los bloques
  const blocks = pageData?.blocks || [];
  
  const getBlock = (type: string) => {
    const block = blocks.find((b: any) => b.type === type);
    return block?.content_json || null;
  };

  const heroData = getBlock('hero');
  const proyectoData = getBlock('proyecto');
  const caminoData = getBlock('camino');
  const objetivosData = getBlock('objetivos');
  const experienciaData = getBlock('experiencia');
  const actualidadData = getBlock('actualidad');
  const videosData = getBlock('videos');

  const { getSettings } = await import('@/lib/services/settings.service');
  const footerLogos = await getSettings('footer_logos') || [];
  const socialLinks = await getSettings('social') || {};
  const generalSettings = await getSettings('general') || {};
  const contactEmail = generalSettings.contactEmail || "volveracasa@fundacionmanantial.org";
  const contactPhone = generalSettings.contactPhone || "617 293 880";

  const rawNews = await getNews();
  const newsList = rawNews
    .filter(n => new Date(n.publication_date) <= new Date())
    .map(n => ({
      id: n.id,
      title: n.title,
      type: n.category,
      date: n.publication_date,
      shortDesc: generateShortDesc(n.content_html),
      cover: n.featured_image || ""
    }));

  const rawVideos = await getVideos();
  const videosList = rawVideos.filter(v => v.status === 'published');

  return (
    <HomePageClient 
      heroData={heroData}
      proyectoData={proyectoData}
      caminoData={caminoData}
      objetivosData={objetivosData}
      experienciaData={experienciaData}
      actualidadData={actualidadData}
      videosData={videosData}
      footerLogos={footerLogos}
      socialLinks={socialLinks}
      news={newsList}
      videos={videosList}
      contactEmail={contactEmail}
      contactPhone={contactPhone}
    />
  );
}
