"use client";
import { useState } from "react";
import { TabType } from "@/types";
import { TAB_LABELS } from "@/constants/categories";
import { exportAsImage, printElement } from "@/utils/exportImage";

interface Props {
  tab: TabType;
  onClear: () => void;
}

// Base64 데이터 URL을 모바일 Native 공유가 가능한 File 객체로 변환해 주는 헬퍼 함수
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export default function ActionBar({ tab, onClear }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const today = new Date();
      const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
      const fileName = `하루시계_${TAB_LABELS[tab]}_${dateStr}.png`;

      const dataUrl = await exportAsImage("clock-export-area", fileName);
      if (!dataUrl) {
        throw new Error("이미지 데이터를 생성할 수 없습니다.");
      }

      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      if (isMobileDevice) {
        try {
          const file = dataURLtoFile(dataUrl, fileName);
          // 📱 1차 대응: 최신 모바일 기기가 지원할 경우 OS 기본 파일 공유 창을 실행합니다.
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: "나만의 하루시계 🗓",
              text: "손그림 감성 시계로 오늘 하루를 계획해 보세요!",
            });
            return;
          }
        } catch (shareError) {
          console.warn(
            "Native 공유가 제한되어 폴백 저장 모달로 전환합니다.",
            shareError,
          );
        }

        // 📱 2차 대응 (폴백): 공유 API가 제한된 인앱 브라우저나 사파리를 위해 길게 눌러 저장 유도 모달을 노출합니다.
        setPreviewUrl(dataUrl);
        setShowModal(true);
      } else {
        // 💻 PC 대응: 브라우저 다이렉트 다운로드 실행
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("이미지 저장에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
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
            {isSaving ? "💾 저장 중..." : "💾 이미지 저장"}
          </button>
        </div>

        {/* 📱 모바일 전용 반응형 스타일 선언 */}
        <style>{`
          @media (max-width: 768px) {
            /* 모바일 웹뷰에서는 작동성이 무의미한 프린트 버튼을 숨깁니다. */
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
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1100,
            padding: 24,
            boxSizing: "border-box",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: "24px 20px",
              maxWidth: "380px",
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                fontFamily: '"Gaegu", cursive',
                fontSize: 22,
                fontWeight: 600,
                color: "#534AB7",
                textAlign: "center",
              }}
            >
              🎉 나만의 하루시계 완성!
            </div>

            <div
              style={{
                fontSize: 14,
                color: "#666",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              아래 이미지를 **길게 꾹 누르시면**
              <br />
              사진첩에 안전하게 저장하실 수 있어요! 📸
            </div>

            {/* 유저가 길게 눌러 다운로드할 수 있는 고해상도 변환 이미지 슬롯 */}
            <div
              style={{
                width: "100%",
                background: "#fdfdfd",
                border: "1.5px dashed #EEEDFE",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={previewUrl}
                alt="하루시계 결과물"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "260px",
                  objectFit: "contain",
                  userSelect: "auto", // 모바일 기본 프레스 제스처 허용
                  WebkitUserSelect: "auto",
                }}
              />
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                background: "#534AB7",
                color: "white",
                border: "none",
                fontSize: 18,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(83, 74, 183, 0.2)",
              }}
              onClick={() => setShowModal(false)}
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
  background: "#f5f5f5",
  color: "#888",
  border: "1px solid #e8e8e8",
  cursor: "pointer",
  fontSize: 15,
  whiteSpace: "nowrap",
  flexShrink: 0,
};
const printBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  background: "white",
  color: "#534AB7",
  border: "1.5px solid #534AB7",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  whiteSpace: "nowrap",
};
const saveBtn: React.CSSProperties = {
  padding: "12px 20px",
  borderRadius: 12,
  background: "#534AB7",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 600,
  whiteSpace: "nowrap",
};
