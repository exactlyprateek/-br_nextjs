import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const colors = {
	brand: {
		900: '#A2D2FF',
		800: '#BDE0FE',
		700: '#001524'
	}
};
const theme = extendTheme({
	colors,
	fonts: {
		heading: 'Dela Gothic One',
		body: 'Dela Gothic One'
	}
});

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
