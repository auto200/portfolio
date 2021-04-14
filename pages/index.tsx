import { chakra, useTheme } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { clamp, sample } from "lodash";
import Node from "../classes/Node";
import V2 from "../utils/V2";
import nodesData from "../utils/nodesData";
import MyPic from "../classes/MyPic";

const Canvas = chakra("canvas");

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

    const MY_PIC_WIDTH = 200;
    const MY_PIC_HEIGHT = 250;
    const myPic = new MyPic(
      ctx,
      canvasRef.current,
      "/ava2.jpg",
      MY_PIC_WIDTH,
      MY_PIC_HEIGHT,
      12
    );

    const nodes = nodesData.map(
      (info) => new Node(ctx, canvasRef.current, info, getRandomColor())
    );

    const onResize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      nodes.forEach((node) => node.onResize());
      myPic.onResize();
    };
    window.addEventListener("resize", onResize);

    const mousePos = { x: 0, y: 0 };
    const onMouseMove = ({ clientX, clientY }) => {
      mousePos.x = clientX;
      mousePos.y = clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const updateCanvas = () => {
      const { width, height } = canvasRef.current;
      ctx.clearRect(0, 0, width, height);

      //connect myPic with nodes on myPic hover
      {
        const closestPointOnRect = new V2(
          clamp(mousePos.x, myPic.x, myPic.x + myPic.width),
          clamp(mousePos.y, myPic.y, myPic.y + myPic.height)
        );
        const mouseOverImage =
          new V2(mousePos.x, mousePos.y).dist(closestPointOnRect) <= 0;
        if (mouseOverImage) {
          const myPicCenter = {
            x: myPic.x + myPic.width / 2,
            y: myPic.y + myPic.height / 2,
          };
          nodes.forEach((node) => {
            ctx.beginPath();
            ctx.moveTo(myPicCenter.x, myPicCenter.y);
            ctx.lineTo(node.pos.x, node.pos.y);
            ctx.lineWidth = node.size / 10;
            ctx.strokeStyle = node.borderColor;
            ctx.stroke();
          });
        }
      }

      nodes.forEach((node) => {
        node.update();
        node.draw();
        node.edges();
        node.myPicCollision(myPic.x, myPic.y, myPic.width, myPic.height);
      });
      myPic.draw();

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
