declare module 'dom-to-image-more' {
  interface Options {
    scale?: number;
    bgcolor?: string;
    style?: Record<string, string>;
    width?: number;
    height?: number;
  }
  const domToImage: {
    toPng(node: HTMLElement, options?: Options): Promise<string>;
    toJpeg(node: HTMLElement, options?: Options): Promise<string>;
    toSvg(node: HTMLElement, options?: Options): Promise<string>;
    toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
  };
  export default domToImage;
}
