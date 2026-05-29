import type { Metadata } from "next";
import "./globals.css";
import TabNav from "@/components/Header/TabNav";

export const metadata: Metadata = {
  title: "하루시계 — 손그림 감성 생활계획표",
  description:
    "귀여운 손그림 스타일 시계로 하루를 계획하고 기록해보세요. 생활계획표, 하루기록표, 아기냠냠표를 무료로 만들고 이미지로 저장할 수 있어요.",
  openGraph: {
    title: "나만의 생활계획표 만들기 🗓",
    description:
      "손그림 감성 시계로 하루를 계획해요. 생활계획표, 하루기록표, 아기냠냠표를 무료로 만들고 바로 저장!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gaegu&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          background: "#f9f8ff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 공통 헤더 탭 네비게이션 */}
        <TabNav />
        {children}
      </body>
    </html>
  );
}
