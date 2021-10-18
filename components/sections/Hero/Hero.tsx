import { chakra, useTheme } from "@chakra-ui/react";
import nodesData from "@utils/nodesData";
import { motion } from "framer-motion";
import { sample } from "lodash";
import React, { useEffect, useRef } from "react";
import { GoMarkGithub } from "react-icons/go";
import MyPic from "./classes/MyPic";
import Node from "./classes/Node";

const Canvas = chakra("canvas");
const GithubLink = motion(chakra.a);

const Hero: React.FC = () => {
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

    const myPic = new MyPic(
      ctx,
      canvasRef.current,
      "/profPic.jpg",
      200,
      250,
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
    const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
      mousePos.x = clientX;
      mousePos.y = clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const updateCanvas = () => {
      const { width, height } = canvasRef.current;
      ctx.clearRect(0, 0, width, height);

      //connect myPic with nodes on myPic hover
      {
        const isMouseOverImage = myPic.dist(mousePos.x, mousePos.y) <= 0;
        if (isMouseOverImage) {
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
        const isNodeCollidingWithMyPic =
          myPic.dist(node.pos.x, node.pos.y) - node.radius <= 0;
        if (isNodeCollidingWithMyPic) {
          node.bounceOffRect(myPic.x, myPic.y, myPic.width, myPic.height);
        }
      });
      myPic.draw();

      requestAnimationFrame(updateCanvas);
    };
    updateCanvas();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  //letter spacing works only on chrome desktop
  return (
    <>
      <Canvas ref={canvasRef}>canvas element not supported</Canvas>
      <GithubLink
        target="_blank"
        href="https://github.com/auto200"
        pos="absolute"
        top="0"
        left="0"
        m="2"
        zIndex="10"
        fontSize="3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <GoMarkGithub />
      </GithubLink>
    </>
  );
};

export default Hero;
