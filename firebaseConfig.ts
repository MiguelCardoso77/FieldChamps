import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDR0QjoLrdLpGZvk1YvfzyzI-oZXEPwh5I",
    authDomain: "com.fieldchamps.app",
    projectId: "fieldchamps",
    storageBucket: "fieldchamps",
    messagingSenderId: "822457382832",
    appId: "1:822457382832:android:09db97725ff2d4af478875"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };