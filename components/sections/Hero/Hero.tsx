import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Link,
  useClipboard,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { HERO_FADE_DELAY, HERO_FADE_DURATION } from "@utils/animationTimings";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { FaGithubSquare } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

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
        delay: HERO_FADE_DELAY,
        duration: HERO_FADE_DURATION,
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
          color="whiteAlpha.900"
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
              <Icon
                as={GrMail}
                fontSize={["4xl", "5xl", "6xl"]}
                mx="2"
                cursor="pointer"
                _hover={{ color: "blue.500" }}
                onClick={onCopy}
              />
            </Flex>
            {/* <Center mt="0 !important" position="relative">
              <motion.div
                initial={{ position: "absolute", top: 100 }}
                animate={{ y: 25, opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeatDelay: 3.5,
                  repeat: Infinity,
                }}
              >
                <Icon as={HiOutlineChevronDoubleDown} fontSize="4xl" />
              </motion.div>
            </Center> */}
          </VStack>
        </Center>
      </Center>
    </Wrapper>
  );
};

export default Hero;
