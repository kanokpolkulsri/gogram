import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'gogram-web-2026',
  appId: '1:17204796727:web:7d0fa0cdc3880e2d540eb2',
  storageBucket: 'gogram-web-2026.firebasestorage.app',
  apiKey: 'AIzaSyCzI-wmZDV8rqFo19HN0YYTXm_Hjdw04h4',
  authDomain: 'gogram-web-2026.firebaseapp.com',
  messagingSenderId: '17204796727'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, signInWithPopup, signOut };
