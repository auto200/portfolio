import { Box, Center, Grid, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { RiToolsFill } from "react-icons/ri";
import { Project } from "./Project";
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
    </Box>
  );
};

export default Projects;
