<template>
  <div>
    <v-toolbar fixed app class="header">
      <router-link :to="{ name: 'home' }" title="View Weather">
        <img class="header__logo" :src="image" alt="VueWeather" />
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon
        v-if="smAndDown"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>

      <v-avatar
        v-if="isLoggedIn && !smAndDown"
        color="grey lighten-4"
        :title="userName"
      >
        <img :src="userImage" alt="avatar" />
      </v-avatar>

      <v-btn
        @click="logout()"
        icon
        title="Logout"
        v-if="isLoggedIn && !smAndDown"
      >
        <v-icon>fa-sign-out-alt</v-icon>
      </v-btn>

      <router-link class="txt-dec-none" :to="{ name: 'login' }">
        <v-btn
          title="Login"
          v-if="!isLoggedIn && !smAndDown"
          color="primary"
          icon
        >
          <v-icon>fa-sign-in-alt</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>

    <v-navigation-drawer v-if="smAndDown" v-model="drawer" fixed temporary>
      <drawer-content
        @close="drawer = !drawer"
        @logout="logout()"
        @sideNavSelect="onSideNavSelect($event)"
        :user="user"
        :isLoggedIn="isLoggedIn"
      ></drawer-content>
    </v-navigation-drawer>
    <bottom-sheet
      @open="v => (openBottomSheet = v)"
      :openBottomSheet="openBottomSheet"
      :display="bottomSheetDisplay"
      v-if="smAndDown"
    ></bottom-sheet>
  </div>
</template>

<style lang="scss" scoped>
@import "../../styles/variables";
.header {
  background: $headerBgColor;
  .header__logo {
    width: 7rem;
    max-width: 120px;
  }
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import DrawerContent from "./DrawerContent";
import BottomSheet from "./BottomSheet";
export default {
  data: () => ({
    drawer: null,
    image: require("@/assets/logos/256.png"),
    bottomSheetDisplay: "",
    openBottomSheet: false
  }),
  components: {
    DrawerContent,
    BottomSheet
  },
  computed: {
    smAndDown: function() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    ...mapGetters(["isLoggedIn", "user"]),
    userImage: function() {
      return this.user && this.user.photoURL;
    },
    userName: function() {
      return this.user && this.user.displayName;
    }
  },
  props: {
    source: String
  },
  methods: {
    ...mapActions(["logout"]),
    onSideNavSelect(option) {
      this.bottomSheetDisplay = option;
      this.openBottomSheet = true;
    }
  }
};
</script>
