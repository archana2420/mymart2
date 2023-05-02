// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCbmWgRcsrMTHS4Bu99n8E7nzRYtTzs_DI",
  authDomain: "my-mart-9ec89.firebaseapp.com",
  projectId: "my-mart-9ec89",
  storageBucket: "my-mart-9ec89.appspot.com",
  messagingSenderId: "1013416282938",
  appId: "1:1013416282938:web:ffc961aa231c733a211e03",
  measurementId: "G-12LDMLHTD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)