import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAP6mdxZ7pJylud0Nug1ZNMx3zHE_WdLDA",
  authDomain: "mytutortracker.firebaseapp.com",
  projectId: "mytutortracker",
  storageBucket: "mytutortracker.firebasestorage.app",
  messagingSenderId: "214944698945",
  appId: "1:214944698945:web:e7292ba88304f3329eecc0",
  databaseURL: "https://mytutortracker-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
