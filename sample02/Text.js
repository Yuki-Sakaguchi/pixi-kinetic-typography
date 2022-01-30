/**
 * テキストをcanvasに描画するクラス
 * テキストはパーティクルの集合体でつくるので、dosPosでパーティクルの位置を作って返す
 */
export class Text {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  setText(str, density, stageWidth, stageHeight) {
    this.canvas.width = stageWidth; 
    this.canvas.height = stageHeight; 

    const myText = str;
    const fontWidht = 500;
    const fontSize = 200;
    const fontName = 'Hind';

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidht} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
    this.ctx.textBaseline = 'middle';
    const fontPos = this.ctx.measureText(myText);
    this.ctx.fillText(
      myText,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent + fontPos.actualBoundingBoxDescent + ((stageHeight - fontSize) / 2)
    );

    return this.dotPos(density, stageWidth, stageHeight);
  }

  dotPos(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = (i % 2) == 0;
      width = 0;
      if (slide == 1) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        pixel = imageData[((width + (height * stageWidth)) * 4) - 1]; // Uint8ClampedArray だからこういう計算色でピクセルの情報を取ってきている https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

        // 色があればパーティクルとして配置するために位置を保存する
        if (pixel != 0 && 
          width > 0 && 
          width < stageWidth && 
          height > 0 && 
          height < stageHeight
        ) {
          particles.push({
            x: width,
            y: height,
          });
        }
      }
    }
    return particles;
  }
}
