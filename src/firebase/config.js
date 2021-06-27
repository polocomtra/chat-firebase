import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDEnF0k1CuG9HsDgY-MzhOHuJioHqneib4",
    authDomain: "chat-firebase-760fa.firebaseapp.com",
    projectId: "chat-firebase-760fa",
    storageBucket: "chat-firebase-760fa.appspot.com",
    messagingSenderId: "785190459908",
    appId: "1:785190459908:web:55407a610fd3ff75013351",
    measurementId: "G-JHMS0G1X94",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//config auth,database
const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if(window.location.hostname==='localhost'){
    db.useEmulator('localhost','8081')
}

export { auth, db };
export default firebase;