import { Grid } from "@chakra-ui/react";
import React from "react";
import { Project } from "./Project";
import { projectsData } from "./projectsData";

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  return (
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
  );
};

export default Projects;
