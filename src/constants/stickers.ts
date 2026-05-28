// 스티커 세트 — 나중에 이 파일만 수정하면 됩니다
// emoji 대신 이미지 경로로 교체 시: { id, src: '/stickers/star.png', label }
import { TabType } from '@/types';

export interface StickerDef {
  id: string;
  emoji: string;
  label: string;
}

export const STICKER_SETS: Record<TabType, StickerDef[]> = {
  life_plan: [
    { id: 'lp1',  emoji: '📚', label: '공부' },
    { id: 'lp2',  emoji: '⚽', label: '운동' },
    { id: 'lp3',  emoji: '🎮', label: '게임' },
    { id: 'lp4',  emoji: '🍚', label: '식사' },
    { id: 'lp5',  emoji: '😴', label: '수면' },
    { id: 'lp6',  emoji: '🏃', label: '달리기' },
    { id: 'lp7',  emoji: '🎨', label: '미술' },
    { id: 'lp8',  emoji: '🎵', label: '음악' },
    { id: 'lp9',  emoji: '🌟', label: '별' },
    { id: 'lp10', emoji: '⭐', label: '스타' },
    { id: 'lp11', emoji: '🌈', label: '무지개' },
    { id: 'lp12', emoji: '💕', label: '하트' },
    { id: 'lp13', emoji: '🐰', label: '토끼' },
    { id: 'lp14', emoji: '🌸', label: '꽃' },
    { id: 'lp15', emoji: '🎀', label: '리본' },
    { id: 'lp16', emoji: '✏️', label: '연필' },
  ],
  daily_record: [
    { id: 'dr1',  emoji: '☕', label: '커피' },
    { id: 'dr2',  emoji: '💪', label: '운동' },
    { id: 'dr3',  emoji: '📝', label: '메모' },
    { id: 'dr4',  emoji: '🎬', label: '영화' },
    { id: 'dr5',  emoji: '😂', label: '웃음' },
    { id: 'dr6',  emoji: '🥲', label: '눈물' },
    { id: 'dr7',  emoji: '🔥', label: '열정' },
    { id: 'dr8',  emoji: '✨', label: '빛남' },
    { id: 'dr9',  emoji: '💤', label: '수면' },
    { id: 'dr10', emoji: '🍜', label: '식사' },
    { id: 'dr11', emoji: '🚶', label: '산책' },
    { id: 'dr12', emoji: '🛒', label: '쇼핑' },
    { id: 'dr13', emoji: '🌙', label: '달' },
    { id: 'dr14', emoji: '🌞', label: '해' },
    { id: 'dr15', emoji: '💻', label: '컴퓨터' },
    { id: 'dr16', emoji: '🎧', label: '음악' },
  ],
  baby_feed: [
    { id: 'bf1',  emoji: '🍼', label: '수유' },
    { id: 'bf2',  emoji: '🥣', label: '이유식' },
    { id: 'bf3',  emoji: '😴', label: '낮잠' },
    { id: 'bf4',  emoji: '🛁', label: '목욕' },
    { id: 'bf5',  emoji: '🚼', label: '기저귀' },
    { id: 'bf6',  emoji: '🤱', label: '수유' },
    { id: 'bf7',  emoji: '🍭', label: '간식' },
    { id: 'bf8',  emoji: '🐣', label: '병아리' },
    { id: 'bf9',  emoji: '🌸', label: '꽃' },
    { id: 'bf10', emoji: '👶', label: '아기' },
    { id: 'bf11', emoji: '💊', label: '약' },
    { id: 'bf12', emoji: '🌙', label: '밤' },
    { id: 'bf13', emoji: '🐻', label: '곰' },
    { id: 'bf14', emoji: '🎠', label: '놀이' },
    { id: 'bf15', emoji: '💕', label: '하트' },
    { id: 'bf16', emoji: '🌟', label: '별' },
  ],
};
