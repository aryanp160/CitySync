// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
const firebaseConfig = {
    apiKey: "AIzaSyAVbj4J7WnQIWI6AzotGKTx4rSxT2UgT-o",
    authDomain: "citysync-f8d4b.firebaseapp.com",
    projectId: "citysync-f8d4b",
    storageBucket: "citysync-f8d4b.firebasestorage.app",
    messagingSenderId: "605827601628",
    appId: "1:605827601628:web:764b7555ea8ed6558f9019",
    measurementId: "G-P7KH1TQVXN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export {onAuthStateChanged};