"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const isLoaded = useRef(false);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // DOM 렌더링이 확실히 끝나고 Next.js의 afterInteractive 스크립트 로드 레이스 컨디션을 해소하기 위해
    // 250ms의 안전 유예 지연(Timeout)을 준 뒤 광고 초기화를 실행합니다.
    const timer = setTimeout(() => {
      const insElement = insRef.current;
      if (!insElement) return;

      // 이미 애드센스에 의해 초기화되었거나 진행 중인 경우 중복 push를 완전히 무시하여 안전성을 지킵니다.
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
          "애드센스 광고 초기화 중 예외가 발생했습니다. 광고 차단 프로그램이 활성화되어 있을 수 있습니다.",
          error
        );
      }
    }, 250);

    return () => clearTimeout(timer);
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
        // CLS(Cumulative Layout Shift) 방지를 위해 애드센스 디스플레이 수평 광고 규격 높이를 미리 확보
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
          ref={insRef} // ref를 통해 실제 DOM 노드를 안전하게 감시 및 추적합니다.
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
