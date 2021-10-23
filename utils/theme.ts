import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "#root": {
        minHeight: "100vh",
      },
      html: {
        scrollBehavior: "smooth",
      },
    },
  },
});
export default theme;
