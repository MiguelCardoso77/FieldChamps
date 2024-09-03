import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDR0QjoLrdLpGZvk1YvfzyzI-oZXEPwh5I",
    authDomain: "com.fieldchamps.app",
    projectId: "fieldchamps",
    storageBucket: "fieldchamps.appspot.com",
    messagingSenderId: "822457382832",
    appId: "1:822457382832:android:09db97725ff2d4af478875",
    databaseURL: "https://fieldchamps-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Database
const db = getDatabase(app)

export { auth, db };