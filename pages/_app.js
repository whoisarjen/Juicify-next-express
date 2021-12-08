import '../styles/globals.css'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../components/Layout'

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
