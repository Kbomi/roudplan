import { Metadata } from "next";
import PlanEditor from "@/components/Editor/PlanEditor";

// 하루기록표 페이지를 위한 메타데이터 설정 (SEO 최적화)
export const metadata: Metadata = {
  title: "하루기록표 만들기 | 하루시계",
  description:
    "오늘 하루를 시계 모양으로 기록해보세요. 나의 하루를 한눈에 돌아보고 귀여운 이미지로 SNS에 공유해요.",
  keywords: [
    "하루기록표",
    "하루기록",
    "일과기록",
    "시간표 기록",
    "다이어리 꾸미기",
    "오늘의 하루",
  ],
  openGraph: {
    title: "나의 오늘 하루 기록하기 📝",
    description:
      "갓생러인지 휴식왕인지 확인해봐요. 오늘 하루를 시계로 기록하고 공유!",
    type: "website",
  },
};

export default function DailyRecordPage() {
  return <PlanEditor tab="daily_record" />;
}
