import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';
import {store} from '~/store';

import '~/styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ChakraProvider resetCSS>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ChakraProvider>
    );
}

export default MyApp;
