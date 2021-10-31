import { Box, chakra } from "@chakra-ui/react";
import { drawLine } from "@components/Background/canvasUtils";
import {
  BACKGROUND_FADE_DELAY,
  BACKGROUND_FADE_DURATION,
  CONNETCT_HUB_WITH_NODES_DELAY,
} from "@utils/animationTimings";
import theme from "@utils/theme";
import V2 from "@utils/V2";
import { motion } from "framer-motion";
import { sample } from "lodash";
import React, { useEffect, useRef } from "react";
import Node from "./classes/Node";
import nodesData from "./nodesData";

const Canvas = chakra("canvas");
const BrightnessFilter = motion(Box);
const getRandomColor = () =>
  sample([
    ...Object.values(theme.colors.green),
    ...Object.values(theme.colors.purple),
    ...Object.values(theme.colors.pink),
  ] as string[]);

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawHubToNodeLinesRef = useRef(false);
  const lineProgress = useRef(0);

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

    const updateCanvas = () => {
      const { width, height } = canvasRef.current;
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        if (drawHubToNodeLinesRef.current) {
          const lineWidth = node.size / 10;
          // do not recalculate line target when the progress is complete
          const lineTarget =
            lineProgress.current >= 1
              ? node.pos
              : new V2(
                  nodesHub.x - (nodesHub.x - node.pos.x) * lineProgress.current,
                  nodesHub.y - (nodesHub.y - node.pos.y) * lineProgress.current
                );
          drawLine(ctx, nodesHub, lineTarget, lineWidth, node.borderColor);
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

  //animations
  useEffect(() => {
    const FPS = 1000 / 60;
    let lineProgressInterval = 0;
    const lineProgressStep = 0.008;

    setTimeout(() => {
      drawHubToNodeLinesRef.current = true;
      lineProgressInterval = window.setInterval(() => {
        lineProgress.current += lineProgressStep;
        if (lineProgress.current >= 1) {
          window.clearInterval(lineProgressInterval);
        }
      }, FPS);
    }, CONNETCT_HUB_WITH_NODES_DELAY * 1000);
  }, []);

  return (
    <Box position="fixed" zIndex="-1" h="100vh">
      <Canvas ref={canvasRef} w="full">
        canvas element not supported
      </Canvas>
      <BrightnessFilter
        pos="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bgColor="black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{
          delay: BACKGROUND_FADE_DELAY,
          duration: BACKGROUND_FADE_DURATION,
        }}
      />
    </Box>
  );
};
export default Background;
