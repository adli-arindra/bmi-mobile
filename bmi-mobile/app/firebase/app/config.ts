import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDqy12KCgqLJleA_z_ms9oa82bz2ofgaGo",
    authDomain: "bmi-calculator-a10cd.firebaseapp.com",
    projectId: "bmi-calculator-a10cd",
    storageBucket: "bmi-calculator-a10cd.firebasestorage.app",
    messagingSenderId: "841776914914",
    appId: "1:841776914914:web:38eae4c73f36d89a3019bb",
    measurementId: "G-S89HBWY7MT"  
};

const app = initializeApp(firebaseConfig);

export { app };