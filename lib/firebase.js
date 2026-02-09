
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHf4TZF799jVmshpAmMseh6hy1h2P2bfA",
  authDomain: "valentine-63036.firebaseapp.com",
  projectId: "valentine-63036",
  storageBucket: "valentine-63036.firebasestorage.app",
  messagingSenderId: "416463050535",
  appId: "1:416463050535:web:68120d4cd9e27356937b02",
  measurementId: "G-R39MW6N4PJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
