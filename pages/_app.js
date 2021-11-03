import '../styles/globals.scss';
import store from '../store/store';
import { Provider } from 'react-redux';
import Layout from '../layout';
import firebase from '../firebase';

firebase();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp