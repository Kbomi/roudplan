import { Metadata } from "next";
import PlanEditor from "@/components/Editor/PlanEditor";

// 생활계획표 페이지를 위한 메타데이터 설정 (SEO 최적화)
export const metadata: Metadata = {
  title: "생활계획표 만들기 | 하루시계",
  description:
    "하루 24시간을 예쁜 시계 모양으로 계획해보세요. 손그림 감성의 귀여운 생활계획표를 만들고 이미지로 저장하거나 프린트할 수 있어요.",
  keywords: [
    "생활계획표",
    "시간표 만들기",
    "방학계획표",
    "일간계획",
    "손그림 계획표",
  ],
  openGraph: {
    title: "나만의 생활계획표 만들기 🗓",
    description: "손그림 감성 시계로 하루를 계획해요. 무료로 만들고 바로 저장!",
    type: "website",
  },
};

export default function LifePlanPage() {
  return <PlanEditor tab="life_plan" />;
}
