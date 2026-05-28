export type TabType = "life_plan" | "daily_record" | "baby_feed";

export interface Segment {
  id: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  label: string;
  color: string;
  emoji: string;
}

export interface Sticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export interface AppState {
  tab: TabType;
  userName: string;
  segments: Segment[];
  stickers: Sticker[];
}
