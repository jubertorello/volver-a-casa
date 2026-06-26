export const mockPages = [
  { id: "home", title: "Home", slug: "/", status: "Publicado", lastModified: "2023-10-25T10:30:00Z" },
  { id: "actualidad", title: "Actualidad", slug: "/actualidad", status: "Publicado", lastModified: "2023-10-21T11:20:00Z" },
];

export const mockNews = [
  { id: 1, title: "Lanzamiento del programa de acogimiento familiar", date: "2023-10-10", status: "Publicado", image: "/placeholder-news-1.jpg" },
  { id: 2, title: "Historias de éxito: La familia García", date: "2023-10-18", status: "Publicado", image: "/placeholder-news-2.jpg" },
  { id: 3, title: "Nuevo taller informativo en Madrid", date: "2023-11-05", status: "Borrador", image: null },
];

export const mockVideos = [
  { id: 1, title: "Campaña Volver a Casa 2023", platform: "YouTube", url: "https://youtube.com/watch?v=...", status: "Publicado" },
  { id: 2, title: "Testimonio: Carlos y Ana", platform: "YouTube", url: "https://youtube.com/watch?v=...", status: "Publicado" },
];

export const mockLegal = [
  { id: "privacidad", title: "Política de Privacidad", slug: "/politica-de-privacidad", status: "Publicado" },
  { id: "aviso-legal", title: "Aviso Legal", slug: "/aviso-legal", status: "Publicado" },
];

// Block structures for Page Editor Mock
export const availableBlocks = [
  { type: "hero", name: "Hero Section", icon: "🖼️" },
  { type: "text", name: "Bloque de Texto", icon: "📝" },
  { type: "image_text", name: "Imagen + Texto", icon: "📰" },
  { type: "cards", name: "Tarjetas (Grid)", icon: "🗂️" },
  { type: "call_to_action", name: "Banner Llamada a la Acción", icon: "🎯" },
];
