import { clamp } from "lodash";
import V2 from "../utils/V2";

export default class MyPic {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  x: number;
  y: number;
  borderRadius: number;
  image: HTMLImageElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    imgSrc: string,
    width: number,
    height: number,
    borderRadius: number
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.borderRadius = borderRadius;
    this.onResize();

    const img = new Image();
    img.addEventListener("load", () => {
      this.image = img;
    });
    img.src = imgSrc;
  }

  onResize() {
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height / 2 - this.height / 2;
  }

  draw() {
    if (!this.image) return;

    this.ctx.save();
    this.prepareRoundedSquare();
    this.drawImageOnRoundedSquare();
    this.ctx.restore();
    this.drawTextUnderImage();
  }

  ////https://codepen.io/movii/pen/QBgqeY
  private prepareRoundedSquare() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + this.borderRadius, this.y);
    this.ctx.lineTo(this.x + this.width - this.borderRadius, this.y);
    this.ctx.quadraticCurveTo(
      this.x + this.width,
      this.y,
      this.x + this.width,
      this.y + this.borderRadius
    );
    this.ctx.lineTo(
      this.x + this.width,
      this.y + this.height - this.borderRadius
    );
    this.ctx.quadraticCurveTo(
      this.x + this.width,
      this.y + this.height,
      this.x + this.width - this.borderRadius,
      this.y + this.height
    );
    this.ctx.lineTo(this.x + this.borderRadius, this.y + this.height);
    this.ctx.quadraticCurveTo(
      this.x,
      this.y + this.height,
      this.x,
      this.y + this.height - this.borderRadius
    );
    this.ctx.lineTo(this.x, this.y + this.borderRadius);
    this.ctx.quadraticCurveTo(
      this.x,
      this.y,
      this.x + this.borderRadius,
      this.y
    );
    this.ctx.closePath();
  }

  private drawImageOnRoundedSquare() {
    this.ctx.strokeStyle = "#2465D3";
    this.ctx.lineWidth = 6;
    this.ctx.stroke();
    this.ctx.clip();
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  private drawTextUnderImage() {
    this.ctx.font = "bold 28px Arial";
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 3;
    this.ctx.strokeText(
      "It's a feature",
      this.x - 15,
      this.y + this.height + 30
    );
    this.ctx.fillStyle = "#2465D3";
    this.ctx.fillText("It's a feature", this.x - 15, this.y + this.height + 30);
  }

  dist(x: number, y: number) {
    const closestPointOnRect = new V2(
      clamp(x, this.x, this.x + this.width),
      clamp(y, this.y, this.y + this.height)
    );
    return new V2(x, y).dist(closestPointOnRect);
  }
}
