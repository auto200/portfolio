import { Box, Center, Grid, Heading, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { RiToolsFill } from "react-icons/ri";
import Project from "./components/Project";
import { projectsData } from "./projectsData";

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  return (
    <Box>
      <Center as={Heading} my="10">
        <Icon as={RiToolsFill} />
        Projects
      </Center>
      <Grid
        templateColumns="repeat(auto-fit, minmax(350px, max-content))"
        justifyContent="center"
        gap="4"
        mt="5"
        mx="1"
      >
        {projectsData.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </Grid>
      <Center>
        <Text
          as={Link}
          href="#start"
          fontSize="3xl"
          color="green.300"
          mt="10"
          mb="5"
        >
          Let&apos;s talk 💬
        </Text>
      </Center>
    </Box>
  );
};

export default Projects;
