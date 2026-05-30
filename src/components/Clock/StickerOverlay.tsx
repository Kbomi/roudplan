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

  // 📱 모바일 드래그 이동 터치 이벤트 처리
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, id: string) => {
      e.stopPropagation();
      console.log("📱 touchstart on sticker:", id);
      draggingRef.current = false;

      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      const sticker = stickers.find((s) => s.id === id);
      if (!sticker) return;
      const origX = sticker.x;
      const origY = sticker.y;

      const onTouchMove = (mv: TouchEvent) => {
        // 드래그 동작 시 모바일 브라우저의 기본 페이지 스크롤(제스처)을 방어합니다.
        if (mv.cancelable) {
          mv.preventDefault();
        }
        const currentTouch = mv.touches[0];
        const dx = currentTouch.clientX - startX;
        const dy = currentTouch.clientY - startY;

        // 5px 이상 움직여야 드래그로 인식
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          draggingRef.current = true;
        }
        if (draggingRef.current) {
          onUpdate(id, { x: origX + dx, y: origY + dy });
        }
      };

      const onTouchEnd = () => {
        console.log("📱 touchend, dragging was:", draggingRef.current);
        // 드래그하지 않고 탭만 한 경우 스티커 선택/해제 토글
        if (!draggingRef.current) {
          onSelect(selectedId === id ? null : id);
        }
        draggingRef.current = false;
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      };

      // { passive: false } 로 지정해야 preventDefault()의 디바이스 스크롤 잠금이 오동작 없이 원활하게 구동됩니다.
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
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

  // 📱 모바일 크기 조절 터치 이벤트 처리
  const handleTouchResizeStart = useCallback(
    (e: React.TouchEvent, id: string) => {
      e.stopPropagation();
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      const sticker = stickers.find((s) => s.id === id);
      if (!sticker) return;
      const origSize = sticker.size;

      const onTouchMove = (mv: TouchEvent) => {
        if (mv.cancelable) {
          mv.preventDefault();
        }
        const currentTouch = mv.touches[0];
        const dx = currentTouch.clientX - startX;
        const dy = currentTouch.clientY - startY;
        const delta = Math.sqrt(dx * dx + dy * dy) * (dx + dy > 0 ? 1 : -1);
        const newSize = Math.max(20, Math.min(120, origSize + delta * 0.5));
        onUpdate(id, { size: newSize });
      };

      const onTouchEnd = () => {
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      };

      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
    },
    [stickers, onUpdate],
  );

  return (
    <div
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
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
            touchAction: "none", // ◀ 모바일 뷰포트에서 스티커 터치 드래그 시 브라우저 오동작 방지
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
          onTouchStart={(e) => handleTouchStart(e, s.id)} // ◀ 📱 모바일 드래그 시작 이벤트 연동
        >
          {s.src ? (
            <img
              src={s.src}
              alt="sticker"
              style={{
                width: "90%",
                height: "90%",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          ) : (
            s.emoji
          )}

          {/* 삭제 버튼 */}
          {selectedId === s.id && (
            <button
              style={{
                position: "absolute",
                top: -14,
                right: -14,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#ff5c5c",
                color: "white",
                border: "2px solid white",
                cursor: "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
                padding: 0,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                zIndex: 10,
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()} // ◀ 📱 모바일 삭제 버튼 터치 버블링 방어
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
                bottom: -10,
                right: -10,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#7F77DD",
                border: "2px solid white",
                cursor: "se-resize",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                zIndex: 10,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleResizeDown(e, s.id);
              }}
              onTouchStart={(e) => { // ◀ 📱 모바일 크기 조절 터치 시작 이벤트 연동
                e.stopPropagation();
                handleTouchResizeStart(e, s.id);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
