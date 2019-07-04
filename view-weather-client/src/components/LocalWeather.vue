<template>
  <v-card class="width-100pc height-100pc">
    Local Weather
    <current-weather></current-weather>
  </v-card>
</template>

<style lang="scss" scoped>
@import "../styles/class";
</style>

<script>
import CurrentWeather from "./CurrentWeather";
export default {
  components: {
    CurrentWeather
  }
};
</script>
