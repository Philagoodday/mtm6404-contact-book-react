
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuZlukMhToi5-8iUuGkfP9noESjVm8SNE",
  authDomain: "contact-book-b70ac.firebaseapp.com",
  projectId: "contact-book-b70ac",
  storageBucket: "contact-book-b70ac.firebasestorage.app",
  messagingSenderId: "210864909333",
  appId: "1:210864909333:web:470bad8e-86920066b2b21c",
  measurementId: "G-MT1DP4ZHR6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };