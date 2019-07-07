<template>
  <v-card class="search-city width-100pc height-100pc">
    <v-container fluid fill-height>
      <v-layout column>
        <v-flex shrink class="search-city--header">
          <auto-search row class="search-city--auto-search width-100pc"></auto-search>
          <div class="search-city--subheader width-100pc">
            <div v-if="searchedCity">
              <v-icon>fa-city</v-icon>
              <span class="search-city--subheader__label pa-1">
                <span
                  v-if="
                    searchedWeatherForecastLoading &&
                      searchedCurrentWeatherLoading
                  "
                >Searching</span>
                <span v-else>Showing</span>
                result for:
              </span>
              <span class="country" title="Country">{{ searchedCity && searchedCity.country }}</span>
              <span>{{ searchedCity && searchedCity.name }}</span>
            </div>
          </div>
        </v-flex>

        <v-flex grow class="main-weather">
          <v-progress-circular
            v-if="
              searchedWeatherForecastLoading && searchedCurrentWeatherLoading
            "
            indeterminate
            color="primary"
            class="vw-align-center"
          ></v-progress-circular>
          <v-container v-else class="main-weather--details no-gutter" fill-height fluid>
            <v-layout wrap align-start row>
              <v-flex class="main-weather--current-weather" sm6 xs12>
                <v-progress-circular
                  v-if="searchedCurrentWeatherLoading"
                  indeterminate
                  color="primary"
                  class="vw-align-center"
                ></v-progress-circular>
                <current-weather :details="searchedCurrentWeather" v-else>
                  <template v-slot:header>
                    <span class="fw-400">Current Weather:</span>
                  </template>
                </current-weather>
                <v-divider v-if="xsOnly"></v-divider>
              </v-flex>
              <v-flex
                :class="{'main-weather--selected-weather': true, 'border-left-vr': !xsOnly}"
                sm6
                xs12
              >
                <v-progress-circular
                  v-if="searchedWeatherForecastLoading"
                  indeterminate
                  color="primary"
                  class="vw-align-center"
                ></v-progress-circular>
                <template v-else>
                  <v-layout v-if="searchedWeatherForecast" wrap align-start row>
                    <v-flex xs12>
                      <v-select
                        :items="searchedWeatherForecast.list"
                        item-text="dt_txt"
                        prepend-icon="fa-clock"
                        menu-props="auto"
                        label="Select Forecast Time"
                        dense
                        return-object
                        v-model="selectedForecastItem"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12>
                      <current-weather :details="selectedForecastItem"></current-weather>
                    </v-flex>
                  </v-layout>
                </template>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>

        <v-flex shrink>
          <v-layout class="temp-curve" column wrap v-if="searchedWeatherForecast">
            <v-flex shrink class="temp-curve--header fw-400">
              <v-icon class="temp-curve--header__icon">fa-chart-line</v-icon>Temperature Curve
            </v-flex>
            <v-flex>
              <weather-sparkline
                :details="searchedWeatherForecast.list"
                :selected="selectedForecastItem"
                @input="onSelectForecastItem($event)"
              ></weather-sparkline>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style lang="scss" scoped>
@import "../styles/class";
@import "../styles/variables";
.search-city {
  .search-city--subheader {
    font-size: 2rem;
    font-weight: 400;
    min-height: 5rem;
    .search-city--subheader__label {
      font-size: 1rem;
      font-size: 1.5rem;
      padding-right: 1rem;
      color: $gray;
    }
  }
  .temp-curve {
    background: $themeColor1;
    color: $white;
    .temp-curve--header {
      font-size: 1.8rem;
      padding-left: 1rem;
      padding-top: 0.5rem;
      .temp-curve--header__icon {
        color: white;
        margin-right: 1rem;
      }
    }
  }
  .border-left-vr {
    border-left: 1px solid gainsboro;
  }
}
</style>
<script>
import { mapGetters } from "vuex";
import AutoSearch from "./AutoSearch";
import CurrentWeather from "./CurrentWeather";
import WeatherSparkline from "./WeatherSparkline";

export default {
  components: {
    AutoSearch,
    CurrentWeather,
    WeatherSparkline
  },
  data() {
    return {
      selectedForecastItem: null
    };
  },
  computed: {
    xsOnly: function() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    ...mapGetters([
      "searchedCity",
      "searchedWeatherForecast",
      "searchedWeatherForecastLoading",
      "searchedCurrentWeather",
      "searchedCurrentWeatherLoading"
    ])
  },
  watch: {
    searchedWeatherForecast: function(nv) {
      this.selectedForecastItem = nv && nv.list[0];
    }
  },
  mounted: function() {
    this.selectedForecastItem =
      this.searchedWeatherForecast && this.searchedWeatherForecast.list[0];
  },
  methods: {
    onSelectForecastItem: function(item) {
      this.selectedForecastItem = item;
    }
  }
};
</script>
