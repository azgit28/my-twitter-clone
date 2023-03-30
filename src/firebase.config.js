// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgNQ8qOHc6XTo6P7Oa1lZqPPnFR8OFWgE",
  authDomain: "e-tech-projects.firebaseapp.com",
  projectId: "e-tech-projects",
  storageBucket: "e-tech-projects.appspot.com",
  messagingSenderId: "445500639770",
  appId: "1:445500639770:web:f608fa8e232ef11a521fa3",
  measurementId: "G-D7V5E9PS2Z",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

var apps = getApps();
var app;
try {
  if (!apps?.length) {
    app = initializeApp(firebaseConfig);
  }
} catch (error) {
  console.log("Firebase error:", error);
}
// console.log(app);

// const analytics = getAnalytics();
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, storage, auth };
