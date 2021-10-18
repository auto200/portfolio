import { NodeData, NodeSize } from "@utils/nodesData";
import V2 from "@utils/V2";
import { random } from "lodash";

export default class Node {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  info: NodeData;
  borderColor: string;
  pos: V2;
  size: number;
  vel: V2;
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
    this.size = Node.getSizeValue(info.size);
    this.radius = this.size / 2;
    this.initPos();

    const speed = Node.getSpeedBySize(this.info.size);
    this.vel = new V2(speed, speed);

    const img = new Image();
    img.addEventListener("load", () => {
      this.image = img;
    });
    img.src = this.info.src;
  }

  initPos() {
    //make sure to not spawn nodes outside bounding box
    this.pos = new V2(
      random(this.size, this.canvas.width - this.size),
      random(this.size, this.canvas.height - this.size)
    );
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
  //yep, definitely a feature
  bounceOffRect(
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ) {
    if (
      this.pos.x + this.radius >= rectX &&
      this.pos.x + this.radius <= rectX + rectWidth
    ) {
      this.vel.x *= -1;
      return;
    }
    if (
      this.pos.y + this.radius >= rectY &&
      this.pos.y + this.radius <= rectY + rectHeight
    ) {
      this.vel.y *= -1;
    }
  }

  onResize() {
    if (this.pos.x >= this.canvas.width || this.pos.y >= this.canvas.height) {
      this.initPos();
    }
  }

  static getSizeValue(size: NodeSize) {
    const sizes: { [size in NodeSize]: number } = {
      lg: 80,
      md: 55,
      sm: 30,
    };
    return sizes[size];
  }
  static getSpeedBySize(size: NodeSize) {
    const sizes: { [size in NodeSize]: number } = {
      lg: 0.8,
      md: 1.3,
      sm: 2,
    };
    return sizes[size];
  }
}
