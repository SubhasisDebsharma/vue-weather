import * as firebase from "firebase";

const state = {
  user: null,
  isLoggedIn: false
};

const getters = {
  user: state => state.user,
  isLoggedIn: state => state.isLoggedIn
};

const actions = {
  login(context, payload) {
    let provider;
    if (payload === "facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    } else {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    provider.addScope("");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const userData = getUserDetailFromFirebseUser(result.user);
        context.commit("login", userData);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  },
  silentLogin(context) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userData = getUserDetailFromFirebseUser(user);
        context.commit("login", userData);
      }
    });
  },
  logout(context) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        context.commit("logout");
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

const mutations = {
  login(state, payload) {
    state.list = payload;
    state.isLoggedIn = true;
  },
  logout(state, payload) {
    state.user = payload;
    state.isLoggedIn = false;
  }
};

export const loginStore = {
  state,
  getters,
  actions,
  mutations
};

function getUserDetailFromFirebseUser(firebaseUser) {
  return {
    email: "",
    displayName: "",
    photoURL: "",
    uid: "",
    ...firebaseUser
  };
}
