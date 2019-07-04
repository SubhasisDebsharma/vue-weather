<template>
  <v-card class="search-city width-100pc height-100pc">
    <!-- <v-card-title class="search-city--header">Search city and View Weather</v-card-title> -->
    <auto-search class="search-city--auto-search"></auto-search>
    <main-weather-portal></main-weather-portal>
  </v-card>
</template>

<style lang="scss" scoped>
@import "../styles/class";
@import "../styles/variables";
.search-city {
  .search-city--header {
    background: $themeColor2;
    color: $white;
  }
}
</style>
<script>
import AutoSearch from "./AutoSearch";
import MainWeatherPortal from "./MainWeatherPortal";
export default {
  components: {
    AutoSearch,
    MainWeatherPortal
  },
  data() {
    return {};
  }
};
</script>
<style></style>
