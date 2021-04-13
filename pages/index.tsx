import { chakra, useTheme } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { random, sample } from "lodash";
import V2 from "../utils/V2";
import NodesData, { NodeData, NodeSize } from "../utils/nodesData";

const Canvas = chakra("canvas");

class Node {
  ctx: CanvasRenderingContext2D;
  info: NodeData;
  canvas: HTMLCanvasElement;
  borderColor: string;
  pos: V2;
  size: number;
  vel: V2;
  image: HTMLImageElement;
  constructor(
    ctx: CanvasRenderingContext2D,
    info: NodeData,
    canvas: HTMLCanvasElement,
    borderColor: string
  ) {
    this.ctx = ctx;
    this.info = info;
    this.borderColor = borderColor;
    this.size = Node.getSizeValue(info.size);
    //make sure to not spawn nodes outside bounding box
    this.pos = new V2(
      random(this.size, canvas.width - this.size),
      random(this.size, canvas.height - this.size)
    );
    const speed = Node.getSpeedBySize(this.info.size);
    this.vel = new V2(speed, speed);

    const img = new Image();
    img.addEventListener("load", () => {
      this.image = img;
    });
    img.src = this.info.src;
  }

  update() {
    this.pos = this.pos.add(this.vel);
  }

  draw() {
    if (!this.image) return;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = this.size / 12;
    this.ctx.stroke();
    this.ctx.clip();
    this.ctx.drawImage(
      this.image,
      this.pos.x - this.size / 2,
      this.pos.y - this.size / 2,
      this.size,
      this.size
    );
    this.ctx.restore();
  }

  edges(width: number, height: number) {
    if (
      this.pos.x <= 0 + this.size / 2 ||
      this.pos.x >= width - this.size / 2
    ) {
      this.vel.x *= -1;
    }
    if (
      this.pos.y <= 0 + this.size / 2 ||
      this.pos.y >= height - this.size / 2
    ) {
      this.vel.y *= -1;
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

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  console.log(theme.colors);
  const getRandomColor = () =>
    sample([
      ...Object.values(theme.colors.green),
      Object.values(theme.colors.purple),
      Object.values(theme.colors.pink),
    ] as string[]);

  useEffect(() => {
    const updateDim = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    updateDim();
    window.addEventListener("resize", updateDim);

    const ctx = canvasRef.current.getContext("2d");

    const nodes = NodesData.map(
      (info) => new Node(ctx, info, canvasRef.current, getRandomColor())
    );

    const update = () => {
      const { width, height } = canvasRef.current;

      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.update();
        node.draw();
        node.edges(width, height);
      });

      requestAnimationFrame(update);
    };

    update();

    return () => window.removeEventListener("resize", updateDim);
  });
  return <Canvas ref={canvasRef}>canvas element not supported</Canvas>;
};

export default Home;
