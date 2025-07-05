// lautyarn-website/src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Konfigurasi Firebase asli dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBfM923nb4SkCw3rgmgpat0yB2hz6HiLjo",
  authDomain: "lautyarn-website.firebaseapp.com",
  projectId: "lautyarn-website",
  storageBucket: "lautyarn-website.appspot.com", // perbaiki `.app` menjadi `.appspot.com`
  messagingSenderId: "706723666161",
  appId: "1:706723666161:web:98634f4eeeec55899ef150",
  measurementId: "G-EFWTCV81W1"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
