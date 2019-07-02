<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout wrap align-space-between justify-space-around row fill-height>
        <v-flex xs12 md8 pa-1>
          <view-weather></view-weather>
        </v-flex>
        <v-flex xs12 md4>
          <v-layout wrap row fill-height>
            <v-flex xs12 pa-1>
              <local-weather></local-weather>
            </v-flex>
            <v-flex xs-12 pa-1>
              <my-city-list></my-city-list>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

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
