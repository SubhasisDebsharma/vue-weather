<template>
  <v-content class="vw-home">
    <v-container fluid fill-height>
      <v-layout wrap align-space-between row fill-height>
        <v-flex xs12 md8 pa-1 class="vw-home--view-weather">
          <view-weather></view-weather>
        </v-flex>
        <v-flex xs12 md4>
          <v-layout wrap column fill-height>
            <v-flex pa-1 class="vw-home--local-weather">
              <local-weather></local-weather>
            </v-flex>
            <v-flex pa-1 class="vw-home--city-list">
              <my-city-list></my-city-list>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <img class="cloud-img1" :src="require('../assets/images/cloud1.png')" />
    <img class="cloud-img2" :src="require('../assets/images/cloud1.png')" />
    <img class="cloud-img3" :src="require('../assets/images/cloud1.png')" />
  </v-content>
</template>

<style lang="scss" scoped>
@import "../styles/class";
.vw-home {
  .vw-home--view-weather {
    animation: hightOut 700ms ease;
  }
  .vw-home--local-weather {
    animation: hightOut 700ms ease;
  }
  .vw-home--city-list {
    max-height: 33rem;
    animation: hightOut 700ms ease;
  }
  .cloud-img {
    width: 0;
    height: 0;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
  }
  .cloud-img1 {
    @extend .cloud-img;
    animation: moveLeftDownIn1 3s ease-in;
    animation-fill-mode: backwards;
  }
  .cloud-img2 {
    @extend .cloud-img;
    animation: moveLeftDownIn2 2.5s ease-in;
    animation-fill-mode: backwards;
  }
  .cloud-img3 {
    @extend .cloud-img;
    animation: moveLeftDownIn3 3s ease-in;
    animation-fill-mode: backwards;
  }

  @keyframes hightOut {
    0% {
      opacity: 0;
      transform: scaleY(0);
      transform-origin: top;
    }
    100% {
      opacity: 1;
      transform: scaleY(1);
      transform-origin: top;
    }
  }

  @keyframes moveLeftDownIn1 {
    0% {
      z-index: 1000;
      width: auto;
      height: auto;
      opacity: 0.8;
      transform: translateY(50px) translateX(-150%) scale(1.01);
    }
    100% {
      z-index: 1000;
      width: auto;
      height: auto;
      transform: translateY(0px) translateX(80vw) scale(0.8);
      opacity: 0;
    }
  }
  @keyframes moveLeftDownIn2 {
    0% {
      z-index: 1000;
      width: auto;
      height: auto;
      opacity: 0.8;
      transform: translateY(200px) translateX(-150%) scale(1.5);
    }
    100% {
      z-index: 1000;
      width: auto;
      height: auto;
      transform: translateY(125px) translateX(80vw) scale(1);
      opacity: 0;
    }
  }
  @keyframes moveLeftDownIn3 {
    0% {
      z-index: 1000;
      width: auto;
      height: auto;
      opacity: 0.8;
      transform: translateY(400px) translateX(-150%) scale(2);
    }
    100% {
      z-index: 1000;
      width: auto;
      height: auto;
      transform: translateY(300px) translateX(80vw) scale(1.5);
      opacity: 0;
    }
  }
}
</style>

<script>
import LocalWeather from "@/components/LocalWeather.vue";
import MyCityList from "@/components/MyCityList.vue";
import ViewWeather from "@/components/ViewWeather.vue";
export default {
  name: "home",
  components: {
    ViewWeather,
    LocalWeather,
    MyCityList
  }
};
</script>
