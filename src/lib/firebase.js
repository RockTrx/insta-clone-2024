// This is the fireabse config. This file is then called in index.js and used to create
// context around firebase, db , storage, auth and Field Value

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, FieldValue } from "firebase/firestore";

//creating a config which help us to create a firebase instance with our credentials
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase and the required services
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const storage = getStorage(firebase);
const auth = getAuth(firebase);


export { firebase, db, storage, auth, FieldValue };
