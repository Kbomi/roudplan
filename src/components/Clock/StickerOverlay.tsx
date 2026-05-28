"use client";
import { useCallback, useRef } from "react";
import { Sticker } from "@/types";

interface Props {
  stickers: Sticker[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<Sticker>) => void;
  onDelete: (id: string) => void;
}

export default function StickerOverlay({
  stickers,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
}: Props) {
  const draggingRef = useRef(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      console.log("🖱️ mousedown on sticker:", id);
      draggingRef.current = false;

      const startX = e.clientX;
      const startY = e.clientY;
      const sticker = stickers.find((s) => s.id === id);
      if (!sticker) return;
      const origX = sticker.x;
      const origY = sticker.y;

      const onMove = (mv: MouseEvent) => {
        const dx = mv.clientX - startX;
        const dy = mv.clientY - startY;
        // 5px 이상 움직여야 드래그로 인식
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          draggingRef.current = true;
        }
        if (draggingRef.current) {
          onUpdate(id, { x: origX + dx, y: origY + dy });
        }
      };

      const onUp = () => {
        console.log("🖱️ mouseup, dragging was:", draggingRef.current);
        // 드래그 아니면 선택 처리
        if (!draggingRef.current) {
          console.log("👆 click detected → selecting:", id);
          onSelect(selectedId === id ? null : id);
        }
        draggingRef.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [stickers, selectedId, onSelect, onUpdate],
  );

  const handleResizeDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const sticker = stickers.find((s) => s.id === id);
      if (!sticker) return;
      const origSize = sticker.size;

      const onMove = (mv: MouseEvent) => {
        const dx = mv.clientX - startX;
        const dy = mv.clientY - startY;
        const delta = Math.sqrt(dx * dx + dy * dy) * (dx + dy > 0 ? 1 : -1);
        const newSize = Math.max(20, Math.min(120, origSize + delta * 0.5));
        onUpdate(id, { size: newSize });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [stickers, onUpdate],
  );

  return (
    <div
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      // onClick={() => onSelect(null)}
    >
      {stickers.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: s.x - s.size / 2,
            top: s.y - s.size / 2,
            width: s.size,
            height: s.size,
            cursor: "grab",
            pointerEvents: "all",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: s.size * 0.75,
            border:
              selectedId === s.id
                ? "2px dashed #7F77DD"
                : "2px solid transparent",
            borderRadius: 6,
            boxSizing: "border-box",
            transition: "border 0.1s",
          }}
          onMouseDown={(e) => handleMouseDown(e, s.id)}
        >
          {s.emoji}

          {/* 삭제 버튼 */}
          {selectedId === s.id && (
            <button
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#ff5c5c",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
                padding: 0,
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(s.id);
              }}
            >
              ✕
            </button>
          )}

          {/* 크기 조절 핸들 */}
          {selectedId === s.id && (
            <div
              style={{
                position: "absolute",
                bottom: -6,
                right: -6,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#7F77DD",
                cursor: "se-resize",
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleResizeDown(e, s.id);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
