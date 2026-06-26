import { getLegalPageBySlug } from "../../../../lib/services/legal.service";
import LegalEditorClient from "./LegalEditorClient";
import { notFound } from "next/navigation";

export default async function LegalEditorPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;
  
  const initialPage = await getLegalPageBySlug(slug);
  if (!initialPage) {
    notFound();
  }

  return <LegalEditorClient initialPage={initialPage} />;
}
