// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjPGq9Wadsib7wvyV49DdXKzKpXK4rhKc",
  authDomain: "donation-website-4636e.firebaseapp.com",
  projectId: "donation-website-4636e",
  storageBucket: "donation-website-4636e.appspot.com",
  messagingSenderId: "374418441261",
  appId: "1:374418441261:web:29b9d1d657de7f03a524a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
