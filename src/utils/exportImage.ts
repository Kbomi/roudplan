import { Sticker } from "@/types";

export async function exportAsImage(
  elementId: string,
  fileName: string,
  stickers: Sticker[],
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // 1. Gaegu 폰트를 fetch로 가져와 Base64로 변환
    const fontUrl = 'https://fonts.gstatic.com/s/gaegu/v21/TuGSUVB6Up9NU57nifw74sdtBk0x.ttf';
    const fontResponse = await fetch(fontUrl);
    const fontBuffer = await fontResponse.arrayBuffer();
    
    // Uint8Array를 처리할 때 효율적인 방식 사용
    let binary = '';
    const bytes = new Uint8Array(fontBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const fontBase64 = btoa(binary);

    // 2. SVG 요소를 찾아 문자열로 변환
    const svgElement = element.querySelector('svg');
    if (!svgElement) throw new Error('SVG 요소를 찾을 수 없습니다.');

    const width = svgElement.viewBox.baseVal.width || 500;
    const height = svgElement.viewBox.baseVal.height || 540;
    
    // 실제 화면에서의 크기 (좌표 보정을 위해 필요)
    const elementRect = element.getBoundingClientRect();
    const domWidth = elementRect.width;
    const domHeight = elementRect.height;
    
    // DOM 좌표를 SVG 좌표로 변환하는 비율
    const scaleX = width / domWidth;
    const scaleY = height / domHeight;

    // SVG 복사 및 스타일 주입
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    const styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    styleElement.innerHTML = `
      @font-face {
        font-family: 'Gaegu';
        src: url('data:font/truetype;base64,${fontBase64}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      text, tspan { font-family: 'Gaegu', cursive !important; }
    `;
    
    let defs = svgClone.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svgClone.insertBefore(defs, svgClone.firstChild);
    }
    defs.appendChild(styleElement);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    // 3. Canvas에 그리기 (scale: 2)
    const exportScale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = width * exportScale;
    canvas.height = height * exportScale;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas Context를 생성할 수 없습니다.');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);

    // 4. 스티커 합성 (동적으로 위치 보정)
    // StickerOverlay의 inset: 12 값 고려 (CSS 픽셀 단위)
    const insetOffset = 12;

    for (const s of stickers) {
      // 1) DOM 상의 절대 위치 (CSS px)
      const domX = s.x + insetOffset;
      const domY = s.y + insetOffset;
      
      // 2) SVG 좌표계로 변환 (500x540 기준)
      const svgX = domX * scaleX;
      const svgY = domY * scaleY;
      const svgSize = s.size * scaleX; // 너비 비율 기준으로 크기 조정

      // 3) 최종 Canvas 좌표 (exportScale: 2 적용)
      const finalX = svgX * exportScale;
      const finalY = svgY * exportScale;
      const finalSize = svgSize * exportScale;

      ctx.save();
      ctx.translate(finalX, finalY);
      if (s.rotation) {
        ctx.rotate((s.rotation * Math.PI) / 180);
      }

      if (s.src) {
        // 이미지 스티커
        const imgSticker = new Image();
        imgSticker.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          imgSticker.onload = resolve;
          imgSticker.onerror = reject;
          imgSticker.src = s.src!;
        });
        ctx.drawImage(imgSticker, -finalSize / 2, -finalSize / 2, finalSize, finalSize);
      } else if (s.emoji) {
        // 이모지 스티커
        ctx.font = `${finalSize * 0.75}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.emoji, 0, 0);
      }
      ctx.restore();
    }

    // 5. 다운로드
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();

  } catch (e) {
    console.error('이미지 저장 실패:', e);
    throw e;
  }
}

export function printElement(): void {
  window.print();
}
