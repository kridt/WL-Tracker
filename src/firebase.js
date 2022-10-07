import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  databaseURL: process.env.REACT_APP_DATABASEURL,
});

export const realDatabase = getDatabase(app);
export const fireStorage = getStorage(app);
export const firestoreDb = firebase.firestore(app);
export const auth = app.auth();
export default app;
