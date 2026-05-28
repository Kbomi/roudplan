import { TabType } from '@/types'

export const TAB_CONFIG: Record<TabType, {
  label: string
  icon: string
  titleSuffix: string
  userNamePlaceholder: string
  defaultStickers: string[]
}> = {
  life_plan: {
    label: '생활계획표',
    icon: '🗓',
    titleSuffix: '의 생활계획표',
    userNamePlaceholder: '이름을 입력하세요',
    // 스티커 이모지는 public/stickers/ 폴더의 이미지로 교체 가능
    // 현재는 이모지 fallback 사용
    defaultStickers: ['📚', '⚽', '🎮', '🍚', '😴', '🏃', '🎨', '🎵', '🌟', '⭐', '🌈', '💕', '✏️', '🎒', '🖥️', '🎤'],
  },
  daily_record: {
    label: '하루기록표',
    icon: '📝',
    titleSuffix: '의 하루',
    userNamePlaceholder: '이름을 입력하세요',
    defaultStickers: ['☕', '💪', '📝', '🎬', '🛒', '😂', '🥲', '🔥', '✨', '💤', '🍜', '🚶', '🎧', '🛁', '🌙', '❤️'],
  },
  baby_feed: {
    label: '아기냠냠표',
    icon: '🍼',
    titleSuffix: '의 냠냠표',
    userNamePlaceholder: '아기 이름을 입력하세요',
    defaultStickers: ['🍼', '🥣', '😴', '🛁', '🚼', '🤱', '🍭', '🐣', '🌸', '👶', '💊', '🌙', '🐰', '🐻', '🌈', '⭐'],
  },
}

export const TAB_CATEGORIES: Record<TabType, Array<{ label: string; sticker: string; color: string }>> = {
  life_plan: [
    { label: '수면', sticker: '😴', color: '#D4BAFF' },
    { label: '식사', sticker: '🍚', color: '#BAFFC9' },
    { label: '공부', sticker: '📚', color: '#BAE1FF' },
    { label: '여가', sticker: '🎮', color: '#FFFFBA' },
    { label: '운동', sticker: '🏃', color: '#FFDFBA' },
    { label: '이동', sticker: '🚌', color: '#FFB3BA' },
  ],
  daily_record: [
    { label: '수면', sticker: '💤', color: '#D4BAFF' },
    { label: '식사', sticker: '🍜', color: '#BAFFC9' },
    { label: '일/공부', sticker: '💪', color: '#BAE1FF' },
    { label: '여가', sticker: '🎬', color: '#FFFFBA' },
    { label: '운동', sticker: '💪', color: '#FFDFBA' },
    { label: '카페/휴식', sticker: '☕', color: '#FFB3BA' },
  ],
  baby_feed: [
    { label: '수유', sticker: '🍼', color: '#FFB3BA' },
    { label: '이유식', sticker: '🥣', color: '#BAFFC9' },
    { label: '낮잠', sticker: '😴', color: '#D4BAFF' },
    { label: '목욕', sticker: '🛁', color: '#BAE1FF' },
    { label: '기저귀', sticker: '🚼', color: '#FFFFBA' },
    { label: '놀이', sticker: '🌸', color: '#FFDFBA' },
  ],
}
