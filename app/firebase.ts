import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1YcJFgKh0GTWSxFR7oX_YiN21P9pW0cY",
  authDomain: "customer-insights-dasboard.firebaseapp.com",
  databaseURL: "https://customer-insights-dasboard-default-rtdb.firebaseio.com",
  projectId: "customer-insights-dasboard",
  storageBucket: "customer-insights-dasboard.appspot.com",
  messagingSenderId: "36257769906",
  appId: "1:36257769906:web:1fc9db293f07cb72db5cab",
  measurementId: "G-E0B7R8CV92"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { app, db, auth }