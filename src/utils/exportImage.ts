import { domToPng } from 'modern-screenshot';

/**
 * 특정 DOM 요소를 이미지로 캡처하여 데이터 URL을 반환합니다.
 * iOS Safari 호환성을 위해 modern-screenshot 엔진을 사용합니다.
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
    // 1. 폰트 로드 대기 (브라우저 API 사용)
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // 2. 렌더링 안정을 위한 지연
    // iOS Safari에서 폰트나 이미지가 유실되는 것을 방지하기 위해 약간의 여유를 둡니다.
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 3. 이미지 생성 (modern-screenshot)
    // 이 라이브러리는 Safari의 foreignObject 버그를 더 잘 우회합니다.
    const dataUrl = await domToPng(element, {
      scale: 2, // 결과물 품질 (pixelRatio와 유사)
      backgroundColor: '#ffffff',
      // filter: 출력에서 제외할 요소 처리
      filter: (node: Node) => {
        if (node instanceof HTMLElement && node.classList) {
          if (node.classList.contains('no-print') || node.tagName === 'INS') {
            return false;
          }
        }
        return true;
      },
      // iOS Safari의 안정성을 위한 추가 옵션 (기본값들이지만 명시적으로 확인)
      features: {
        fixSvgXmlDecode: true, // Safari 이미지 디코딩 버그 수정
      },
    });
    
    if (!dataUrl || dataUrl.length < 100) {
      throw new Error("이미지 생성 결과가 유효하지 않습니다.");
    }

    return dataUrl;

  } catch (e) {
    console.error('이미지 생성 중 오류 발생:', e);
    // iOS Safari에서 간혹 발생하는 에러 핸들링
    if (e instanceof Error && e.message.includes('Canvas')) {
      throw new Error("이미지 크기가 너무 커서 저장할 수 없습니다. 잠시 후 다시 시도해 주세요.");
    }
    throw e;
  }
}

export function printElement(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
