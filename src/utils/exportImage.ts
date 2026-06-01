import { domToPng, domToBlob, domToCanvas } from 'modern-screenshot';

/**
 * 특정 DOM 요소를 이미지로 캡처하여 데이터 URL(PNG)을 반환합니다.
 */
export async function exportAsImage(
  elementId: string,
  fileName: string,
): Promise<string | void> {
  const result = await capture(elementId, 'png');
  return result as string;
}

/**
 * 특정 DOM 요소를 Blob으로 캡처합니다.
 */
export async function exportAsBlob(
  elementId: string,
): Promise<Blob | void> {
  const result = await capture(elementId, 'blob');
  return result as Blob;
}

async function capture(elementId: string, type: 'png' | 'blob'): Promise<string | Blob | void> {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`ID가 ${elementId}인 요소를 찾을 수 없습니다.`);
    return;
  }

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // iOS Safari 안정성을 위해 충분한 대기 시간 확보
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // iOS 기기(Safari, Chrome 등 모든 브라우저) 여부 확인
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    const options: any = {
      scale: 2,
      backgroundColor: '#ffffff',
      filter: (node: Node) => {
        if (node instanceof HTMLElement && node.classList) {
          if (node.classList.contains('no-print') || node.tagName === 'INS') {
            return false;
          }
        }
        return true;
      },
      features: {
        fixSvgXmlDecode: true,
      },
      // iOS 환경에서 이미지 디코딩 오류 방지를 위한 간격 설정
      drawImageInterval: isIOS ? 500 : 100,
    };

    if (isIOS) {
      // iOS(WebKit 계열)는 Canvas를 먼저 생성하고 거기서 데이터를 뽑는 것이 훨씬 안정적임
      const canvas = await domToCanvas(element, options);
      if (type === 'png') {
        return canvas.toDataURL('image/png');
      } else {
        return new Promise((resolve) => {
          canvas.toBlob((blob) => resolve(blob || undefined), 'image/png');
        });
      }
    }

    if (type === 'png') {
      return await domToPng(element, options);
    } else {
      return await domToBlob(element, options);
    }

  } catch (e) {
    console.error('이미지 생성 중 오류 발생:', e);
    throw e;
  }
}

export function printElement(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
