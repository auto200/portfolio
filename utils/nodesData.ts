export type NodeSize = "lg" | "md" | "sm";

export interface NodeData {
  id: string;
  src: string;
  size: NodeSize;
  links: string[];
}

const nodesData: NodeData[] = [
  {
    id: "React",
    src: "/nodes/react.png",
    size: "lg",
    links: [],
  },
  {
    id: "JavaScript",
    src: "/nodes/js.png",
    size: "lg",
    links: [],
  },
  {
    id: "HTML",
    src: "/nodes/html.png",
    size: "md",
    links: [],
  },
  {
    id: "CSS",
    src: "/nodes/css.jpg",
    size: "md",
    links: [],
  },
  {
    id: "Styled-Components",
    src: "/nodes/styled-components.jpg",
    size: "md",
    links: [],
  },
  {
    id: "Git",
    src: "/nodes/git.png",
    size: "sm",
    links: [],
  },
  {
    id: "GitHub",
    src: "/nodes/github.png",
    size: "sm",
    links: [],
  },
  {
    id: "Chakra UI",
    src: "/nodes/chakra.png",
    size: "md",
    links: [],
  },
  {
    id: "Gatsby JS",
    src: "/nodes/gatsby.png",
    size: "md",
    links: [],
  },
  {
    id: "Material UI",
    src: "/nodes/material.png",
    size: "sm",
    links: [],
  },
  {
    id: "C++",
    src: "/nodes/cpp.png",
    size: "sm",
    links: [],
  },
  {
    id: "Next.js",
    src: "/nodes/next.jpg",
    size: "md",
    links: [],
  },
  {
    id: "Node.js",
    src: "/nodes/nodejs.png",
    size: "md",
    links: [],
  },
  {
    id: "Socket IO",
    src: "/nodes/socket-io.svg",
    size: "sm",
    links: [],
  },
  {
    id: "Puppeteer",
    src: "/nodes/puppeteer.png",
    size: "sm",
    links: [],
  },
  {
    id: "Electron",
    src: "/nodes/electron.png",
    size: "sm",
    links: [],
  },
  {
    id: "MySQL",
    src: "/nodes/mysql.png",
    size: "sm",
    links: [],
  },
  {
    id: "REST",
    src: "/nodes/rest.png",
    size: "md",
    links: [],
  },
  {
    id: "TypeScript",
    src: "/nodes/typescript.png",
    size: "md",
    links: [],
  },
];

export default nodesData;
