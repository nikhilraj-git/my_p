//import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAQUtgB5jivLIzmWcy0tERprUCQIlgWo8I",
  authDomain: "netflix-clone-ec3e7.firebaseapp.com",
  projectId: "netflix-clone-ec3e7",
  storageBucket: "netflix-clone-ec3e7.appspot.com",
  messagingSenderId: "882446656923",
  appId: "1:882446656923:web:0eb0076ee4f107c9f32d3e",
  measurementId: "G-6L32KTWSXC"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);
//firebase.initializeApp(firebaseConfig);
//const storage = firebase.storage();
export default storage;
