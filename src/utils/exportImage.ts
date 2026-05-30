import { toPng } from 'html-to-image';

/**
 * 특정 DOM 요소를 이미지로 캡처하여 데이터 URL을 반환합니다.
 */
export async function exportAsImage(
  elementId: string,
  fileName: string,
): Promise<string | void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`ID가 ${elementId}인 요소를 찾을 수 없습니다.`);
    return;
  }

  try {
    // 1. 폰트 로드 대기 (Gaegu 폰트가 로드될 때까지 기다림)
    await document.fonts.ready;
    
    // 2. 폰트 데이터를 Base64로 미리 로드하여 캔버스 렌더링 시 누락 방지
    // (Google Fonts는 외부 도메인이라 캔버스 보안 정책에 걸릴 수 있으므로 임베딩이 안전함)
    let fontBase64 = "";
    try {
      const fontUrl = 'https://fonts.gstatic.com/s/gaegu/v21/TuGSUVB6Up9NU57nifw74sdtBk0x.ttf';
      const fontResponse = await fetch(fontUrl);
      if (fontResponse.ok) {
        const fontBuffer = await fontResponse.arrayBuffer();
        fontBase64 = arrayBufferToBase64(fontBuffer);
      }
    } catch (fontError) {
      console.warn("폰트 데이터를 불러오는데 실패했습니다. 기본 폰트로 렌더링합니다.", fontError);
    }

    // 3. 렌더링 안정을 위한 충분한 지연 시간 확보 (SVG 필터 및 이미지 로드 대기)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 4. html-to-image 옵션 설정
    const options: any = {
      cacheBust: true,
      pixelRatio: 2, // 고해상도 출력
      backgroundColor: '#ffffff',
      filter: (node: HTMLElement) => {
        // 인쇄/저장에서 제외할 요소 필터링
        if (node.classList && (node.classList.contains('no-print') || node.tagName === 'INS')) {
          return false;
        }
        return true;
      },
    };

    // 폰트 임베딩이 성공했다면 옵션에 추가
    if (fontBase64) {
      options.fontEmbedCSS = `
        @font-face {
          font-family: 'Gaegu';
          src: url('data:font/truetype;base64,${fontBase64}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        #${elementId} { font-family: 'Gaegu', cursive !important; }
      `;
    }

    // 5. 이미지 생성
    const dataUrl = await toPng(element, options);
    
    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error("이미지 생성 결과가 비어있습니다.");
    }

    return dataUrl;

  } catch (e) {
    console.error('이미지 생성 중 오류가 발생했습니다:', e);
    throw e;
  }
}

/**
 * ArrayBuffer를 Base64 문자열로 변환하는 헬퍼 함수
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

/**
 * 윈도우 인쇄 창을 실행합니다.
 */
export function printElement(): void {
  window.print();
}
