import { Box, VStack } from "@chakra-ui/react";
import Hero from "@components/sections/Hero";
import Projects from "@components/sections/Projects";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <VStack>
        <Box w="100%" maxW="900px">
          <Projects />
        </Box>
      </VStack>
    </>
  );
};

export default Home;
