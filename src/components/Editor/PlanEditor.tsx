"use client";
import { useState, useCallback } from "react";
import { TabType, Segment } from "@/types";
import { useSegments } from "@/hooks/useSegments";
import { useStickers } from "@/hooks/useStickers";
import ClockCanvas from "@/components/Clock/ClockCanvas";
import StickerOverlay from "@/components/Clock/StickerOverlay";
import SegmentForm from "@/components/Panel/SegmentForm";
import SegmentList from "@/components/Panel/SegmentList";
import StickerTray from "@/components/Panel/StickerTray";
import ActionBar from "@/components/ActionBar/ActionBar";
import { TAB_TITLE_SUFFIX } from "@/constants/categories";
import { generateComment } from "@/utils/generateComment";
import StickerToolbar from "@/components/Clock/StickerToolbar";

interface Props {
  tab: TabType;
}

export default function PlanEditor({ tab }: Props) {
  const [userName, setUserName] = useState("");
  const [editTarget, setEditTarget] = useState<Segment | null>(null);

  const { segments, addSegment, updateSegment, deleteSegment, clearSegments } =
    useSegments();
  const {
    stickers,
    selectedId,
    setSelectedId,
    addSticker,
    updateSticker,
    deleteSticker,
    clearStickers,
  } = useStickers();

  const handleClearAll = useCallback(() => {
    clearSegments();
    clearStickers();
    setEditTarget(null);
  }, [clearSegments, clearStickers]);

  const comment =
    tab !== "life_plan" && segments.length > 0
      ? generateComment(tab, segments)
      : undefined;

  return (
    <main
      style={{
        flex: 1,
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      {/* 작업 영역 */}
      <div
        className="work-area"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 20,
          alignItems: "start",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* 좌측: 시계 */}
        <div
          className="clock-preview"
          style={{
            background: "var(--card-bg)",
            borderRadius: 16,
            padding: "16px 8px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
            boxSizing: "border-box",
            transition: "background-color 0.3s ease",
          }}
        >
          <div
            className="no-print"
            style={{ fontSize: 13, color: "var(--tab-inactive)", textAlign: "center" }}
          >
            결과물 미리보기
          </div>

          {/* 내보내기 영역 (이미지로 저장될 부분) */}
          <div
            id="clock-export-area"
            style={{
              position: "relative",
              background: "white",
              borderRadius: 12,
              width: "100%",
            }}
          >
            <ClockCanvas
              segments={segments}
              comment={comment}
              userName={userName}
              titleSuffix={TAB_TITLE_SUFFIX[tab]}
            />
            {/* 스티커 오버레이 - SVG와 동일 크기로 맞추기 */}
            <div
              className="sticker-overlay"
              style={{
                position: "absolute",
                inset: 8,
                pointerEvents: stickers.length > 0 ? "auto" : "none",
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedId(null);
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <StickerOverlay
                stickers={stickers}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onUpdate={updateSticker}
                onDelete={deleteSticker}
              />
            </div>
          </div>

          {/* 스티커 트레이 */}
          <div className="no-print">
            <StickerTray onStickerClick={addSticker} />
          </div>

          {/* 스티커 툴바 — 선택된 스티커 있을 때만 표시 */}
          <div className="no-print">
            <StickerToolbar
              selectedSticker={
                stickers.find((s) => s.id === selectedId) ?? null
              }
              onSizeChange={(delta) => {
                if (!selectedId) return;
                const s = stickers.find((st) => st.id === selectedId);
                if (!s) return;
                updateSticker(selectedId, {
                  size: Math.max(20, Math.min(120, s.size + delta)),
                });
              }}
              onDelete={() => {
                if (selectedId) deleteSticker(selectedId);
              }}
              onDeselect={() => setSelectedId(null)}
            />
          </div>
        </div>

        {/* 우측: 입력 패널 */}
        <div
          className="no-print"
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* 이름 입력 */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              placeholder="이름을 입력하세요"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              maxLength={10}
              style={{
                fontFamily: '"Gaegu", cursive',
                fontSize: 22,
                border: "none",
                borderBottom: "2px solid var(--border-color)",
                background: "transparent",
                outline: "none",
                width: 160,
                paddingBottom: 2,
                color: "var(--foreground)",
                transition: "color 0.3s ease, border-color 0.3s ease",
              }}
            />
            <span
              style={{
                fontFamily: '"Gaegu", cursive',
                fontSize: 22,
                color: "var(--tab-inactive)",
              }}
            >
              {TAB_TITLE_SUFFIX[tab]}
            </span>
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              transition: "background-color 0.3s ease",
            }}
          >
            <SegmentForm
              tab={tab}
              editTarget={editTarget}
              onAdd={addSegment}
              onUpdate={updateSegment}
              onCancelEdit={() => setEditTarget(null)}
            />
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "var(--foreground)",
                marginBottom: 12,
              }}
            >
              추가된 구간{" "}
              <span style={{ color: "var(--tab-inactive)", fontWeight: 400, fontSize: 14 }}>
                ({segments.length}개)
              </span>
            </div>
            <SegmentList
              segments={segments}
              onEdit={(seg) => setEditTarget(seg)}
              onDelete={deleteSegment}
            />
          </div>

          {/* 총평 미리보기 */}
          {comment && (
            <div
              style={{
                background: "rgba(154, 143, 255, 0.15)",
                borderRadius: 12,
                padding: "12px 16px",
                fontSize: 14,
                color: "var(--tab-active)",
                fontFamily: '"Gaegu", cursive',
                textAlign: "center",
              }}
            >
              {comment}
            </div>
          )}
        </div>
      </div>
      <ActionBar tab={tab} onClear={handleClearAll} />

      {/* 💻 PC 레이아웃 대응을 위한 반응형 스타일 */}
      <style>{`
        @media (min-width: 768px) {
          .work-area {
            grid-template-columns: minmax(0, 1fr) clamp(300px, 35%, 420px) !important;
          }
          main {
            padding: 28px 32px !important;
          }
          .clock-preview {
            padding: 24px !important;
          }
        }
      `}</style>
    </main>
  );
}
