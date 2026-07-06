import type { MetadataRoute } from "next";
import { getNews } from "@/lib/services/news.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://volveracasa.fundacionmanantial.org";
  
  // Obtener noticias publicadas
  const news = await getNews(false);
  
  const newsUrls: MetadataRoute.Sitemap = news.map((item: any) => ({
    url: `${baseUrl}/actualidad/${item.id}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(item.publication_date || new Date()),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/actualidad`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-privacidad`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...newsUrls
  ];
}
