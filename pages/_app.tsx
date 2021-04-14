import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Michosz to ja</title>
        <meta property="og:title" content="Michosz to ja" key="title" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
