"use client";
import { useState } from "react";
import { TabType } from "@/types";
import { TAB_LABELS } from "@/constants/categories";
import { exportAsImage, exportAsBlob, printElement } from "@/utils/exportImage";

interface Props {
  tab: TabType;
  onClear: () => void;
}

export default function ActionBar({ tab, onClear }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const closeModal = () => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    setShowModal(false);
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const today = new Date();
      const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
      const fileName = `하루시계_${TAB_LABELS[tab]}_${dateStr}.png`;

      // 1. Blob으로 이미지 생성 (DataURL보다 메모리 효율적이며 다운로드에 유리함)
      const blob = await exportAsBlob("clock-export-area");
      if (!blob) {
        throw new Error("이미지 데이터를 생성할 수 없습니다.");
      }

      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isMobile =
        isAndroid ||
        isIOS ||
        /webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isAndroid) {
        // (A) 안드로이드: 즉시 다운로드 (대부분의 안드로이드 갤러리는 다운로드 폴더를 자동 스캔함)
        try {
          const blob = await exportAsBlob("clock-export-area");
          if (!blob) throw new Error("이미지 생성 실패");

          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setPreviewUrl(blobUrl);
          setShowModal(true);
          setIsSaving(false);
          return;
        } catch (androidError) {
          console.error("안드로이드 직접 저장 실패:", androidError);
        }
      }

      if (isMobile) {
        // iOS 등 모바일 대응: Blob URL을 사용하여 메모리 효율성과 안정성 확보
        const blob = await exportAsBlob("clock-export-area");
        if (!blob) throw new Error("이미지 생성 실패");

        const blobUrl = URL.createObjectURL(blob);
        const file = new File([blob], fileName, { type: "image/png" });

        // (A) 네이티브 공유 API 시도
        try {
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: "나만의 하루시계 🗓",
              text: "손그림 감성 시계로 오늘 하루를 계획해 보세요!",
            });
            setIsSaving(false);
            URL.revokeObjectURL(blobUrl); // 공유 성공 시 즉시 해제
            return;
          }
        } catch (shareError) {
          console.warn("Native 공유 중 오류 또는 취소:", shareError);
        }

        // (B) 직접 다운로드 시도 (팝업 유도)
        try {
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (downloadError) {
          console.error("모바일 직접 다운로드 시도 실패:", downloadError);
        }

        // (C) 폴백: 저장 유도 모달 노출 (Blob URL 사용)
        setPreviewUrl(blobUrl);
        setShowModal(true);
      } else {
        // PC 대응: 바로 다운로드
        const dataUrl = await exportAsImage("clock-export-area", fileName);
        if (!dataUrl) throw new Error("이미지 생성 실패");

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error: any) {
      console.error("저장 중 오류 발생:", error);
      alert(
        `이미지 저장에 실패했어요: ${error.message || "다시 시도해 주세요."}`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div
        className="action-bar"
        style={{
          background: "var(--card-bg)",
          borderTop: "1px solid var(--border-color)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          bottom: 0,
          zIndex: 100,
          boxShadow: "0 -1px 8px rgba(0,0,0,0.04)",
          gap: 8,
          transition: "background-color 0.3s ease, border-color 0.3s ease",
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
          style={{
            display: "flex",
            gap: 8,
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <button className="print-btn" style={printBtn} onClick={printElement}>
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
            {isSaving ? "⏳ 준비 중..." : "💾 이미지 내보내기"}
          </button>
        </div>

        {/* 📱 모바일 전용 반응형 스타일 선언 */}
        <style>{`
          @media (max-width: 768px) {
            .print-btn {
              display: none !important;
            }
          }
        `}</style>
      </div>

      {/* 📱 모바일 저장 유도 팝업 모달 */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1100,
            padding: 24,
            boxSizing: "border-box",
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content"
            style={{
              background: "var(--card-bg)",
              borderRadius: 20,
              padding: "24px 20px",
              maxWidth: "380px",
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxSizing: "border-box",
              transition: "background-color 0.3s ease",
              touchAction: "manipulation",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                // fontFamily: '"Gaegu", cursive',
                fontSize: 24,
                fontWeight: 700,
                color: "var(--tab-active)",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {/Android/i.test(navigator.userAgent)
                ? "📸 갤러리에 저장되었어요!"
                : tab === "baby_feed"
                  ? "🎉 우리 아기냠냠표 완성!"
                  : `🎉 나만의 ${TAB_LABELS[tab]} 완성!`}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "var(--foreground)",
                textAlign: "center",
                lineHeight: 1.5,
                // fontFamily: '"Gaegu", cursive',
                opacity: 0.9,
              }}
            >
              {/Android/i.test(navigator.userAgent) ? (
                <>
                  다운로드 폴더를 확인해 보세요.
                  <br />
                  혹시 저장되지 않았다면 이미지를 꾹 눌러주세요!
                </>
              ) : (
                <>
                  아래 이미지를 <b>길게 꾹 누르시면</b>
                  <br />
                  사진첩에 안전하게 저장하실 수 있어요! 📸
                </>
              )}
            </div>

            <div
              style={{
                width: "100%",
                background: "white",
                border: "1.5px dashed var(--tab-active)",
                borderRadius: 12,
                // overflow: "hidden", // iOS Safari에서 꾹 누를 때 미리보기가 깨지는 현상 방지를 위해 해제
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={previewUrl}
                alt="하루시계 결과물"
                style={{
                  display: "block",
                  // width: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  borderRadius: 12,
                  WebkitTouchCallout: "default",
                  WebkitUserSelect: "auto",
                  userSelect: "auto",
                  pointerEvents: "auto",
                }}
              />
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                background: "var(--tab-active)",
                color: "white",
                border: "none",
                // fontFamily: '"Gaegu", cursive',
                fontSize: 18,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(83, 74, 183, 0.2)",
              }}
              onClick={closeModal}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const clearBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  background: "var(--input-bg)",
  color: "var(--tab-inactive)",
  border: "1px solid var(--border-color)",
  cursor: "pointer",
  fontSize: 15,
  whiteSpace: "nowrap",
  flexShrink: 0,
};
const printBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  background: "transparent",
  color: "var(--tab-active)",
  border: "1.5px solid var(--tab-active)",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  whiteSpace: "nowrap",
};
const saveBtn: React.CSSProperties = {
  padding: "12px 20px",
  borderRadius: 12,
  background: "var(--tab-active)",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 600,
  whiteSpace: "nowrap",
};
