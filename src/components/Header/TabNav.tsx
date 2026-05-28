"use client";
import { TabType } from "@/types";
import { TAB_LABELS, TAB_EMOJIS } from "@/constants/categories";
import Image from "next/image";
import Link from "next/link";

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: TabType[] = ["life_plan", "daily_record", "baby_feed"];

export default function TabNav({ activeTab, onTabChange }: Props) {
  return (
    <header
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

      {/* 탭 */}
      <nav style={{ display: "flex", gap: 4 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className="tab-btn"
            onClick={() => onTabChange(tab)}
            style={{
              padding: "7px 18px",
              borderRadius: 24,
              border:
                activeTab === tab
                  ? "1.5px solid #7F77DD"
                  : "1.5px solid transparent",
              background: activeTab === tab ? "#EEEDFE" : "transparent",
              color: activeTab === tab ? "#534AB7" : "#999",
              fontFamily: '"Gaegu", cursive',
              fontSize: 15,
              cursor: "pointer",
              fontWeight: activeTab === tab ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {TAB_EMOJIS[tab]} {TAB_LABELS[tab]}
          </button>
        ))}
      </nav>

      {/* 프린트 CSS */}
      <style>{`
        @media (max-width: 500px) {
          .tab-btn {
            font-size: 13px !important;
            padding: 6px 14px !important;
          }
        }
      `}</style>
    </header>
  );
}
