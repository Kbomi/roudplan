// 스티커 세트 — 나중에 이 파일만 수정하면 됩니다
// emoji 대신 이미지 경로로 교체 시: { id, src: '/stickers/star.png', label }
import { TabType } from '@/types';

export interface StickerDef {
  id: string;
  emoji?: string;
  src?: string;
  label: string;
}

export const STICKER_SETS: Record<TabType, StickerDef[]> = {
  life_plan: [
    { id: 'lp1',  src: '/stickers/study.png', label: '공부' },
    { id: 'lp2',  src: '/stickers/run.png', label: '운동' },
    { id: 'lp3',  src: '/stickers/tv.png', label: '게임' },
    { id: 'lp4',  src: '/stickers/meal.png', label: '식사' },
    { id: 'lp5',  src: '/stickers/sleep.png', label: '수면' },
    { id: 'lp6',  src: '/stickers/run.png', label: '달리기' },
    { id: 'lp7',  src: '/stickers/art.png', label: '미술' },
    { id: 'lp8',  src: '/stickers/music.png', label: '음악' },
    { id: 'lp9',  src: '/stickers/star.png', label: '별' },
    { id: 'lp10', src: '/stickers/spark.png', label: '스타' },
    { id: 'lp11', src: '/stickers/rainbow.png', label: '무지개' },
    { id: 'lp12', src: '/stickers/heart.png', label: '하트' },
    { id: 'lp13', src: '/stickers/bear_1.png', label: '곰' },
    { id: 'lp14', src: '/stickers/flower_1.png', label: '꽃' },
    { id: 'lp15', src: '/stickers/ribbon.png', label: '리본' },
    { id: 'lp16', src: '/stickers/pencil.png', label: '연필' },
  ],
  daily_record: [
    { id: 'dr1',  src: '/stickers/coffee.png', label: '커피' },
    { id: 'dr2',  src: '/stickers/run.png', label: '운동' },
    { id: 'dr3',  src: '/stickers/pencil.png', label: '메모' },
    { id: 'dr4',  src: '/stickers/movie.png', label: '영화' },
    { id: 'dr5',  src: '/stickers/icecream.png', label: '간식' },
    { id: 'dr6',  src: '/stickers/popcorn.png', label: '팝콘' },
    { id: 'dr7',  src: '/stickers/spark.png', label: '열정' },
    { id: 'dr8',  src: '/stickers/sun.png', label: '빛남' },
    { id: 'dr9',  src: '/stickers/sleep.png', label: '수면' },
    { id: 'dr10', src: '/stickers/meal.png', label: '식사' },
    { id: 'dr11', src: '/stickers/tree.png', label: '산책' },
    { id: 'dr12', src: '/stickers/candy.png', label: '쇼핑' },
    { id: 'dr13', src: '/stickers/moon.png', label: '달' },
    { id: 'dr14', src: '/stickers/sun.png', label: '해' },
    { id: 'dr15', src: '/stickers/notbook.png', label: '컴퓨터' },
    { id: 'dr16', src: '/stickers/headset.png', label: '음악' },
  ],
  baby_feed: [
    { id: 'bf1',  src: '/stickers/milk.png', label: '수유' },
    { id: 'bf2',  src: '/stickers/meal_2.png', label: '이유식' },
    { id: 'bf3',  src: '/stickers/sleep_clock.png', label: '낮잠' },
    { id: 'bf4',  src: '/stickers/bath.png', label: '목욕' },
    { id: 'bf5',  src: '/stickers/diaper.png', label: '기저귀' },
    { id: 'bf6',  src: '/stickers/milk_2.png', label: '수유' },
    { id: 'bf7',  src: '/stickers/candy.png', label: '간식' },
    { id: 'bf8',  src: '/stickers/duck.png', label: '병아리' },
    { id: 'bf9',  src: '/stickers/flower_2.png', label: '꽃' },
    { id: 'bf10', src: '/stickers/bear_2.png', label: '아기' },
    { id: 'bf11', src: '/stickers/band.png', label: '약' },
    { id: 'bf12', src: '/stickers/moon_2.png', label: '밤' },
    { id: 'bf13', src: '/stickers/bear_1.png', label: '곰' },
    { id: 'bf14', src: '/stickers/stroller.png', label: '놀이' },
    { id: 'bf15', src: '/stickers/heart_2.png', label: '하트' },
    { id: 'bf16', src: '/stickers/spark.png', label: '별' },
  ],
};
