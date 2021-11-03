import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/Slices/UserSlice';
import firebase from 'firebase/compat/app';
import HomeComponent from '../Components/Home/Home';

export default function Home({ data }) {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        dispatch(getUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL   
        }));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <HomeComponent data={data} />
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data = await res.json();
  if(!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { data }
  };
}
