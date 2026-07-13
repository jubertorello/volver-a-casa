// ============================================================
//  Volver a Casa — Datos de Actualidad
// ============================================================

export type ArticleType =
  | "Jornada"
  | "Hito"
  | "Congreso"
  | "Alianza"
  | "Formación"
  | "Publicación"
  | "Noticia";

export const ALL_TYPES: ArticleType[] = [
  "Jornada",
  "Hito",
  "Congreso",
  "Alianza",
  "Formación",
  "Publicación",
  "Noticia",
];

/** Hex colors for each type — align with brand palette */
export const typeColor: Record<ArticleType, string> = {
  Jornada:    "#fa8d04", // naranja
  Hito:       "#02a54b", // verde
  Congreso:   "#1f53a6", // azul
  Alianza:    "#017a38", // verde-deep
  Formación:  "#d97700", // naranja-deep
  Publicación:"#173f80", // azul-deep
  Noticia:    "#1f53a6", // azul
};

export interface Article {
  /** URL slug — used in /actualidad/[id] */
  id: string;
  title: string;
  type: ArticleType;
  /** ISO date string: "2026-06-10" */
  date: string;
  /** Short description for listing cards */
  shortDesc: string;
  /** Path under /public or external URL. Empty string = show gradient. */
  cover: string;
  /** Rich HTML content for the detail page */
  content: string;
  /** Optional gallery image paths */
  gallery?: string[];
}

// ── Helpers ─────────────────────────────────────────────────

export function formatDate(iso: string): string {
  if (!iso) return "";
  const dateStr = iso.includes('T') ? iso.split('T')[0] : iso;
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  if (!iso) return "";
  const dateStr = iso.includes('T') ? iso.split('T')[0] : iso;
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-ES", { month: "short", year: "numeric" }).toUpperCase();
}

export function generateShortDesc(html: string): string {
  if (!html) return "";
  let text = html
    .replace(/<p[^>]*>/g, ' ')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

// ── Imagen por defecto ────────────────────────────────────────
export const DEFAULT_COVER = "/assets/article-cover-1.png";
