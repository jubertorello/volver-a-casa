import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ActualidadHeader from "@/components/ActualidadHeader";
import Footer from "@/components/Footer";
import { getLegalPageBySlug } from "@/lib/services/legal.service";
import { getSettings } from "@/lib/services/settings.service";

export const metadata: Metadata = {
  title: "Política de Privacidad — Volver a Casa",
  description: "Política de privacidad del proyecto Volver a Casa de Fundación Manantial.",
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

export default async function PoliticaPrivacidadPage() {
  const legalPage = await getLegalPageBySlug('politica-privacidad');
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
          <h1>Política de Privacidad</h1>
          <p>Información básica sobre el tratamiento de tus datos.</p>
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
                <p>
                  El sitio web de <strong>Volver a Casa</strong> (un proyecto de <strong>Fundación Manantial</strong>,
                  cofinanciado por la Unión Europea, el Ministerio de Trabajo y Economía Social y Fondos Europeos, y el Ministerio de Derechos Sociales, Consumo y Agenda 2030, con la colaboración de Fundación Nemesio Díez y la Dirección General de Infancia, Familia y Fomento de la Natalidad de la Comunidad de Madrid) es de carácter meramente <strong>informativo</strong>.
                </p>

                <h2 style={{ fontSize: "1.4rem", color: "var(--azul-deep)", marginTop: "12px" }}>
                  Tratamiento de datos
                </h2>
                <p>
                  Esta web no recopila de forma directa ningún dato personal ni utiliza cookies de seguimiento o analíticas de terceros.
                </p>
                <p>
                  En caso de que decidas contactar con nosotros de forma voluntaria a través de las direcciones de correo electrónico o teléfonos facilitados en este portal, trataremos tus datos de contacto únicamente para responder a tu consulta.
                </p>

                <h2 style={{ fontSize: "1.4rem", color: "var(--azul-deep)", marginTop: "12px" }}>
                  Contacto y Derechos
                </h2>
                <p>
                  El responsable del tratamiento es <strong>Fundación Manantial</strong> (Calle Poeta Esteban de Villegas 12 posterior, 28014 Madrid). Puedes ejercer tus derechos de acceso, rectificación, supresión u oposición escribiendo a{" "}
                  <a href="mailto:dpo@fundacionmanantial.org" style={{ color: "var(--azul)", fontWeight: 700 }}>
                    dpo@fundacionmanantial.org
                  </a>.
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
