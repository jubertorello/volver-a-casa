import { getNewsById } from "../../../../lib/services/news.service";
import NewsEditorClient from "./NewsEditorClient";

export default async function NewsEditorPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;
  const isNew = slug === "new";
  
  let initialNews = null;
  if (!isNew) {
    initialNews = await getNewsById(slug);
  }

  return <NewsEditorClient initialNews={initialNews || {}} isNew={isNew} />;
}
