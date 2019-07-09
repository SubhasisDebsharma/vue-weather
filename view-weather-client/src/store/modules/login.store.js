import * as firebase from "firebase";

const state = {
  user: null,
  isLoggedIn: false,
  userAuthToken: ""
};

const getters = {
  user: state => state.user,
  isLoggedIn: state => state.isLoggedIn,
  userAuthToken: state => state.userAuthToken
};

const actions = {
  login(context, payload) {
    let provider;
    if (payload === "facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    } else {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    let userData = null;
    provider.addScope("");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        userData = getUserDetailFromFirebseUser(result.user);
        return firebase.auth().currentUser.getIdToken();
      })
      .then(userAuthToken => {
        context.commit("login", userData);
        context.commit("userAuthToken", userAuthToken);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  },
  silentLogin(context) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userData = getUserDetailFromFirebseUser(user);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(userAuthToken => {
            context.commit("login", userData);
            context.commit("userAuthToken", userAuthToken);
          });
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
  userAuthToken(satate, payload) {
    state.userAuthToken = payload;
  },
  logout(state, payload) {
    state.user = payload;
    state.isLoggedIn = false;
    state.userIdToken = "";
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
