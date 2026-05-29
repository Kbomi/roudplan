"use client";
import { useState } from "react";
import { TabType, Sticker } from "@/types";
import { TAB_LABELS } from "@/constants/categories";
import { exportAsImage, printElement } from "@/utils/exportImage";

interface Props {
  tab: TabType;
  onClear: () => void;
  stickers: Sticker[];
}

export default function ActionBar({ tab, onClear, stickers }: Props) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const today = new Date();
      const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
      await exportAsImage(
        "clock-export-area",
        `하루시계_${TAB_LABELS[tab]}_${dateStr}.png`,
        stickers,
      );
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("이미지 저장에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="action-bar"
      style={{
        background: "white",
        borderTop: "1px solid #f0f0f0",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        bottom: 0,
        zIndex: 100,
        boxShadow: "0 -1px 8px rgba(0,0,0,0.04)",
        gap: 8,
      }}
    >
      <button
        style={clearBtn}
        onClick={() => {
          if (confirm("전체 초기화할까요?")) onClear();
        }}
      >
        ↺ 초기화
      </button>
      <div
        style={{ display: "flex", gap: 8, flex: 1, justifyContent: "flex-end" }}
      >
        <button style={printBtn} onClick={printElement}>
          🖨 프린트
        </button>
        <button 
          style={{
            ...saveBtn,
            opacity: isSaving ? 0.7 : 1,
            cursor: isSaving ? "not-allowed" : "pointer",
          }} 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "💾 저장 중..." : "💾 이미지 저장"}
        </button>
      </div>
    </div>
  );
}

const clearBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "#f5f5f5",
  color: "#888",
  border: "1px solid #e8e8e8",
  cursor: "pointer",
  fontSize: 13,
  whiteSpace: "nowrap",
  flexShrink: 0,
};
const printBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "white",
  color: "#534AB7",
  border: "1.5px solid #534AB7",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  whiteSpace: "nowrap",
};
const saveBtn: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 10,
  background: "#534AB7",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  whiteSpace: "nowrap",
};
