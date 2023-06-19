// Imported the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';

// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGFlcbODcRY7RnslWRE8MOy92T9v3g_GM", // Your API Key
  authDomain: "refubook-codybrains.firebaseapp.com", // Your Auth Domain
  projectId: "refubook-codybrains", // Your Project ID
  storageBucket: "refubook-codybrains.appspot.com", // Your Storage Bucket
  messagingSenderId: "698222231103", // Your Messaging Sender ID
  appId: "1:698222231103:web:7d9dad56d2d7a26629828a", // Your App ID
  measurementId: "G-VZ5EBC4W4N" // Your Measurement ID
};

// Initialize Firebase and export the functions
export const app = initializeApp(firebaseConfig); // Initialize the app
export const auth = getAuth(); // Initialize the auth
export const storage = getStorage(); // Initialize the storage
export const db = getFirestore(); // Initialize the database

// Export the providers
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();
