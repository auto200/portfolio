import { extendTheme, theme as chTheme } from "@chakra-ui/react";

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
      "::-webkit-scrollbar": {
        width: "10px",
      },
      "::-webkit-scrollbar-track": {
        background: chTheme.colors.gray["900"],
      },
      "::-webkit-scrollbar-thumb": {
        background: chTheme.colors.gray["700"],
        borderRadius: "5px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: chTheme.colors.gray["600"],
        borderRadius: "5px",
      },
    },
  },
});
export default theme;
