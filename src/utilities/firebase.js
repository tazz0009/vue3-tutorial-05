import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBamYc4QE7drbd0oz8o2tsCHg-Ys2Qk96w",
  authDomain: "vue-t01.firebaseapp.com",
  databaseURL: "https://vue-t01.firebaseio.com",
  projectId: "vue-t01",
  storageBucket: "vue-t01.appspot.com",
  messagingSenderId: "864460656143",
  appId: "1:864460656143:web:b5d31a105a08c1bc72dd7a",
};

firebase.initializeApp(firebaseConfig);

export default firebase;