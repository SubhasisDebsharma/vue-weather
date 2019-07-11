<template>
  <v-content class="login">
    <v-container fluid fill-height>
      <v-layout justify-space-around wrap column>
        <div class="view-weather">
          <span class="view-weather--text">View Weather</span>
        </div>
        <div>
          <v-card class="z-index-up login--card">
            <v-container fluid>
              <v-layout wrap fill-height column class="login-text fw-400">
                <div class="text-xs-center login-text--ad fs-xl">Get your weather report ready</div>
                <div class="text-xs-center login-text">
                  <p>Signin with social media</p>
                </div>
                <v-layout align-center justify-center wrap row>
                  <v-btn
                    @click="login('facebook')"
                    title="Signin with Facebook"
                    fab
                    dark
                    large
                    color="#3b5998"
                    class="opacity-normal"
                  >
                    <v-icon dark>fab fa-facebook-f</v-icon>
                  </v-btn>
                  <v-btn
                    @click="login('gamil')"
                    title="Signin with Google"
                    fab
                    dark
                    large
                    color="#DB4437"
                    class="opacity-normal"
                  >
                    <v-icon dark>fab fa-google</v-icon>
                  </v-btn>
                </v-layout>
              </v-layout>
            </v-container>
          </v-card>
        </div>
      </v-layout>
    </v-container>
    <video playsinline autoplay muted loop id="myVideo" :poster="videoPoster">
      <source :src="videoURL" type="video/mp4" />
    </video>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      videoURL:
        "https://firebasestorage.googleapis.com/v0/b/viewweather-a2bc9.appspot.com/o/rain.mp4?alt=media&token=773a9a34-e543-477f-be4e-147d97e1f0ba",
      videoPoster: require("@/assets/images/rain1.jpg")
    };
  },
  methods: {
    login(at) {
      this.actionLogin(at);
    },
    ...mapActions({
      actionLogin: "login"
    })
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  watch: {
    isLoggedIn: function(loggedIn) {
      if (loggedIn) {
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.login {
  // background: linear-gradient(
  //     to right top,
  //     rgba($green, 0.5),
  //     rgba($white, 0.7),
  //     rgba($lightBlue, 0.7)
  //   ),
  //   url("../assets/images/rain1.jpg");
  // background-size: cover;
  // background-position: top;
  // position: relative;
  .login--card {
    opacity: 0.8;
    animation: appear 1s ease-out 0.2s;
    animation-fill-mode: backwards;
    .opacity-normal {
      opacity: 1;
    }
  }
  .view-weather {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 2.6rem;
    color: $white;
    text-shadow: 0px 2px 10px $black;
    letter-spacing: 1.6rem;
    text-align: center;
    // filter: opacity(0.6);
    opacity: 0.8;
    animation: moveInBottomTilt 1s ease-out 0.5s;
    animation-fill-mode: backwards;
    .view-weather--text {
      position: relative;
      z-index: 1;
    }
  }
  .login-text {
    color: rgba($color1, 0.8);
    .login-text--ad {
      text-transform: uppercase;
      padding-top: 1rem;
    }
  }
  #myVideo {
    pointer-events: none;
    opacity: 0.4;
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
  }
  @keyframes moveInBottomTilt {
    0% {
      opacity: 0;
      transform: translateY(3rem);
    }
    75% {
      transform: translateY(-0.5rem);
    }
    100% {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  }
}
</style>
