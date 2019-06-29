<template>
  <div>
    <v-toolbar fixed app class="header" color="#c9ecf4">
      <img class="header__logo" :src="image" alt="VueWeather">
      <v-spacer></v-spacer>
      <v-toolbar-side-icon :class="{hidden: !smAndDown}" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-avatar color="grey lighten-4" v-on="on" :class="{hidden: smAndDown}">
            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="avatar">
          </v-avatar>
        </template>
        <span>John Leider</span>
      </v-tooltip>
      <div class="space" :class="{hidden: smAndDown}"></div>
      <v-tooltip bottom margin-left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :class="{hidden: smAndDown}">
            <v-icon color="red">logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <drawer-content></drawer-content>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss" scoped>
@import "../../styles/class";
.header {
  .header__logo {
    width: 5rem;
    max-width: 120px;
  }
}
</style>

<script>
import DrawerContent from "./DrawerContent";
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
    }
  },
  props: {
    source: String
  }
};
</script>
