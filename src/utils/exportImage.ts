export async function exportAsImage(
  elementId: string,
  fileName: string,
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // dom-to-image-more dynamic import
    const domToImage = (await import("dom-to-image-more")).default;
    const dataUrl = await domToImage.toPng(element, {
      scale: 2,
      bgcolor: "#ffffff",
      style: {
        fontFamily: '"Gaegu", cursive',
      },
    });

    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  } catch (e) {
    console.error("이미지 저장 실패:", e);
    alert("이미지 저장에 실패했어요. 다시 시도해주세요.");
  }
}

export function printElement(): void {
  window.print();
}
