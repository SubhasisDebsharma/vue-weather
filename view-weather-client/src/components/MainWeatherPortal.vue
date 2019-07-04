<template>
  <v-card-text class="main-weather">
    <v-progress-circular
      v-if="searchedWeatherForcustLoading && searchedCurrentWeatherLoading"
      indeterminate
      color="primary"
      class="vw-align-center"
    ></v-progress-circular>
    <v-container v-else class="main-weather--details height-100pc" fluid>
      <v-layout wrap align-start row class="height-100pc">
        <v-flex class="main-weather--city-name" xs12>
          <div v-if="searchedCity">
            <span class="main-weather--city-name__label"
              >Showing result for:</span
            >
            <span class="country" title="Country">{{
              searchedCity && searchedCity.country
            }}</span>
            <span>{{ searchedCity && searchedCity.name }}</span>
          </div>
        </v-flex>
        <v-flex class="main-weather--current-weather" sm6 xs12>
          <v-progress-circular
            v-if="searchedCurrentWeatherLoading"
            indeterminate
            color="primary"
            class="vw-align-center"
          ></v-progress-circular>
          <current-weather v-else></current-weather>
        </v-flex>
        <v-flex class="main-weather--selected-weather" sm6 xs12>
          <v-progress-circular
            v-if="searchedWeatherForcustLoading"
            indeterminate
            color="primary"
            class="vw-align-center"
          ></v-progress-circular>
          <template v-else>
            <current-weather></current-weather>
          </template>
        </v-flex>
        <v-flex class="main-weather--sparkline" xs12>
          <weather-sparkline
            v-if="!searchedWeatherForcustLoading"
          ></weather-sparkline>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-text>
</template>

<style lang="scss" scoped>
@import "../styles/class";
@import "../styles/variables";
.main-weather {
  padding-top: 0;
  .main-weather--details {
    margin: 0;
    padding: 0;
    .main-weather--city-name {
      font-size: 2rem;
      font-weight: 400;
      min-height: 5rem;
      padding: 1rem 0rem;
      .main-weather--city-name__label {
        font-size: 1rem;
        font-size: 1.5rem;
        padding-right: 1rem;
        color: $gray;
      }
    }
    .main-weather--current-weather {
      // height: calc(100% - 5rem - 13rem);
    }
    .main-weather--selected-weather {
      // height: calc(100% - 5rem - 13rem);
    }
    .main-weather--sparkline {
      height: 13rem;
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import CurrentWeather from "./CurrentWeather";
import WeatherSparkline from "./WeatherSparkline";
export default {
  components: {
    CurrentWeather,
    WeatherSparkline
  },
  computed: {
    ...mapGetters([
      "searchedCity",
      "searchedWeatherForcust",
      "searchedWeatherForcustLoading",
      "searchedCurrentWeather",
      "searchedCurrentWeatherLoading"
    ])
  }
};
</script>
