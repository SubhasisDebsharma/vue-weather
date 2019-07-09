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
    <img class="cloud-img1" :src="require('../assets/images/cloud3.png')" />
    <img class="cloud-img2" :src="require('../assets/images/cloud2.png')" />
    <img class="cloud-img3" :src="require('../assets/images/cloud4.png')" />
    <div class="sky-img"></div>
  </v-content>
</template>

<style lang="scss" scoped>
@import "../styles/class";
.vw-home {
  .vw-home--view-weather {
    animation: heightOut 700ms ease;
  }
  .vw-home--local-weather {
    animation: heightOut 700ms ease;
  }
  .vw-home--city-list {
    max-height: 33rem;
    animation: heightOut 700ms ease;
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
    animation: moveLeftDownIn2 3s ease-in 1s;
    animation-fill-mode: backwards;
  }
  .cloud-img3 {
    @extend .cloud-img;
    animation: moveLeftDownIn3 3s ease-in;
    animation-fill-mode: backwards;
  }

  .sky-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    display: block;
    animation: displayHide 4s ease;
    background: linear-gradient(
      to top,
      rgba($darkblue, 0.7),
      rgba($lightBlue, 0.7)
    );
  }

  @keyframes displayHide {
    0% {
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 1;
    }
    50% {
      width: 100%;
      height: 100%;
      opacity: 0.2;
      z-index: 1;
    }
    75% {
      width: 100%;
      height: 100%;
      opacity: 0.3;
      z-index: 1;
    }
    100% {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  @keyframes heightOut {
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
      opacity: 1;
      transform: translateX(-110%) scale(1);
    }
    80% {
      z-index: 1000;
      width: auto;
      height: auto;
      opacity: 1;
    }
    100% {
      z-index: 1000;
      width: auto;
      height: auto;
      transform: translateX(90vw) scale(1);
      opacity: 0;
    }
  }
  @keyframes moveLeftDownIn2 {
    0% {
      z-index: 1000;
      width: auto;
      height: auto;
      opacity: 1;
      transform: translateX(-110%);
    }
    80% {
      z-index: 1000;
      width: auto;
      height: auto;
      opacity: 1;
    }
    100% {
      z-index: 1000;
      width: auto;
      height: auto;
      transform: translateX(90vw);
      opacity: 0;
    }
  }
  @keyframes moveLeftDownIn3 {
    0% {
      z-index: 1000;
      width: auto;
      height: auto;
      opacity: 1;
      transform: translateX(-120%);
    }
    80% {
      z-index: 1000;
      width: auto;
      height: auto;
      opacity: 1;
    }
    100% {
      z-index: 1000;
      width: auto;
      height: auto;
      transform: translateX(90vw);
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
