// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-Nkcp5GCiB4Q8ZoDaJZMi_w5fmrGux6k",
  authDomain: "gogrub-2182b.firebaseapp.com",
  projectId: "gogrub-2182b",
  storageBucket: "gogrub-2182b.firebasestorage.app",
  messagingSenderId: "107901906361",
  appId: "1:107901906361:web:1229db4c25db0d75fa9a68",
  measurementId: "G-5ZZJ1GHY5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);