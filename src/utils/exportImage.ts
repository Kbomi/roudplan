import { toPng } from 'html-to-image';

export async function exportAsImage(
  elementId: string,
  fileName: string,
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // 1. 폰트 로드 대기 및 Base64 변환 (html-to-image의 가장 확실한 폰트 적용 방법)
    await document.fonts.ready;
    
    const fontUrl = 'https://fonts.gstatic.com/s/gaegu/v21/TuGSUVB6Up9NU57nifw74sdtBk0x.ttf';
    const fontResponse = await fetch(fontUrl);
    const fontBuffer = await fontResponse.arrayBuffer();
    
    let binary = '';
    const bytes = new Uint8Array(fontBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const fontBase64 = btoa(binary);

    // 2. 렌더링 안정을 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. html-to-image 생성
    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      fontEmbedCSS: `
        @font-face {
          font-family: 'Gaegu';
          src: url('data:font/truetype;base64,${fontBase64}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        * { font-family: 'Gaegu', cursive !important; }
      `,
    });

    // 4. 다운로드
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
