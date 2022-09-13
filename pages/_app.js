import '../styles/globals.css'
import { configureAbly } from "@ably-labs/react-hooks";
import { ChakraProvider } from '@chakra-ui/react'





/* configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
});
 */
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>)
}

export default MyApp
