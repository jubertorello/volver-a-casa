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
        {children}
      </body>
    </html>
  );
}
