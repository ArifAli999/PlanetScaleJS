import '../styles/globals.css'
import { configureAbly } from "@ably-labs/react-hooks";
import { ChakraProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';





/* configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
});
 */
function MyApp({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>

        <Component {...pageProps} />
      </ChakraProvider>
    </DndProvider>)

}

export default MyApp
