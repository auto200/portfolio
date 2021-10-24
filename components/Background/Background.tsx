import { chakra } from "@chakra-ui/system";
import { drawLine } from "@utils/canvasUtils";
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
} from "@utils/constants";
import nodesData from "@utils/nodesData";
import theme from "@utils/theme";
import V2 from "@utils/V2";
import { motion } from "framer-motion";
import { sample } from "lodash";
import React, { useEffect, useRef } from "react";
import Node from "./classes/Node";

const Canvas = motion(chakra("canvas"));
const getRandomColor = () =>
  sample([
    ...Object.values(theme.colors.green),
    ...Object.values(theme.colors.purple),
    ...Object.values(theme.colors.pink),
  ] as string[]);

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawBackgroundLinesRef = useRef(false);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const nodes = nodesData.map(
      (info) => new Node(ctx, canvasRef.current, info, getRandomColor())
    );

    const nodesHub = new V2(
      canvasRef.current.width / 2,
      canvasRef.current.height / 2
    );

    const onResize = () => {
      //dont need to update height because on scroll fires when changing window
      //height
      const width = (canvasRef.current.width = window.innerWidth);
      nodesHub.x = width / 2;
      nodes.forEach((node) => node.onResize());
    };
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      nodesHub.y = Math.max(
        canvasRef.current.height / 2 - window.scrollY,
        -100
      );
    };
    window.addEventListener("scroll", onScroll);

    const FPS = 1000 / 60;
    let lineProgress = 0.0001;
    let lineProgressInterval = 0;

    const updateCanvas = () => {
      const { width, height } = canvasRef.current;
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        if (drawBackgroundLinesRef.current) {
          if (!lineProgressInterval) {
            lineProgressInterval = window.setInterval(() => {
              lineProgress += 0.01;
              if (lineProgress >= 1) {
                window.clearInterval(lineProgressInterval);
              }
            }, FPS);
          }
          const lineTarget = new V2(
            nodesHub.x - (nodesHub.x - node.pos.x) * lineProgress,
            nodesHub.y - (nodesHub.y - node.pos.y) * lineProgress
          );
          drawLine(ctx, nodesHub, lineTarget, node.size / 10, node.borderColor);
        }
        node.update();
        node.draw();
        node.edges();
      });

      requestAnimationFrame(updateCanvas);
    };
    updateCanvas();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <Canvas
      ref={canvasRef}
      w="100%"
      h="100%"
      position="fixed"
      zIndex="-1"
      animate={{ filter: "blur(5px) brightness(40%)" }}
      transition={{
        delay: INITIAL_ANIMATION_DELAY,
        duration: INITIAL_ANIMATION_DURATION,
      }}
      onAnimationComplete={() => {
        drawBackgroundLinesRef.current = true;
      }}
    >
      canvas element not supported
    </Canvas>
  );
};
export default Background;
