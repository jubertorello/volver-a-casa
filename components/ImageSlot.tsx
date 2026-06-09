"use client";

import React, { useState, useEffect, useRef } from "react";

interface ImageSlotProps {
  id: string;
  shape?: "rect" | "rounded" | "circle" | "pill";
  radius?: number;
  mask?: string;
  fit?: "cover" | "contain" | "fill";
  position?: string;
  placeholder?: string;
  src?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ImageSlot({
  id,
  shape = "rounded",
  radius = 12,
  mask,
  fit = "cover",
  position = "50% 50%",
  placeholder = "Drop an image",
  src = "",
  style,
  className = "",
}: ImageSlotProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isOver, setIsOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isReframe, setIsReframe] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  
  // Crop state: { s: scale, x: x-offset %, y: y-offset % }
  const [view, setView] = useState({ s: 1, x: 0, y: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  // Load persisted state from localStorage on client side mount
  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem(`image-slot-${id}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed === "string") {
          setImageUrl(parsed);
        } else if (parsed && parsed.u) {
          setImageUrl(parsed.u);
          setView({
            s: typeof parsed.s === "number" ? parsed.s : 1,
            x: typeof parsed.x === "number" ? parsed.x : 0,
            y: typeof parsed.y === "number" ? parsed.y : 0,
          });
        }
      } catch (e) {
        setImageUrl(stored); // fallback if it was a plain string
      }
    }
  }, [id]);

  // Persist crop or image changes
  const persist = (urlStr: string | null, viewObj = view) => {
    if (!id) return;
    if (urlStr) {
      const state = { u: urlStr, s: viewObj.s, x: viewObj.x, y: viewObj.y };
      localStorage.setItem(`image-slot-${id}`, JSON.stringify(state));
    } else {
      localStorage.removeItem(`image-slot-${id}`);
    }
  };

  // Border radius rules matching original
  let borderRadius = "";
  if (!mask) {
    if (shape === "circle") borderRadius = "50%";
    else if (shape === "pill") borderRadius = "9999px";
    else if (shape === "rounded") borderRadius = `${radius}px`;
  }

  // Handle image loading to calculate cover baseline logic
  const applyViewStyle = () => {
    const img = imgRef.current;
    const wrapper = wrapperRef.current;
    if (!img || !wrapper) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const fw = wrapper.clientWidth;
    const fh = wrapper.clientHeight;

    if (fit !== "cover" || !iw || !ih || !fw || !fh) {
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.left = "50%";
      img.style.top = "50%";
      img.style.objectFit = fit;
      img.style.objectPosition = position;
      return;
    }

    // Cover math matching image-slot.js
    const base = Math.max(fw / iw, fh / ih);
    const k = base * viewRef.current.s;
    img.style.width = `${(iw * k) / fw * 100}%`;
    img.style.height = `${(ih * k) / fh * 100}%`;
    img.style.left = `${50 + viewRef.current.x}%`;
    img.style.top = `${50 + viewRef.current.y}%`;
    img.style.objectFit = "none";
  };

  useEffect(() => {
    applyViewStyle();
  }, [imageUrl, view, fit]);

  // ResizeObserver to recompute on sizing shifts
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(() => {
      applyViewStyle();
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) ingestFile(file);
  };

  const ingestFile = (file: File) => {
    setErrorMsg("");
    const accept = ["image/png", "image/jpeg", "image/webp", "image/avif"];
    if (accept.indexOf(file.type) < 0) {
      setErrorMsg("Drop a PNG, JPEG, WebP, or AVIF image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result) {
        setImageUrl(result);
        const newView = { s: 1, x: 0, y: 0 };
        setView(newView);
        persist(result, newView);
      }
    };
    reader.onerror = () => {
      setErrorMsg("Could not read that image.");
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current++;
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current--;
    if (dragDepth.current <= 0) {
      setIsOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current = 0;
    setIsOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) ingestFile(file);
  };

  const handleDblClick = (e: React.MouseEvent) => {
    if (!imageUrl || fit !== "cover") return;
    e.preventDefault();
    setIsReframe(!isReframe);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isReframe || e.button !== 0) return;
    e.preventDefault();
    const target = e.target as HTMLElement;
    const corner = target.getAttribute("data-c");
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const rect = wrapper.getBoundingClientRect();
    const fw = rect.width || 1;
    const fh = rect.height || 1;

    if (corner) {
      // Reframe Resize math
      const iw = img.naturalWidth || 1;
      const ih = img.naturalHeight || 1;
      const base = Math.max(fw / iw, fh / ih);
      const sx = corner.includes("e") ? 1 : -1;
      const sy = corner.includes("s") ? 1 : -1;
      const s0 = view.s;
      const w0 = iw * base * s0;
      const h0 = ih * base * s0;
      const cx0 = ((50 + view.x) / 100) * fw;
      const cy0 = ((50 + view.y) / 100) * fh;
      const ox = cx0 - (sx * w0) / 2;
      const oy = cy0 - (sy * h0) / 2;
      const diag0 = Math.hypot(w0, h0);
      const ux = (sx * w0) / diag0;
      const uy = (sy * h0) / diag0;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const proj =
          (moveEvent.clientX - rect.left - ox) * ux +
          (moveEvent.clientY - rect.top - oy) * uy;
        const s = Math.max(1, Math.min(5, (s0 * proj) / diag0));
        const d = (diag0 * s) / s0;
        
        const nextView = {
          s,
          x: ((ox + (ux * d) / 2) / fw) * 100 - 50,
          y: ((oy + (uy * d) / 2) / fh) * 100 - 50,
        };

        // Clamp
        const mx = Math.max(0, ((iw * base * s) / fw - 1) * 50);
        const my = Math.max(0, ((ih * base * s) / fh - 1) * 50);
        nextView.x = Math.max(-mx, Math.min(mx, nextView.x));
        nextView.y = Math.max(-my, Math.min(my, nextView.y));

        setView(nextView);
      };

      const handlePointerUp = () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        persist(imageUrl);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    } else {
      // Reframe Pan math
      setIsPanning(true);
      const start = {
        px: e.clientX,
        py: e.clientY,
        x: view.x,
        y: view.y,
      };

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const nextView = {
          s: view.s,
          x: start.x + ((moveEvent.clientX - start.px) / fw) * 100,
          y: start.y + ((moveEvent.clientY - start.py) / fh) * 100,
        };

        const iw = img.naturalWidth || 1;
        const ih = img.naturalHeight || 1;
        const base = Math.max(fw / iw, fh / ih);
        const mx = Math.max(0, ((iw * base * view.s) / fw - 1) * 50);
        const my = Math.max(0, ((ih * base * view.s) / fh - 1) * 50);

        nextView.x = Math.max(-mx, Math.min(mx, nextView.x));
        nextView.y = Math.max(-my, Math.min(my, nextView.y));

        setView(nextView);
      };

      const handlePointerUp = () => {
        setIsPanning(false);
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        persist(imageUrl);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageUrl("");
    setIsReframe(false);
    setView({ s: 1, x: 0, y: 0 });
    persist(null);
  };

  const currentSrc = imageUrl || src;

  // Render modal escape hooks when in reframe mode
  useEffect(() => {
    if (!isReframe) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsReframe(false);
        persist(imageUrl);
      }
    };
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsReframe(false);
        persist(imageUrl);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isReframe, imageUrl]);

  return (
    <div
      ref={wrapperRef}
      style={{ ...style }}
      className={`image-slot-wrapper ${className}`}
      data-over={isOver ? "" : undefined}
      data-filled={currentSrc ? "" : undefined}
      data-reframe={isReframe ? "" : undefined}
      data-panning={isPanning ? "" : undefined}
      data-editable=""
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDoubleClick={handleDblClick}
    >
      <div
        className="frame"
        style={{ borderRadius, clipPath: mask || undefined }}
        onClick={() => !currentSrc && fileInputRef.current?.click()}
      >
        {currentSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={currentSrc}
            alt="Slot content"
            draggable="false"
            onLoad={applyViewStyle}
          />
        )}
        {!currentSrc && (
          <div className="empty">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <div className="cap">{placeholder}</div>
            <div className="sub">
              or <u>browse files</u>
            </div>
          </div>
        )}
        <div className="ring" style={{ borderRadius }} />
      </div>

      {isReframe && currentSrc && (
        <div
          className="spill"
          style={{
            width: imgRef.current?.style.width,
            height: imgRef.current?.style.height,
            left: imgRef.current?.style.left,
            top: imgRef.current?.style.top,
          }}
          onPointerDown={handlePointerDown}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="ghost"
            src={currentSrc}
            alt="Ghost preview"
            draggable="false"
          />
          <div className="handle" data-c="nw" />
          <div className="handle" data-c="ne" />
          <div className="handle" data-c="sw" />
          <div className="handle" data-c="se" />
        </div>
      )}

      {currentSrc && (
        <div className="ctl">
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            Replace
          </button>
          <button type="button" onClick={handleClear}>
            Remove
          </button>
        </div>
      )}

      {errorMsg && <div className="err">{errorMsg}</div>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/avif"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}
