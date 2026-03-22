// This is the fireabse config. This file is then called in index.js and used to create
// context around firebase, db , storage, auth and Field Value

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, FieldValue } from "firebase/firestore";

//creating a config which help us to create a firebase instance with our credentials
const firebaseConfig = {
  apiKey: "AIzaSyAbmtyU5wukYJV7DGPUyz8gGiWX8zteoC0",
  authDomain: "insta-clone-4088c.firebaseapp.com",
  projectId: "insta-clone-4088c",
  storageBucket: "insta-clone-4088c.appspot.com",
  messagingSenderId: "70787332538",
  appId: "1:70787332538:web:b38a24c237772a003e0583",
};

// Initialize Firebase and the required services
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const storage = getStorage(firebase);
const auth = getAuth(firebase);

console.log("firebase", firebase);

export { firebase, db, storage, auth, FieldValue };
