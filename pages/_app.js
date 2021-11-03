import '../styles/globals.scss';
import store from '../store/store';
import { Provider } from 'react-redux';
import Layout from '../layout';
import firebase from '../firebase';
import Head from 'next/head';

firebase();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp