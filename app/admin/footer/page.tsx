import { getSettings } from "../../../lib/services/settings.service";
import FooterClient from "./FooterClient";

export default async function FooterSettings() {
  const footerLogos = await getSettings('footer_logos') || [];

  return <FooterClient initialFooterLogos={footerLogos} />;
}
