import { TabType } from "@/types";

export interface Category {
  emoji: string;
  label: string;
  defaultColor: string;
}

export const CATEGORIES: Record<TabType, Category[]> = {
  life_plan: [
    { emoji: "😴", label: "수면", defaultColor: "#BAE1FF" },
    { emoji: "🍚", label: "식사", defaultColor: "#FFDFBA" },
    { emoji: "📚", label: "공부", defaultColor: "#D4BAFF" },
    { emoji: "🎮", label: "여가", defaultColor: "#FFD4BA" },
    { emoji: "🏃", label: "운동", defaultColor: "#FF5C8A" },
    { emoji: "🚌", label: "이동", defaultColor: "#3DBD6B" },
  ],
  daily_record: [
    { emoji: "😴", label: "수면", defaultColor: "#BAE1FF" },
    { emoji: "🍚", label: "식사", defaultColor: "#FFDFBA" },
    { emoji: "💼", label: "일/공부", defaultColor: "#D4BAFF" },
    { emoji: "🎮", label: "여가", defaultColor: "#FFD4BA" },
    { emoji: "🏃", label: "운동", defaultColor: "#FF5C8A" },
    { emoji: "☕", label: "카페/휴식", defaultColor: "#FFE4BA" },
  ],
  baby_feed: [
    { emoji: "🍼", label: "수유", defaultColor: "#FFB3BA" },
    { emoji: "🥣", label: "이유식", defaultColor: "#FFDFBA" },
    { emoji: "😴", label: "낮잠", defaultColor: "#BAE1FF" },
    { emoji: "😴", label: "밤잠", defaultColor: "#4DA6FF" },
    { emoji: "🛁", label: "목욕", defaultColor: "#FFDFBA" },
    { emoji: "🚼", label: "기저귀", defaultColor: "#D4BAFF" },
    { emoji: "🤱", label: "놀이", defaultColor: "#FFD4BA" },
  ],
};

export const TAB_LABELS: Record<TabType, string> = {
  life_plan: "생활계획표",
  daily_record: "하루기록표",
  baby_feed: "아기냠냠표",
};

export const TAB_EMOJIS: Record<TabType, string> = {
  life_plan: "🗓",
  daily_record: "📝",
  baby_feed: "🍼",
};

export const TAB_TITLE_SUFFIX: Record<TabType, string> = {
  life_plan: "의 생활계획표",
  daily_record: "의 하루",
  baby_feed: "의 냠냠표",
};
