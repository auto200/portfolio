import { ColorModeScript } from "@chakra-ui/color-mode";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../utils/theme";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
