import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import{getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAhcJv9krkfNw7avWHgiQTtMjJv_cJyufY",
    authDomain: "myshop-f4aa4.firebaseapp.com",
    projectId: "myshop-f4aa4",
    storageBucket: "myshop-f4aa4.appspot.com",
    messagingSenderId: "741373834109",
    appId: "1:741373834109:web:810f533d6e93d8f4259214",
    measurementId: "G-VGM2M49SZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);