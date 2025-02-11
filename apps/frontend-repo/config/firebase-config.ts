import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
    apiKey: "fake-api-key",
    authDomain: "ebuddy-test-27a07.firebaseapp.com",
    projectId: "ebuddy-test-27a07",
    storageBucket: "ebuddy-test-27a07.firebasestorage.app",
    messagingSenderId: "00000000010818",
    appId: "1:000000000000:web:0000000000000000000000",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
    console.log('connect to auth emulator');
    
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
