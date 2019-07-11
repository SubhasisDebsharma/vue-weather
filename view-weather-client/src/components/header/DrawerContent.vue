<template>
  <div>
    <v-list>
      <v-list-tile avatar>
        <template v-if="isLoggedIn">
          <v-list-tile-avatar>
            <img :src="userImage" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{userName}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn @click="$emit('logout')" title="Logout" icon>
              <v-icon color="danger">fa-sign-out-alt</v-icon>
            </v-btn>
          </v-list-tile-action>
        </template>
        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <router-link class="txt-dec-none" :to="{ name: 'login' }">
              <v-btn @click="$emit('login')" title="Login" icon>
                <v-icon>fa-sign-in-alt</v-icon>
              </v-btn>
            </router-link>
          </v-list-tile-action>
        </template>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        class="bg-hover"
        v-for="item in items"
        @click="onSelectOption(item)"
        :key="item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Local Weather", icon: "fa-cloud-sun", feature: "localWeather" },
      { title: "My City List", icon: "fa-city", feature: "cityList" }
    ]
  }),
  props: ["user", "isLoggedIn"],
  watch: {},
  methods: {
    close() {
      this.$emit("close");
    },
    onSelectOption(item) {
      this.$emit("sideNavSelect", item.feature);
      this.$emit("close");
    }
  },
  computed: {
    userImage() {
      return this.user && this.user.photoURL;
    },
    userName() {
      return this.user && this.user.displayName;
    }
  }
};
</script>
