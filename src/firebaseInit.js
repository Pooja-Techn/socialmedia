// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyCzeVmbxsJAiezb8oIbqhVNpi1MIZGwqxo",
  authDomain: "busy-buy---1.firebaseapp.com",
  projectId: "busy-buy---1",
  storageBucket: "busy-buy---1.firebasestorage.app",
  messagingSenderId: "770517428716",
  appId: "1:770517428716:web:26dbc5baa5b253e652f8c9",
  measurementId: "G-PQL2YM2YDN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const analytics = getAnalytics(app);