import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "생활계획표 — 손그림 감성 생활계획표",
  description:
    "귀여운 손그림 스타일로 하루를 기록하고 계획하세요. 생활계획표, 하루기록표, 아기냠냠표를 이미지로 저장하고 공유해보세요.",
  openGraph: {
    title: "생활계획표",
    description: "손그림 감성 생활계획표 만들기",
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
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
