import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles'
// import { red } from '@mui/material/colors'

import '../styles/main.scss'
import '../styles/spacing.scss';
import ButtonAppBar from '../components/Navigation/BasicAppBar'

const queryClient = new QueryClient()

// stealing theme from react hook form
const theme = createTheme({
	palette: {
		primary: {
			light: '##ec5990',
			main: '#bf1650',
			dark: '#ff7aa8'
		},
		secondary: {
			light: '#516391',
			main: '#1e2a4a',
			dark: '##191d3a'
		}
	}
})

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ButtonAppBar />
				<Component {...pageProps} />
			</QueryClientProvider>
		</ThemeProvider>
	)
}

export default MyApp
