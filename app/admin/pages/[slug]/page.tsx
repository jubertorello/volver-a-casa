import { getPageBySlug } from "../../../../lib/services/pages.service";
import PageEditorClient from "./PageEditorClient";
import { notFound } from "next/navigation";

export default async function PageEditorServer({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;
  
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  return <PageEditorClient initialPage={pageData} slug={slug} />;
}
