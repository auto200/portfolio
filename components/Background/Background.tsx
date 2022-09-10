import { Box, chakra } from "@chakra-ui/react";
import { drawLine } from "@components/Background/canvasUtils";
import {
  BACKGROUND_FADE_DELAY,
  BACKGROUND_FADE_DURATION,
  CONNECT_HUB_WITH_NODES_DELAY,
} from "@utils/animationTimings";
import theme from "@utils/theme";
import V2 from "@utils/V2";
import { motion } from "framer-motion";
import sample from "lodash/sample";
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
        const lineWidth = node.size / 10;
        const lineTarget =
          lineProgress.current >= 1
            ? node.pos
            : new V2(
                nodesHub.x - (nodesHub.x - node.pos.x) * lineProgress.current,
                nodesHub.y - (nodesHub.y - node.pos.y) * lineProgress.current
              );
        drawLine(ctx, nodesHub, lineTarget, lineWidth, node.borderColor);
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

  //hub to node lines animation
  useEffect(() => {
    const LINE_PROGRESS_STEP = 0.008;

    setTimeout(() => {
      const incrementLineProgress = () => {
        lineProgress.current += LINE_PROGRESS_STEP;
        if (lineProgress.current < 1)
          window.requestAnimationFrame(incrementLineProgress);
      };

      incrementLineProgress();
    }, CONNECT_HUB_WITH_NODES_DELAY * 1000);
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
