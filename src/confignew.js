import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDLWR039BJbIIeY-eP-VCLmtF44YxEQdho",
  authDomain: "react-firebase-auth-6270e.firebaseapp.com",
  databaseURL: "https://manaswini-enterprises-default-rtdb.firebaseio.com",
  projectId: "manaswini-enterprises",
  storageBucket: "react-firebase-auth-6270e.appspot.com",
  messagingSenderId: "83091629514",
  appId: "1:964558490517:web:e2d8e08435bda8f7ba449c",
});

export default firebaseConfig;