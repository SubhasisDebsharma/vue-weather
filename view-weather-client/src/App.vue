<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    />
    <v-app id="inspire" class="app">
      <vw-header></vw-header>
      <router-view></router-view>
      <snackbar></snackbar>
    </v-app>
  </div>
</template>

<style lang="scss">
@import "./styles/index";
#app {
  font-size: 1.6rem;
  font-weight: 300;
  color: $color1;
}
</style>

<script>
import Header from "@/components/header/Header.vue";
import Snackbar from "@/components/shared/Snackbar.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "vw-header": Header,
    Snackbar
  },
  computed: {
    ...mapGetters(["savedCity", "isLoggedIn"])
  },
  methods: {
    ...mapActions([
      "silentLogin",
      "loadLocalWeather",
      "loadSavedCity",
      "getSearchWeather",
      "loadMyCities"
    ])
  },
  mounted: function() {
    this.silentLogin();
    this.loadLocalWeather();
    this.loadSavedCity();
    if (this.savedCity) {
      this.getSearchWeather(this.savedCity);
    }
  },
  watch: {
    isLoggedIn: function() {
      this.loadMyCities();
    }
  }
};
</script>
