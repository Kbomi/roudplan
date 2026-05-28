"use client";
import { useState, useCallback } from "react";
import { TabType, Segment } from "@/types";
import { useSegments } from "@/hooks/useSegments";
import { useStickers } from "@/hooks/useStickers";
import TabNav from "@/components/Header/TabNav";
import ClockCanvas from "@/components/Clock/ClockCanvas";
import StickerOverlay from "@/components/Clock/StickerOverlay";
import SegmentForm from "@/components/Panel/SegmentForm";
import SegmentList from "@/components/Panel/SegmentList";
import StickerTray from "@/components/Panel/StickerTray";
import ActionBar from "@/components/ActionBar/ActionBar";
import { TAB_TITLE_SUFFIX, TAB_LABELS } from "@/constants/categories";
import { generateComment } from "@/utils/generateComment";
import StickerToolbar from "@/components/Clock/StickerToolbar";

export default function Home() {
  const [tab, setTab] = useState<TabType>("life_plan");
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

  const handleTabChange = useCallback((newTab: TabType) => {
    setTab(newTab);
    setEditTarget(null);
  }, []);

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
    <div
      style={{
        minHeight: "100vh",
        background: "#f9f8ff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 폰트 로드 */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap"
        rel="stylesheet"
      />

      <TabNav activeTab={tab} onTabChange={handleTabChange} />

      <main
        style={{
          flex: 1,
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* 작업 영역 */}
        <div
          className="work-area"
          style={{
            display: "grid",
            // gridTemplateColumns: "1fr 400px",
            gridTemplateColumns: "minmax(0, 1fr) clamp(320px, 35%, 420px)",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* 좌측: 시계 */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 12, color: "#bbb", textAlign: "center" }}>
              결과물 미리보기
            </div>

            {/* 내보내기 영역 (이미지로 저장될 부분) */}
            <div
              id="clock-export-area"
              style={{
                position: "relative",
                background: "white",
                borderRadius: 12,
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
                style={{
                  position: "absolute",
                  inset: 12,
                  pointerEvents: stickers.length > 0 ? "auto" : "none",
                }}
                // onClick={() => setSelectedId(null)}
                onClick={(e) => {
                  console.log(
                    "🔴 overlay onClick fired, target===currentTarget:",
                    e.target === e.currentTarget,
                  );
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
            <StickerTray tab={tab} onStickerClick={addSticker} />

            {/* 스티커 툴바 — 선택된 스티커 있을 때만 표시 */}
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

          {/* 우측: 입력 패널 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* 이름 입력 */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                placeholder="이름을 입력하세요"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={10}
                style={{
                  fontFamily: '"Gaegu", cursive',
                  fontSize: 20,
                  border: "none",
                  borderBottom: "2px solid #ddd",
                  background: "transparent",
                  outline: "none",
                  width: 160,
                  paddingBottom: 2,
                  color: "#444",
                }}
              />
              <span
                style={{
                  fontFamily: '"Gaegu", cursive',
                  fontSize: 20,
                  color: "#666",
                }}
              >
                {TAB_TITLE_SUFFIX[tab]}
              </span>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
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
                background: "white",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#444",
                  marginBottom: 12,
                }}
              >
                추가된 구간{" "}
                <span style={{ color: "#aaa", fontWeight: 400, fontSize: 12 }}>
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
                  background: "#EEEDFE",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 14,
                  color: "#534AB7",
                  fontFamily: '"Gaegu", cursive',
                  textAlign: "center",
                }}
              >
                {comment}
              </div>
            )}
          </div>
        </div>
      </main>

      <ActionBar tab={tab} onClear={handleClearAll} />

      {/* 프린트 CSS */}
      <style>{`
        @media print {
          header, .action-bar, nav { display: none !important; }
          #clock-export-area { width: 100%; }
          main { padding: 0 !important; }
        }
        @media (max-width: 768px) {
          .work-area {
            grid-template-columns: 1fr !important;
          }
          main {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
