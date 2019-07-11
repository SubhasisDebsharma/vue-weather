import firebase from "firebase/app";
import firebaseConfig from "./firebase.config.js";

export default {
  initializeApp: () => {
    firebase.initializeApp(firebaseConfig);
  }
};
