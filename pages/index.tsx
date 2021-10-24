import { Box, VStack } from "@chakra-ui/react";
import Background from "@components/Background";
import Hero from "@components/sections/Hero";
import Projects from "@components/sections/Projects";
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
} from "@utils/constants";
import React, { useEffect, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";

const Home = () => {
  const [scrollbarEnabled, setScrollbarEnabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setScrollbarEnabled(false);
    }, (INITIAL_ANIMATION_DURATION + INITIAL_ANIMATION_DELAY) * 1000);
  }, []);

  return (
    <RemoveScroll enabled={scrollbarEnabled} removeScrollBar={false}>
      <Background />
      <Hero />
      <VStack>
        <Box w="100%" maxW="900px">
          <Projects />
        </Box>
      </VStack>
    </RemoveScroll>
  );
};

export default Home;
