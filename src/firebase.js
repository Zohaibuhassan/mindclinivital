import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbSz9ujnYrqUVs46JI4kqU-r0ejgDNRwU",
  authDomain: "mindclinivital.firebaseapp.com",
  projectId: "mindclinivital",
  storageBucket: "mindclinivital.firebasestorage.app",
  messagingSenderId: "196131679541",
  appId: "1:196131679541:web:f9d5ec6f7f165a3f1ef07c",
  measurementId: "G-4GLM6H6F8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
