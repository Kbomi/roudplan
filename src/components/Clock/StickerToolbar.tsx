"use client";
import { Sticker } from "@/types";

interface Props {
  selectedSticker: Sticker | null;
  onSizeChange: (delta: number) => void;
  onDelete: () => void;
  onDeselect: () => void;
}

export default function StickerToolbar({
  selectedSticker,
  onSizeChange,
  onDelete,
  onDeselect,
}: Props) {
  if (!selectedSticker) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "8px 14px",
        background: "white",
        borderRadius: 40,
        boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        border: "1px solid #f0f0f0",
        userSelect: "none",
      }}
      onClick={(e) => {
        console.log("🟢 toolbar onClick stopPropagation");

        e.stopPropagation();
      }}
    >
      {/* 선택된 스티커 미리보기 */}
      <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 4 }}>
        {selectedSticker.src ? (
          <img src={selectedSticker.src} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <span style={{ fontSize: 20 }}>{selectedSticker.emoji}</span>
        )}
      </div>

      <div style={{ width: 1, height: 20, background: "#eee" }} />

      {/* 작게 */}
      <button style={toolBtn} title="작게" onClick={() => onSizeChange(-8)}>
        <span style={{ fontSize: 16 }}>➖</span>
      </button>

      {/* 크기 표시 */}
      <span
        style={{
          fontSize: 11,
          color: "#aaa",
          minWidth: 32,
          textAlign: "center",
        }}
      >
        {Math.round(selectedSticker.size)}px
      </span>

      {/* 크게 */}
      <button style={toolBtn} title="크게" onClick={() => onSizeChange(8)}>
        <span style={{ fontSize: 16 }}>➕</span>
      </button>

      <div style={{ width: 1, height: 20, background: "#eee" }} />

      {/* 삭제 */}
      <button
        style={{ ...toolBtn, color: "#ff5c5c" }}
        title="삭제"
        onClick={onDelete}
      >
        <span style={{ fontSize: 16 }}>🗑️</span>
      </button>

      <div style={{ width: 1, height: 20, background: "#eee" }} />

      {/* 완료 */}
      <button
        style={{
          ...toolBtn,
          background: "#534AB7",
          color: "white",
          borderRadius: 20,
          padding: "4px 12px",
          fontSize: 12,
          fontWeight: 600,
        }}
        title="완료"
        onClick={onDeselect}
      >
        완료
      </button>
    </div>
  );
}

const toolBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px 6px",
  borderRadius: 8,
  transition: "background 0.1s",
};
