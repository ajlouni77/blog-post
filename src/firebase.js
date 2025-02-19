import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut // ← أضف هذا السطر
} from "firebase/auth";
import { getFirestore,doc,getDocs, setDoc,addDoc,collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM5rviMrUW3vKapv881GrFLeoVeaGZZGQ",
  authDomain: "blog-post-manager-application.firebaseapp.com",
  projectId: "blog-post-manager-application",
  storageBucket: "blog-post-manager-application.firebasestorage.app",
  messagingSenderId: "834963055577",
  appId: "1:834963055577:web:5596053cf47691efc4afc8",
  measurementId: "G-3H5TFTECKB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {doc, setDoc,getFirestore,addDoc,collection,getDocs, auth, provider, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut };
