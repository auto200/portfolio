import { Box, VStack } from "@chakra-ui/react";
import Contact from "@components/sections/Contact";
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
          <Contact />
        </Box>
      </VStack>
    </>
  );
};

export default Home;
