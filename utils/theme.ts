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
    },
  },
});
export default theme;
