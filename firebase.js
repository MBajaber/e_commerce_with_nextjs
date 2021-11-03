import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBUzlUZakH09ImE_S2DtvIq5q-gDBzmwWs",
//   authDomain: "e-commerce-shopping-d4594.firebaseapp.com",
//   projectId: "e-commerce-shopping-d4594",
//   storageBucket: "e-commerce-shopping-d4594.appspot.com",
//   messagingSenderId: "835347292048",
//   appId: "1:835347292048:web:866664a79d8a6d01199d15"
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASR_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASR_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASR_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASR_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASR_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASR_APP_ID
};

export default function initFirebase() {
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}