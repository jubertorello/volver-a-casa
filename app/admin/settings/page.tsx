import { getSettings } from "../../../lib/services/settings.service";
import SettingsClient from "./SettingsClient";

export default async function GeneralSettings() {
  const generalInfo = await getSettings('general') || {
    projectName: "Volver a Casa",
    contactEmail: "contacto@volveracasa.org"
  };

  const socialLinks = await getSettings('social') || {
    instagram: "https://instagram.com/volveracasa",
    facebook: "https://facebook.com/volveracasa",
    twitter: "https://twitter.com/volveracasa",
    linkedin: "https://linkedin.com/company/volveracasa"
  };

  const footerLogos = await getSettings('footer_logos') || [];

  const seo = await getSettings('seo') || {
    title: "Volver a Casa — Reconstruyendo vínculos, acompañando familias",
    description: "Volver a Casa acompaña a niños, niñas y sus familias en procesos de reunificación familiar. Un proyecto de innovación social de Fundación Manantial."
  };

  return <SettingsClient 
    initialGeneral={generalInfo} 
    initialSocial={socialLinks} 
    initialFooterLogos={footerLogos} 
    initialSeo={seo}
  />;
}
