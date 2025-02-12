// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7qQtEhb5li_px2vnVDTa5pQZzbP49ddo",
  authDomain: "kenworth-64c21.firebaseapp.com",
  projectId: "kenworth-64c21",
  storageBucket: "kenworth-64c21.appspot.com",
  messagingSenderId: "479186976726",
  appId: "1:479186976726:web:b728b22922b3bc79b6ee77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getFirestore(app);

export {db, storage};