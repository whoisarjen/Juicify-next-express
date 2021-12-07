import Head from 'next/head'
import '../styles/globals.css'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title>Dynamic title INC...</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="layout">
          <Navbar/>
            <div className="content">
              <Component {...pageProps} />
            </div>
          <Footer/>
        </div>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
