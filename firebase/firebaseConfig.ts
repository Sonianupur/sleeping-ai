import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAekFGZFcXEvCMDngN2nwfqd027gn_W68M",
  authDomain: "sleepingai-f3094.firebaseapp.com",
  projectId: "sleepingai-f3094",
  storageBucket: "sleepingai-f3094.firebasestorage.app",
  messagingSenderId: "328116191320",
  appId: "1:328116191320:web:270d9de3f6620f81760a2d",
  measurementId: "G-4EMYYDCD8D"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
