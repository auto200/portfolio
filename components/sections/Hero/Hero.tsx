import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  useClipboard,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
} from "@utils/constants";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const Wrapper = motion(Box);

const EMAIL = "michal.warac@gmail.com";

const Hero: React.FC = () => {
  const { onCopy, hasCopied } = useClipboard(EMAIL);
  const toast = useToast();

  useEffect(() => {
    if (!hasCopied) {
      return;
    }

    toast({
      title: "Email copied to clipboard",
      status: "success",
      duration: 2000,
      position: "top-end",
    });
  }, [hasCopied]);

  return (
    <Wrapper
      pos="relative"
      h="100vh"
      id="start"
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{ opacity: 1, pointerEvents: "auto" }}
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
          textAlign="center"
          color="white"
          zIndex="1"
        >
          <Heading as="h1" fontSize={["5xl", "6xl", "8xl"]}>
            Michał Warać
          </Heading>
          <Heading fontSize={["2xl", "3xl", "4xl"]}>Frontend Developer</Heading>
          <VStack mt="2">
            <Flex mt="2">
              <Link
                isExternal
                href="https://github.com/auto200"
                _hover={{ color: "blue.500" }}
              >
                <Icon
                  as={FaGithubSquare}
                  fontSize={["5xl", null, "6xl"]}
                  mx="2"
                />
              </Link>
              <Link
                isExternal
                _hover={{ color: "blue.500" }}
                href="https://linkedin.com/in/michalwarac"
              >
                <Icon as={FaLinkedin} fontSize={["5xl", null, "6xl"]} mx="2" />
              </Link>
            </Flex>
            <Center mt="0 !important" position="relative">
              <Icon
                as={GrMail}
                fontSize={["4xl", "5xl", "6xl"]}
                mx="2"
                cursor="pointer"
                onClick={onCopy}
              />
              <Text fontSize={["xl", "2xl", "3xl"]}>{EMAIL}</Text>
              <motion.div
                initial={{ position: "absolute", top: 100 }}
                animate={{ y: 25, opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeatDelay: 4,
                  repeat: Infinity,
                }}
              >
                <Icon as={HiOutlineChevronDoubleDown} fontSize="4xl" />
              </motion.div>
            </Center>
          </VStack>
        </Center>
      </Center>
    </Wrapper>
  );
};

export default Hero;
