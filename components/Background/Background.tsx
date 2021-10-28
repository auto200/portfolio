import { chakra, keyframes } from "@chakra-ui/react";
import { drawLine } from "@utils/canvasUtils";
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
} from "@utils/constants";
import nodesData from "@utils/nodesData";
import theme from "@utils/theme";
import V2 from "@utils/V2";
import { sample } from "lodash";
import React, { useEffect, useRef } from "react";
import Node from "./classes/Node";

const Canvas = chakra("canvas");
const canvasBlurAnimation = keyframes`
to{
  filter: blur(5px) brightness(40%);
}`;
const getRandomColor = () =>
  sample([
    ...Object.values(theme.colors.green),
    ...Object.values(theme.colors.purple),
    ...Object.values(theme.colors.pink),
  ] as string[]);

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawBackgroundLinesRef = useRef(false);
  const lineProgress = useRef(0.0001);

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
        if (drawBackgroundLinesRef.current) {
          const lineTarget = new V2(
            nodesHub.x - (nodesHub.x - node.pos.x) * lineProgress.current,
            nodesHub.y - (nodesHub.y - node.pos.y) * lineProgress.current
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

  //animations
  useEffect(() => {
    const FPS = 1000 / 60;
    let lineProgressInterval = 0;
    const lineProgressStep = 0.008;

    setTimeout(() => {
      drawBackgroundLinesRef.current = true;
      lineProgressInterval = window.setInterval(() => {
        lineProgress.current += lineProgressStep;
        if (lineProgress.current >= 1) {
          window.clearInterval(lineProgressInterval);
        }
      }, FPS);
      //add 1 to give extra time for background and hero to blend in
    }, (INITIAL_ANIMATION_DELAY + 1) * 1000);
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      w="100%"
      h="100%"
      position="fixed"
      zIndex="-1"
      animation={`${canvasBlurAnimation} forwards ${INITIAL_ANIMATION_DURATION}s linear ${INITIAL_ANIMATION_DELAY}s`}
    >
      canvas element not supported
    </Canvas>
  );
};
export default Background;
