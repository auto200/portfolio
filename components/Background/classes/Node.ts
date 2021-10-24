import { NodeData, NodeSize } from "@utils/nodesData";
import V2 from "@utils/V2";
import { random } from "lodash";

export default class Node {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  info: NodeData;
  borderColor: string;
  pos: V2;
  private baseSize: number;
  size: number;
  private baseVel: V2;
  private vel: V2;
  image: HTMLImageElement;
  radius: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    info: NodeData,
    borderColor: string
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.info = info;
    this.borderColor = borderColor;
    this.baseSize = this.getSizeValue(info.size);
    this.updateSize(this.baseSize);

    this.baseVel = this.getRandomVelocityBySize(this.info.size);
    this.vel = this.baseVel;

    const img = new Image();
    img.addEventListener("load", () => {
      this.image = img;
    });
    img.src = this.info.src;
    this.initPos();
  }

  update() {
    this.pos = this.pos.add(this.vel);
  }

  draw() {
    if (!this.image) return;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = this.size / 12;
    this.ctx.stroke();
    this.ctx.clip();
    this.ctx.drawImage(
      this.image,
      this.pos.x - this.radius,
      this.pos.y - this.radius,
      this.size,
      this.size
    );
    this.ctx.restore();
  }

  edges() {
    const { width, height } = this.canvas;

    if (this.pos.x <= 0 + this.radius || this.pos.x >= width - this.radius) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 + this.radius || this.pos.y >= height - this.radius) {
      this.vel.y *= -1;
    }
  }

  private updateSize(size: number) {
    this.size = size;
    this.radius = size / 2;
  }

  onResize() {
    if (this.pos.x >= this.canvas.width || this.pos.y >= this.canvas.height) {
      this.initPos();
      return;
    }

    const SMALL_SCREEN_SCALE_RATIO = 0.7;
    const SMALL_SCREEN_SPEED_RATIO = 0.5;

    const smallScreenSize = this.baseSize * SMALL_SCREEN_SCALE_RATIO;
    const smallScreenVel = this.baseVel.scale(SMALL_SCREEN_SPEED_RATIO);

    if (this.canvas.width < 600) {
      this.updateSize(smallScreenSize);
      this.vel = smallScreenVel;
    } else {
      this.updateSize(this.baseSize);
      this.vel = this.baseVel;
    }
  }

  private initPos() {
    //make sure to not spawn nodes outside bounding box
    this.pos = new V2(
      random(this.size, this.canvas.width - this.size),
      random(this.size, this.canvas.height - this.size)
    );
    this.onResize();
  }

  private getSizeValue(size: NodeSize) {
    const sizes: { [size in NodeSize]: number } = {
      lg: 80,
      md: 55,
      sm: 30,
    };
    return sizes[size];
  }

  private getRandomVelocityBySize(size: NodeSize) {
    const speeds: { [size in NodeSize]: [number, number] } = {
      lg: [0.6, 0.8],
      md: [1.1, 1.3],
      sm: [1.8, 2],
    };
    const randomSpeed = random(...speeds[size]);

    return new V2(
      random(1) ? randomSpeed : -randomSpeed,
      random(1) ? randomSpeed : -randomSpeed
    );
  }
}
