<template>
  <v-card class="width-100pc height-100pc">
    <v-container>
      <v-layout column wrap>
        <v-flex>
          <v-progress-circular
            v-if="localWeatherLoading"
            indeterminate
            color="primary"
            class="vw-align-center"
          ></v-progress-circular>
          <current-weather v-else :details="localWeather">
            <template v-slot:header>
              <span class="subheader">Local Weather:</span>
            </template>
          </current-weather>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import CurrentWeather from "./CurrentWeather";
export default {
  components: {
    CurrentWeather
  },
  computed: {
    ...mapGetters(["localWeather", "localWeatherLoading"])
  }
};
</script>
