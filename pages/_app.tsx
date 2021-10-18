import { ChakraProvider } from "@chakra-ui/react";
import theme from "@utils/theme";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
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
