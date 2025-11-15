// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "task-management-app-12eef.firebaseapp.com",
  projectId: "task-management-app-12eef",
  storageBucket: "task-management-app-12eef.firebasestorage.app",
  messagingSenderId: "621001403759",
  appId: "1:621001403759:web:c0459844774a317dc14c9a",
  measurementId: "G-C6L5QC9B6Z"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);