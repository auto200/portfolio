export interface IProject {
  name: string;
  tags: string[];
  imageSrc: string;
  description: string;
  links: {
    github: string;
    live?: string;
  };
  ongoing?: boolean;
}

export const projectsData: IProject[] = [
  {
    name: "RMFoff",
    description:
      "Collection of all stations provided by RMFon API. Saving transfer by sending only essential data over socket",
    imageSrc: "project-thumbnails/rmfoff.jpg",
    tags: ["ExpressJS", "Socket.io", "ReactJS"],
    links: {
      github: "https://github.com/auto200/rmf-off",
      live: "https://rmfoff.auto200.eu",
    },
  },
  {
    name: "emoteJAM",
    description:
      "React clone of an application that provides filters to animate image uploaded by the user (Client side only)",
    imageSrc: "project-thumbnails/emoteJAM.jpg",
    tags: ["ReactJS"],
    links: {
      github: "https://github.com/auto200/emoteJAM-react-clone",
      live: "https://emotejam.auto200.eu/",
    },
  },
  {
    name: "Beer Explorer",
    description:
      "Aggregation of information about beers (ex. nutritional values) sold by biggest companies in Poland",
    imageSrc: "project-thumbnails/beer-explorer.jpg",
    tags: ["NodeJS", "Data scraping", "NextJS"],
    links: {
      github: "https://github.com/auto200/beer-explorer",
      live: "https://beer-explorer.auto200.eu/",
    },
  },
  {
    name: "Nerdy Neck",
    description:
      "My current project is a posture monitoring app, it uses pretrained model to dectect position of body parts",
    imageSrc: "project-thumbnails/nerdy-neck.png",
    tags: ["ReactJS", "Tensorflow"],
    links: {
      github: "https://github.com/auto200/nerdy-neck",
      live: "https://nerdy-neck.auto200.eu/",
    },
    ongoing: true,
  },
];
