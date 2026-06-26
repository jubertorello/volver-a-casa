import { getVideoById } from "../../../../lib/services/videos.service";
import VideoEditorClient from "./VideoEditorClient";

export default async function VideoEditorPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;
  const isNew = slug === "new";
  
  let initialVideo = null;
  if (!isNew) {
    const allVideos = await import("../../../../lib/services/videos.service").then(m => m.getVideos());
    initialVideo = allVideos.find((v: any) => v.id.toString() === slug);
  }

  return <VideoEditorClient initialVideo={initialVideo || {}} isNew={isNew} />;
}
