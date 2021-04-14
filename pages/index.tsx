import { chakra, useTheme } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { clamp, random, sample } from "lodash";
import V2 from "../utils/V2";
import nodesData, { NodeData, NodeSize } from "../utils/nodesData";
import { roundedImage } from "../utils";
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
    this.canvas = canvas;
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

  edges() {
    const { width, height } = this.canvas;

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

  myPicCollision(x, y, w, h) {
    const closestPointOnRect = new V2(
      clamp(this.pos.x, x, x + w),
      clamp(this.pos.y, y, y + h)
    );
    const collision = this.pos.dist(closestPointOnRect) - this.size / 2 <= 0;
    //yep, definitely a feature
    if (collision) {
      if (
        this.pos.x + this.size / 2 >= x &&
        this.pos.x + this.size / 2 <= x + w
      ) {
        this.vel.x *= -1;
        return;
      }
      if (
        this.pos.y + this.size / 2 >= y &&
        this.pos.y + this.size / 2 <= y + h
      ) {
        this.vel.y *= -1;
      }
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

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const getRandomColor = () =>
    sample([
      ...Object.values(theme.colors.green),
      ...Object.values(theme.colors.purple),
      ...Object.values(theme.colors.pink),
    ] as string[]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const nodes = nodesData.map(
      (info) => new Node(ctx, info, canvasRef.current, getRandomColor())
    );
    const onResize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      nodes.forEach((node) => node.onResize());
    };

    const mousePos = { x: 0, y: 0 };
    const onMouseMove = ({ clientX, clientY }) => {
      mousePos.x = clientX;
      mousePos.y = clientY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    const myPic = new Image();
    let myPicLoaded = false;
    myPic.addEventListener("load", () => {
      myPicLoaded = true;
    });
    myPic.src = "/ava2.jpg";

    const updateCanvas = () => {
      const { width, height } = canvasRef.current;

      ctx.clearRect(0, 0, width, height);

      const MY_PIC_WIDTH = 200;
      const MY_PIC_HEIGHT = 250;
      const MY_PIC_X = width / 2 - myPic.width / 2;
      const MY_PIC_Y = height / 2 - myPic.height / 2;

      nodes.forEach((node) => {
        node.update();
        node.draw();
        node.edges();
        node.myPicCollision(MY_PIC_X, MY_PIC_Y, MY_PIC_WIDTH, MY_PIC_HEIGHT);
      });

      if (myPicLoaded) {
        ctx.save();
        roundedImage(ctx, MY_PIC_X, MY_PIC_Y, MY_PIC_WIDTH, MY_PIC_HEIGHT, 10);
        ctx.strokeStyle = "#2465D3";
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(myPic, MY_PIC_X, MY_PIC_Y, MY_PIC_WIDTH, MY_PIC_HEIGHT);
        ctx.restore();

        //text under image
        ctx.font = "bold 28px Arial";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.strokeText(
          "It's a feature",
          MY_PIC_X - 15,
          MY_PIC_Y + MY_PIC_HEIGHT + 30
        );
        ctx.fillStyle = "#2465D3";
        ctx.fillText(
          "It's a feature",
          MY_PIC_X - 15,
          MY_PIC_Y + MY_PIC_HEIGHT + 30
        );

        //mouse over image
        const closestPointOnRect = new V2(
          clamp(mousePos.x, MY_PIC_X, MY_PIC_X + MY_PIC_WIDTH),
          clamp(mousePos.y, MY_PIC_Y, MY_PIC_Y + MY_PIC_HEIGHT)
        );
        const mouseOverImage =
          new V2(mousePos.x, mousePos.y).dist(closestPointOnRect) <= 0;
        if (mouseOverImage) {
          ctx.globalCompositeOperation = "destination-over";
          nodes.forEach((node) => {
            ctx.beginPath();
            ctx.moveTo(
              MY_PIC_X + MY_PIC_WIDTH / 2,
              MY_PIC_Y + MY_PIC_HEIGHT / 2
            );
            ctx.lineTo(node.pos.x, node.pos.y);
            ctx.lineWidth = Node.getSizeValue(node.info.size) / 10;
            ctx.strokeStyle = node.borderColor;
            ctx.stroke();
          });
          ctx.globalCompositeOperation = "source-over";
        }
      }

      requestAnimationFrame(updateCanvas);
    };

    updateCanvas();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  });

  //letter spacing works only on chrome desktop
  return (
    <Canvas ref={canvasRef} letterSpacing="5px">
      canvas element not supported
    </Canvas>
  );
};

export default Home;
