import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCSO3L1gJ86dkzajcJn1cYe2zet7ZWfCLo",
  authDomain: "chat-app-e4b56.firebaseapp.com",
  databaseURL: "https://chat-app-e4b56-default-rtdb.firebaseio.com",
  projectId: "chat-app-e4b56",
  storageBucket: "chat-app-e4b56.appspot.com",
  messagingSenderId: "53641753848",
  appId: "1:53641753848:web:100021d155905cb55ab70d",
  measurementId: "G-BSJKXXEDB4",
});

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };
export default firebase;
