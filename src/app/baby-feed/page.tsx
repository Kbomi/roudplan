import { Metadata } from "next";
import PlanEditor from "@/components/Editor/PlanEditor";

// 아기냠냠표 페이지를 위한 메타데이터 설정 (SEO 최적화)
export const metadata: Metadata = {
  title: "아기냠냠표 만들기 | 하루시계",
  description:
    "아기의 수유, 이유식, 낮잠 등 하루 일과를 귀여운 시계 모양으로 기록해보세요. 육아 중인 부모님을 위한 무료 아기 일과 기록표예요.",
  keywords: [
    "아기냠냠표",
    "이유식 계획표",
    "수유 기록",
    "아기 식단표",
    "육아 일기",
    "이유식 기록",
  ],
  openGraph: {
    title: "아기 하루 일과 기록하기 🍼",
    description:
      "수유, 낮잠, 이유식을 한눈에! 귀여운 냠냠표 만들고 육아 일기 남겨요.",
    type: "website",
  },
};

export default function BabyFeedPage() {
  return <PlanEditor tab="baby_feed" />;
}
