import { getPageBySlug } from "../../../../lib/services/pages.service";
import PageEditorClient from "./PageEditorClient";
import { notFound } from "next/navigation";

export default async function PageEditorServer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  return <PageEditorClient initialPage={pageData} slug={slug} />;
}
