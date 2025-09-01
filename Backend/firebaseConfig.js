import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// ✅ Import Firestore
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf9suYlf0MRYTOQthmJN3ZUTcYwX4sSfE", // Replace with your actual credentials
    authDomain: "mirrora-f6546.firebaseapp.com",
    projectId: "mirrora-f6546",
    storageBucket: "mirrora-f6546.appspot.com",
    messagingSenderId: "337653362560",
    appId: "1:337653362560:web:5613e8a5dd70ce33029b65",
};

// Initialize Firebase
// This check prevents the "duplicate app" error during hot-reloading
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize and export Firebase services
export const auth = getAuth(app);
// ✅ Initialize and export Firestore
export const db = getFirestore(app);

