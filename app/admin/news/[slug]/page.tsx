import { getNewsById } from "../../../../lib/services/news.service";
import NewsEditorClient from "./NewsEditorClient";

export default async function NewsEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "new";
  
  let initialNews = null;
  if (!isNew) {
    initialNews = await getNewsById(slug);
  }

  return <NewsEditorClient initialNews={initialNews || {}} isNew={isNew} />;
}
