"use client";

import { useEffect, useState } from "react";

export default function MediaFileSize({ url }: { url: string }) {
  const [sizeStr, setSizeStr] = useState<string>("Calculando...");

  useEffect(() => {
    let isMounted = true;
    const fetchSize = async () => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const bytes = res.headers.get("content-length");
        if (bytes && isMounted) {
          const kb = (parseInt(bytes, 10) / 1024).toFixed(1);
          setSizeStr(`${kb} KB`);
        } else if (isMounted) {
          setSizeStr("Desconocido");
        }
      } catch (e) {
        if (isMounted) setSizeStr("Error");
      }
    };
    fetchSize();
    return () => { isMounted = false; };
  }, [url]);

  return <span>{sizeStr}</span>;
}
