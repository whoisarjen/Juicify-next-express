import Head from 'next/head'
import '../styles/globals.css'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function MyApp({ Component, pageProps }) {
  return (
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
  )
}

export default MyApp
