import {
  Box,
  Center,
  chakra,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  theme,
  VStack,
} from "@chakra-ui/react";
import nodesData from "@utils/nodesData";
import { sample } from "lodash";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import Node from "./classes/Node";

const Canvas = chakra("canvas");

const getRandomColor = () =>
  sample([
    ...Object.values(theme.colors.green),
    ...Object.values(theme.colors.purple),
    ...Object.values(theme.colors.pink),
  ] as string[]);

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const nodes = nodesData.map(
      (info) => new Node(ctx, canvasRef.current, info, getRandomColor())
    );

    const nodesCenter = {
      x: canvasRef.current.width / 2,
      y: canvasRef.current.height / 2,
    };

    const onResize = () => {
      const width = (canvasRef.current.width = window.innerWidth);
      const height = (canvasRef.current.height = window.innerHeight);
      nodesCenter.x = width / 2;
      nodesCenter.y = height / 2;
      nodes.forEach((node) => node.onResize());
    };
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      nodesCenter.y = Math.max(
        canvasRef.current.height / 2 - window.scrollY,
        -100
      );
    };

    window.addEventListener("scroll", onScroll);

    const updateCanvas = () => {
      const { width, height } = canvasRef.current;
      ctx.clearRect(0, 0, width, height);

      //draw lines from nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.moveTo(nodesCenter.x, nodesCenter.y);
        ctx.lineTo(node.pos.x, node.pos.y);
        ctx.lineWidth = node.size / 10;
        ctx.strokeStyle = node.borderColor;
        ctx.stroke();
      });

      nodes.forEach((node) => {
        node.update();
        node.draw();
        node.edges();
      });

      requestAnimationFrame(updateCanvas);
    };
    updateCanvas();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Box pos="relative" h="100vh" id="start">
      <Center
        flexDirection="column"
        pos="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
      >
        <Center
          flexDirection="column"
          color="white"
          maxW="600px"
          maxH="300px"
          rounded="md"
          zIndex="1"
        >
          <Heading as="h1" fontSize="5xl">
            Michał Warać
          </Heading>
          <Heading fontSize="2xl">Frontend Developer</Heading>
          <VStack mt="2">
            <Flex>
              <Link
                isExternal
                href="https://github.com/auto200"
                _hover={{ color: "black" }}
              >
                <Icon as={FaGithub} fontSize="5xl" mx="2" />
              </Link>
              <Link
                isExternal
                _hover={{ color: "blue.500" }}
                href="https://linkedin.com/in/michalwarac"
              >
                <Icon as={FaLinkedin} fontSize="5xl" mx="2" />
              </Link>
            </Flex>
            <Center mt="0 !important">
              <Icon as={GrMail} fontSize="4xl" mx="2" />
              <Text fontSize="xl">Michal.Warac@gmail.com</Text>
            </Center>
          </VStack>
        </Center>
      </Center>
      <Canvas
        ref={canvasRef}
        borderBottom="1px"
        borderColor="whiteAlpha.500"
        w="100%"
        h="100%"
        filter="blur(5px) brightness(40%)"
        position="fixed"
        zIndex="-1"
      >
        canvas element not supported
      </Canvas>
    </Box>
  );
};

export default Hero;
