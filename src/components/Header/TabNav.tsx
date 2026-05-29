"use client";
import { TabType } from "@/types";
import { TAB_LABELS, TAB_EMOJIS } from "@/constants/categories";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 탭과 URL 경로 매핑 정보
const TAB_ROUTES: { [key in TabType]: string } = {
  life_plan: "/life-plan",
  daily_record: "/daily-record",
  baby_feed: "/baby-feed",
};

// URL 경로와 탭 타입 역매핑 정보
const PATH_TO_TAB: { [key: string]: TabType } = {
  "/life-plan": "life_plan",
  "/daily-record": "daily_record",
  "/baby-feed": "baby_feed",
};

export default function TabNav() {
  const pathname = usePathname();
  // 현재 URL 경로를 파악하여 활성화된 탭 설정 (매칭되지 않으면 기본값 'life_plan')
  const activeTab = PATH_TO_TAB[pathname] || "life_plan";

  return (
    <header
      className="header no-print"
      style={{
        background: "white",
        borderBottom: "1px solid #f0f0f0",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 60,
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* 로고 */}
      <Link
        href="https://kko-kkuri.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
      </Link>

      {/* 탭 네비게이션 - 접근성 향상을 위해 Link 태그(a태그) 사용 */}
      <nav style={{ display: "flex", gap: 4 }}>
        {(Object.keys(TAB_ROUTES) as TabType[]).map((tab) => {
          const route = TAB_ROUTES[tab];
          const isActive = activeTab === tab;
          return (
            <Link
              key={tab}
              href={route}
              className="tab-btn"
              // 웹 접근성(WA) 향상을 위해 현재 활성화된 페이지 링크에 aria-current="page" 속성 부여
              aria-current={isActive ? "page" : undefined}
              style={{
                display: "inline-block",
                textDecoration: "none",
                padding: "7px 18px",
                borderRadius: 24,
                border: isActive
                  ? "1.5px solid #7F77DD"
                  : "1.5px solid transparent",
                background: isActive ? "#EEEDFE" : "transparent",
                color: isActive ? "#534AB7" : "#999",
                fontFamily: '"Gaegu", cursive',
                fontSize: 17,
                cursor: "pointer",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              {TAB_EMOJIS[tab]} {TAB_LABELS[tab]}
            </Link>
          );
        })}
      </nav>

      {/* 모바일 대응 반응형 CSS */}
      <style>{`
        @media (max-width: 500px) {
          .tab-btn {
            font-size: 15px !important;
            padding: 6px 14px !important;
          }
        }
      `}</style>
    </header>
  );
}
