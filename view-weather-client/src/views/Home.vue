<template>
  <v-content>
    <v-container class="vw-home" fluid fill-height>
      <v-layout wrap align-space-between justify-space-around row fill-height>
        <v-flex xs12 md8 pa-1>
          <view-weather class="vw-home--view-weather"></view-weather>
        </v-flex>
        <v-flex xs12 md4>
          <v-layout wrap row fill-height>
            <v-flex xs12 pa-1>
              <local-weather class="vw-home--local-weather"></local-weather>
            </v-flex>
            <v-flex xs-12 pa-1>
              <my-city-list class="vw-home--city-list"></my-city-list>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
.vw-home {
  .vw-home--view-weather {
    animation: hightOut 700ms ease;
  }
  .vw-home--local-weather {
    animation: hightOut 700ms ease;
  }
  .vw-home--city-list {
    animation: hightOut 700ms ease;
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
