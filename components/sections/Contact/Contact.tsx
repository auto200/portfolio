import { Center, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  return (
    <VStack mt="5">
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
      <Center>
        <Icon as={GrMail} fontSize="5xl" mx="2" />
        <Text fontSize="xl">Michal.Warac@gmail.com</Text>
      </Center>
    </VStack>
  );
};
export default Contact;
