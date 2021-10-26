import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { IProject } from "./projectsData";

interface ProjectProps extends IProject {}

export const Project: React.FC<ProjectProps> = ({
  tags,
  name,
  imageSrc,
  description,
  links,
  ongoing,
}) => {
  return (
    <VStack
      pos="relative"
      maxW="440px"
      p="8"
      rounded="md"
      overflow="hidden"
      bg="gray.800"
      opacity="0.9"
      border="2px"
      borderColor="whiteAlpha.500"
    >
      {ongoing && (
        <Box
          pos="absolute"
          top="10px"
          left="-45px"
          w="150px"
          transform="rotate(-45deg)"
          p="2"
          textAlign="center"
          bgColor="green.600"
          color="snow"
        >
          Ongoing
        </Box>
      )}
      <Box pos="absolute" top="2" right="0" mt="0 !important">
        {tags.map((tag) => (
          <Tag
            key={tag}
            mx={1}
            size={tags.length < 3 ? "md" : "sm"}
            colorScheme="green"
          >
            {tag}
          </Tag>
        ))}
      </Box>
      <Heading>{name}</Heading>
      <Image src={imageSrc} alt={name} h="250px" objectFit="cover" />
      <Text textAlign="center" fontSize="large">
        {description}
      </Text>
      <Box>
        <Button
          as={Link}
          isExternal
          href={links.github}
          w="100px"
          mr="5px"
          leftIcon={<BsGithub />}
        >
          Github
        </Button>
        {links.live && (
          <Button
            as={Link}
            isExternal
            href={links.live}
            w="100px"
            leftIcon={<BsGlobe />}
          >
            Live
          </Button>
        )}
      </Box>
    </VStack>
  );
};
