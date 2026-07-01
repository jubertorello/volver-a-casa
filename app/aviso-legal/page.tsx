import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ActualidadHeader from "@/components/ActualidadHeader";
import Footer from "@/components/Footer";
import { getLegalPageBySlug } from "@/lib/services/legal.service";
import { getSettings } from "@/lib/services/settings.service";

export const metadata: Metadata = {
  title: "Aviso Legal — Volver a Casa",
  description: "Aviso legal del proyecto Volver a Casa de Fundación Manantial.",
};

export const revalidate = 0;

function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/&nbsp;/gi, ' ')
    .replace(/style="([^"]*)"/gi, (_match, styles: string) => {
      const cleaned = styles
        .split(';')
        .map((s: string) => s.trim())
        .filter((s: string) => {
          const prop = s.split(':')[0]?.trim().toLowerCase();
          return prop && !['white-space', 'word-break', 'overflow-wrap', 'word-wrap'].includes(prop);
        })
        .join('; ');
      return cleaned ? `style="${cleaned}"` : '';
    });
}

export default async function AvisoLegalPage() {
  const legalPage = await getLegalPageBySlug('aviso-legal');
  const socialLinks = await getSettings('social') || {};
  const generalSettings = await getSettings('general') || {};
  const contactEmail = generalSettings.contactEmail || "volveracasa@fundacionmanantial.org";
  const contactPhone = generalSettings.contactPhone || "617 293 880";
  const footerLogos = await getSettings('footer_logos') || [];
  
  return (
    <div className="articles-page">
      <ActualidadHeader />

      <section className="articles-hero">
        <div className="articles-hero__inner">
          <Link href="/" className="articles-hero__back">
            ← Inicio
          </Link>
          <h1>Aviso Legal</h1>
          <p>Información general e identificativa del portal.</p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream)" }}>
        <div
          className="wrap"
          style={{
            maxWidth: "760px",
            background: "var(--paper)",
            padding: "clamp(30px, 6vw, 56px)",
            borderRadius: "var(--r-lg)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="legal-content" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {legalPage?.content ? (
              <div 
                className="article-body" 
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(legalPage.content) }} 
              />
            ) : (
              <>
                <h2 style={{ fontSize: "1.4rem", color: "var(--azul-deep)" }}>
                  Datos del Titular
                </h2>
                <p>
                  En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa que el titular de este sitio web es:
                </p>
                <div style={{ background: "var(--cream-2)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid var(--azul)" }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>FUNDACIÓN MANANTIAL</p>
                  <p style={{ margin: "6px 0 0" }}>Calle Poeta Esteban de Villegas, 12 posterior, 28014 Madrid</p>
                  <p style={{ margin: "4px 0 0" }}>NIF: G-81237257</p>
                  <p style={{ margin: "8px 0 0" }}>
                    Contacto:{" "}
                    <a href="mailto:dpo@fundacionmanantial.org" style={{ color: "var(--azul)", fontWeight: 700 }}>
                      dpo@fundacionmanantial.org
                    </a>
                  </p>
                </div>

                <h2 style={{ fontSize: "1.4rem", color: "var(--azul-deep)", marginTop: "12px" }}>
                  Condiciones de Uso
                </h2>
                <p>
                  El acceso a este portal web atribuye la condición de Usuario, comprometiéndose a hacer un uso de la web y de sus contenidos de conformidad con la ley, el presente Aviso Legal y las buenas costumbres.
                </p>
                <p>
                  Todos los contenidos intelectuales o industriales (textos, logos, imágenes, etc.) pertenecen a Fundación Manantial o a sus licenciantes. Queda prohibida su reproducción o distribución sin autorización previa.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer socialLinks={socialLinks} contactEmail={contactEmail} contactPhone={contactPhone} logos={footerLogos} />
    </div>
  );
}
