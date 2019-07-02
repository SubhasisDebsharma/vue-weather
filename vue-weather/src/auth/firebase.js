import firebase from "firebase/app";
import firebaseConfig from "./firebase.config.js";

// firebase.initializeApp(firebaseConfig);

export default {
  initializeApp: () => {
    firebase.initializeApp(firebaseConfig);
  }
};
