"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const isLoaded = useRef(false);

  useEffect(() => {
    // 이미 광고가 로드되었거나 SSR 단계일 때는 실행하지 않음
    if (typeof window === "undefined" || isLoaded.current) return;

    try {
      // AdSense push 호출
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      isLoaded.current = true;
    } catch (error) {
      console.warn("애드센스 광고를 로드하는 중 오류가 발생했거나 광고 차단이 활성화되어 있습니다.", error);
    }
  }, []);

  return (
    <div
      className="no-print"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 16px",
        background: "#f9f8ff", // 레이아웃 배경과 부드럽게 이어지는 옅은 보라빛 톤
        borderBottom: "1px solid #eae6ff",
        boxSizing: "border-box",
        // CLS(Cumulative Layout Shift) 방지를 위해 애드센스 디스플레이 수평 광고 규격 높이(최소 90px ~ 최대 100px)를 미리 확보
        minHeight: "114px", 
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
        {/* 생활계획표_디스플레이_수평형 광고 단위 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-9140923520326778"
          data-ad-slot="6604153550"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
