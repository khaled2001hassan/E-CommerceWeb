import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRUj8mBb2w7bGfusHJFnij-5e_nFLDuqc",
  authDomain: "e-commerce-94018.firebaseapp.com",
  projectId: "e-commerce-94018",
  storageBucket: "e-commerce-94018.firebasestorage.app",
  messagingSenderId: "1002906309519",
  appId: "1:1002906309519:web:f8ef91ccce210aea24f1fa",
  measurementId: "G-JV2W6PBEMF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);
export { app, analytics };
