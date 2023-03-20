// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbzGEkJHMTzXXNJXspBIjGXT3I0wdLqLY",
  authDomain: "marketplace-bbebf.firebaseapp.com",
  projectId: "marketplace-bbebf",
  storageBucket: "marketplace-bbebf.appspot.com",
  messagingSenderId: "981626772324",
  appId: "1:981626772324:web:94bf0e7b028c85f319b871"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app