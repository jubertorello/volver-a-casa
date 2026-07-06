import type { Metadata, Viewport } from "next";
import { Capriola, Carlito } from "next/font/google";
import "@/styles/styles.css";
import "@/styles/components.css";

const capriola = Capriola({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
});

const carlito = Carlito({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { getSettings } = await import('@/lib/services/settings.service');
  const seo = await getSettings('seo') || {};
  
  const title = seo.title || "Volver a Casa — Reconstruyendo vínculos, acompañando familias";
  const description = seo.description || "Volver a Casa acompaña a niños, niñas y sus familias en procesos de reunificación familiar. Un proyecto de innovación social de Fundación Manantial.";
  
  return {
    title,
    description,
    alternates: {
      canonical: "https://volveracasa.fundacionmanantial.org",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: "https://volveracasa.fundacionmanantial.org",
      siteName: "Volver a Casa",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: "https://volveracasa.fundacionmanantial.org/assets/logo-volveracasa.png",
          width: 600,
          height: 600,
          alt: "Logo Volver a Casa",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["https://volveracasa.fundacionmanantial.org/assets/logo-volveracasa.png"],
    },
    verification: {
      google: "kfJ7g7WObAc71-yGSSGXhj9w67vLHYh5787TimWbOGc",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  }: {
  children: React.ReactNode;
}) {
  const { getSettings } = await import('@/lib/services/settings.service');
  const seo = await getSettings('seo') || {};
  const schemaTitle = seo.title || "Volver a Casa";
  const schemaDesc = seo.description || "Volver a Casa acompaña a niños, niñas y sus familias en procesos de reunificación familiar. Un proyecto de innovación social de Fundación Manantial.";
  return (
    <html lang="es" className="fx">
      <body className={`${capriola.variable} ${carlito.variable}`}>
        {/* Declare loaded font overrides */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              --font-display: var(--font-display-loaded), 'Capriola', 'Calibri', system-ui, sans-serif;
              --font-body: var(--font-body-loaded), 'Calibri', 'Carlito', system-ui, -apple-system, sans-serif;
            }
          `
        }} />
        {/* JSON-LD Organization Schema for SEO structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              "name": schemaTitle,
              "description": schemaDesc,
              "url": "https://volveracasa.fundacionmanantial.org",
              "logo": "https://volveracasa.fundacionmanantial.org/assets/logo-volveracasa.png",
              "parentOrganization": {
                "@type": "Organization",
                "name": "Fundación Manantial",
                "url": "https://www.fundacionmanantial.org",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
