import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCD7qR_PO9eJ-Sz9yyvoYfMicu63NvRuKA",
  authDomain: "midas-test-1f81d.firebaseapp.com",
  projectId: "midas-test-1f81d",
  storageBucket: "midas-test-1f81d.firebasestorage.app",
  messagingSenderId: "910588938155",
  appId: "1:910588938155:web:1e984e4bdca9a9808234ee",
  measurementId: "G-J5EW35M4S2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app; 