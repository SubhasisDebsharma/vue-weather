<template>
  <v-card-text>
    <template v-if="weatherAPILoading">
      <v-progress-circular indeterminate color="primary" class="vw-align-center"></v-progress-circular>
    </template>
    <template v-else>
      <div>{{ searchedWeather && searchedWeather.list[0] }}</div>
    </template>
  </v-card-text>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["searchedWeather", "weatherAPILoading"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/class";
@import "../styles/variables";
</style>

