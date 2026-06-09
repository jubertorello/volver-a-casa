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

export const metadata: Metadata = {
  title: "Volver a Casa — Reconstruyendo vínculos, acompañando familias",
  description:
    "Volver a Casa acompaña a niños, niñas y sus familias en procesos de reunificación familiar. Un proyecto de innovación social de Fundación Manantial.",
  alternates: {
    canonical: "https://volveracasa.fundacionmanantial.org",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Volver a Casa — Reconstruyendo vínculos, acompañando familias",
    description:
      "Volver a Casa acompaña a niños, niñas y sus familias en procesos de reunificación familiar. Un proyecto de innovación social de Fundación Manantial.",
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
    title: "Volver a Casa — Reconstruyendo vínculos, acompañando familias",
    description:
      "Volver a Casa acompaña a niños, niñas y sus familias en procesos de reunificación familiar. Un proyecto de innovación social de Fundación Manantial.",
    images: ["https://volveracasa.fundacionmanantial.org/assets/logo-volveracasa.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  }: {
  children: React.ReactNode;
}) {
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
              "@type": "Organization",
              "name": "Volver a Casa",
              "description":
                "Volver a Casa acompaña a niños, niñas y sus familias en procesos de reunificación familiar. Un proyecto de innovación social de Fundación Manantial.",
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
