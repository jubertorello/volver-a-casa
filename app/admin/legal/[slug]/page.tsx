import { getLegalPageBySlug } from "../../../../lib/services/legal.service";
import LegalEditorClient from "./LegalEditorClient";
import { notFound } from "next/navigation";

export default async function LegalEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const initialPage = await getLegalPageBySlug(slug);
  if (!initialPage) {
    notFound();
  }

  return <LegalEditorClient initialPage={initialPage} />;
}
