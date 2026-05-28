import { Segment, TabType } from "@/types";
import { totalMinutes } from "./clockMath";

export function generateComment(tab: TabType, segments: Segment[]): string {
  if (tab === "life_plan") return "";

  if (tab === "baby_feed") {
    const feedCount = segments.filter((s) =>
      // s.emoji === '🍼' || s.emoji === '🤱' || s.label.includes('수유')
      s.label.includes("수유"),
    ).length;
    const sleepMins = segments
      // .filter(s => s.emoji === '😴' || s.label.includes('낮잠') || s.label.includes('수면'))
      .filter((s) => s.label.includes("낮잠") || s.label.includes("수면"))
      .reduce(
        (sum, s) =>
          sum +
          totalMinutes(s.startHour, s.startMinute, s.endHour, s.endMinute),
        0,
      );
    const sleepH = Math.round((sleepMins / 60) * 10) / 10;
    return `오늘 수유 ${feedCount}회 · 수면 ${sleepH}시간 🍼`;
  }

  // daily_record
  const sleepMins = segments
    // .filter(s => s.label.includes('수면') || s.emoji === '😴' || s.emoji === '💤')
    .filter((s) => s.label.includes("수면"))
    .reduce(
      (sum, s) =>
        sum + totalMinutes(s.startHour, s.startMinute, s.endHour, s.endMinute),
      0,
    );

  const workMins = segments
    .filter(
      (s) => s.label.includes("일") || s.label.includes("공부"),
      // s.emoji === "💼" ||
      // s.emoji === "📚",
    )
    .reduce(
      (sum, s) =>
        sum + totalMinutes(s.startHour, s.startMinute, s.endHour, s.endMinute),
      0,
    );

  const leisureMins = segments
    .filter(
      // (s) => s.label.includes("여가") || s.emoji === "🎮" || s.emoji === "🎬",
      (s) => s.label.includes("여가"),
    )
    .reduce(
      (sum, s) =>
        sum + totalMinutes(s.startHour, s.startMinute, s.endHour, s.endMinute),
      0,
    );

  const exerciseMins = segments
    .filter(
      // (s) => s.label.includes("운동") || s.emoji === "🏃" || s.emoji === "💪",
      (s) => s.label.includes("운동"),
    )
    .reduce(
      (sum, s) =>
        sum + totalMinutes(s.startHour, s.startMinute, s.endHour, s.endMinute),
      0,
    );

  if (workMins >= 8 * 60) return "갓생러 인증 🔥 오늘 하루도 수고했어요!";
  if (sleepMins >= 8 * 60) return "오늘 잘 쉬었네요 🌙 내일도 힘내요!";
  if (exerciseMins >= 60) return "건강한 하루였네요 💪";
  if (leisureMins >= 6 * 60) return "오늘은 온전히 나를 위한 하루 ✨";
  return "오늘도 나름대로 열심히 살았어요 😊";
}
