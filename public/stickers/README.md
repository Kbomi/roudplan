# 스티커 교체 방법

## 이모지 스티커 변경
`src/constants/stickers.ts` 파일을 열어서 emoji 값을 변경하세요.

## 이미지 스티커로 교체하고 싶을 때
1. 이 폴더에 이미지 파일 추가 (예: star.png, heart.png)
2. `src/constants/stickers.ts`에서 StickerDef 타입에 src 필드 추가
3. StickerTray, StickerOverlay 컴포넌트에서 img 태그로 렌더링 변경

예시:
```ts
export interface StickerDef {
  id: string;
  emoji?: string;      // 이모지 방식
  src?: string;        // 이미지 방식: '/stickers/star.png'
  label: string;
}
```
