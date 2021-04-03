import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD2iR5tjbKHNanSTYlZP9e1V_wSilhCrSA",
  authDomain: "trade-journal-34703.firebaseapp.com",
  projectId: "trade-journal-34703",
  storageBucket: "trade-journal-34703.appspot.com",
  messagingSenderId: "889133952747",
  appId: "1:889133952747:web:23fbc09b7cdfff8acf58ae",
  measurementId: "G-PRSTWN621N",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
