import { toPng } from 'html-to-image';

/**
 * 특정 DOM 요소를 이미지로 캡처하여 데이터 URL을 반환합니다.
 * html-to-image 엔진으로 복구하고 폰트 문제를 해결합니다.
 */
export async function exportAsImage(
  elementId: string,
  fileName: string,
): Promise<string | void> {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`ID가 ${elementId}인 요소를 찾을 수 없습니다.`);
    return;
  }

  try {
    // 1. 폰트 로드 대기
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // 2. 폰트 데이터를 Base64로 미리 로드 (폰트 유실 방지 핵심)
    let fontBase64 = "";
    try {
      const fontUrl = 'https://fonts.gstatic.com/s/gaegu/v21/TuGSUVB6Up9NU57nifw74sdtBk0x.ttf';
      const response = await fetch(fontUrl);
      const arrayBuffer = await response.arrayBuffer();
      fontBase64 = arrayBufferToBase64(arrayBuffer);
    } catch (fontError) {
      console.warn("폰트 데이터를 가져오는데 실패했습니다.", fontError);
    }

    const fontCSS = fontBase64 ? `
      @font-face {
        font-family: 'Gaegu';
        src: url(data:font/truetype;base64,${fontBase64}) format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      #${elementId} { font-family: 'Gaegu', cursive !important; }
      #${elementId} * { font-family: 'Gaegu', cursive !important; }
    ` : "";
    
    // 3. 렌더링 안정을 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 4. 이미지 생성
    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      fontEmbedCSS: fontCSS,
      filter: (node: any) => {
        if (node && node.classList) {
          if (node.classList.contains('no-print') || node.tagName === 'INS') {
            return false;
          }
        }
        return true;
      },
    });
    
    if (!dataUrl || dataUrl.length < 100) {
      throw new Error("이미지 생성 결과가 유효하지 않습니다.");
    }

    return dataUrl;

  } catch (e) {
    console.error('이미지 생성 중 오류 발생:', e);
    throw e;
  }
}

/**
 * ArrayBuffer를 Base64로 변환하는 헬퍼 함수
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function printElement(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
