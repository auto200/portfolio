import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
} from "@utils/constants";
import { motion } from "framer-motion";
import React from "react";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

const Wrapper = motion(Box);

const Hero: React.FC = () => {
  return (
    <Wrapper
      pos="relative"
      h="100vh"
      id="start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: INITIAL_ANIMATION_DELAY,
        duration: INITIAL_ANIMATION_DURATION,
      }}
    >
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
                _hover={{ color: "blue.500" }}
              >
                <Icon as={FaGithubSquare} fontSize="5xl" mx="2" />
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
    </Wrapper>
  );
};

export default Hero;
