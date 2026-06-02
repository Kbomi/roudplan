"use client";

import { useEffect, useRef, useState } from "react";

export default function AdBanner() {
  const isLoaded = useRef(false);
  const insRef = useRef<HTMLModElement>(null);
  const [adType, setAdType] = useState<"display" | "in-article" | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서 50% 확률로 광고 타입을 결정합니다. (A/B 테스트)
    // 인아티클(in-article)과 디스플레이 수평형(display) 중 하나를 무작위 선택
    const randomType = Math.random() < 0.5 ? "display" : "in-article";
    setAdType(randomType);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !adType) return;

    // DOM 렌더링이 확실히 끝나고 광고 초기화를 실행합니다.
    const timer = setTimeout(() => {
      const insElement = insRef.current;
      if (!insElement) return;

      const hasStatus = insElement.getAttribute("data-ad-status");
      const hasDone = insElement.getAttribute("data-adsbygoogle-status");
      if (hasStatus || hasDone === "done" || isLoaded.current) {
        return;
      }

      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        isLoaded.current = true;
      } catch (error) {
        console.warn(
          "애드센스 광고 초기화 중 예외가 발생했습니다.",
          error
        );
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [adType]); // adType이 결정된 후 초기화 실행

  if (!adType) return <div style={{ minHeight: "114px" }} />; // 타입 결정 전까지 레이아웃 유지

  return (
    <div
      className="no-print ad-banner-container"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 16px",
        background: "#f9f8ff",
        borderBottom: "1px solid #eae6ff",
        boxSizing: "border-box",
        minHeight: adType === "display" ? "114px" : "auto", 
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {adType === "display" ? (
          /* A안: 디스플레이 수평형 광고 */
          <ins
            key="display-ad"
            ref={insRef}
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "90px" }}
            data-ad-client="ca-pub-9140923520326778"
            data-ad-slot="6604153550"
            data-ad-format="horizontal"
            data-full-width-responsive="false"
          />
        ) : (
          /* B안: 인아티클 광고 (새로 추가) */
          <ins
            key="in-article-ad"
            ref={insRef}
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center", width: "100%" }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-9140923520326778"
            data-ad-slot="9459285711"
          />
        )}
      </div>

      <style>{`
        .ad-banner-container ins.adsbygoogle {
          ${adType === "display" ? "max-height: 90px !important; height: 90px !important;" : ""}
        }

        @media (max-width: 500px) {
          .ad-banner-container {
            padding: 6px 12px !important;
            min-height: 62px !important;
          }
          .ad-banner-container ins.adsbygoogle {
            ${adType === "display" ? "max-height: 50px !important; height: 50px !important;" : ""}
          }
        }
      `}</style>
    </div>
  );
}
