<template>
  <div>
    <p>Home</p>
    <header></header>
    <view-weather></view-weather>
    <local-weather></local-weather>
    <my-city-list></my-city-list>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import LocalWeather from "@/components/LocalWeather.vue";
import MyCityList from "@/components/MyCityList.vue";
import ViewWeather from "@/components/ViewWeather.vue";
export default {
  name: "home",
  components: {
    Header,
    ViewWeather,
    LocalWeather,
    MyCityList
  }
};
</script>
