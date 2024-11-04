// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQsp1nYCYqiQ-SeN6GbggXPKCJ-E0FR2Y",
  authDomain: "scentica-caeb4.firebaseapp.com",
  databaseURL: "https://scentica-caeb4-default-rtdb.firebaseio.com",
  projectId: "scentica-caeb4",
  storageBucket: "scentica-caeb4.firebasestorage.app",
  messagingSenderId: "467668384855",
  appId: "1:467668384855:web:f5c9ecd39e0def1be17712",
  measurementId: "G-EZ4WX4GEFB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const database =getDatabase(app);
export const storage = getStorage();


