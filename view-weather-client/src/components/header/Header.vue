<template>
  <div>
    <v-toolbar fixed app class="header">
      <router-link :to="{ name: 'home' }" title="View Weather">
        <img class="header__logo" :src="image" alt="VueWeather" />
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon :class="{ hidden: !smAndDown }" @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-avatar
        v-if="isLoggedIn"
        color="grey lighten-4"
        :class="{ hidden: smAndDown }"
        title="John Leider"
      >
        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="avatar" />
      </v-avatar>

      <div class="space" :class="{ hidden: smAndDown }"></div>

      <v-btn @click="logout()" title="Logout" v-if="isLoggedIn" icon :class="{ hidden: smAndDown }">
        <v-icon color="danger">fa-sign-out-alt</v-icon>
      </v-btn>

      <router-link class="txt-dec-none" :to="{ name: 'login' }">
        <v-btn title="Login" v-if="!isLoggedIn" color="primary" icon :class="{ hidden: smAndDown }">
          <v-icon>fa-sign-in-alt</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <drawer-content></drawer-content>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss" scoped>
@import "../../styles/class";
@import "../../styles/variables";
.header {
  background: $headerBgColor;
  .header__logo {
    width: 5rem;
    max-width: 120px;
  }
}
</style>

<script>
import DrawerContent from "./DrawerContent";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "dashboard" },
      { title: "About", icon: "question_answer" }
    ],
    image: require("@/assets/logos/256.png")
  }),
  components: {
    DrawerContent
  },
  computed: {
    smAndDown: function() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    xsOnly: function() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    ...mapGetters(["isLoggedIn"])
  },
  props: {
    source: String
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
