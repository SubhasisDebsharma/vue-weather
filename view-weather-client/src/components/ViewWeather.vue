<template>
  <v-card class="search-city width-100pc height-100pc">
    <v-container fluid fill-height>
      <v-layout column justify-space-between fill-height>
        <div>
          <v-layout justify-start column fill-height>
            <div class="search-city--header">
              <auto-search row class="search-city--auto-search width-100pc"></auto-search>
              <div class="search-city--subheader width-100pc">
                <div v-if="searchedCity">
                  <v-icon>fa-city</v-icon>
                  <span class="search-city--subheader__label pa-1">
                    <span
                      v-if="
                        searchedWeatherForcustLoading &&
                          searchedCurrentWeatherLoading
                      "
                    >Searching</span>
                    <span v-else>Showing</span>
                    result for:
                  </span>
                  <span class="country" title="Country">
                    {{
                    searchedCity && searchedCity.country
                    }}
                  </span>
                  <span>{{ searchedCity && searchedCity.name }}</span>
                </div>
              </div>
            </div>

            <div class="main-weather">
              <v-progress-circular
                v-if="
                  searchedWeatherForcustLoading && searchedCurrentWeatherLoading
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
                      <v-layout wrap align-start row>
                        <v-flex xs12>Selector</v-flex>
                        <v-flex xs12>
                          <current-weather></current-weather>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-layout>
        </div>

        <div>
          <weather-sparkline v-if="!searchedWeatherForcustLoading"></weather-sparkline>
        </div>
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
  .search-city--auto-search {
    // height: 10rem;
  }
  .search-city--main-weather {
    // height: calc(100% - 10rem);
  }

  .main-weather {
    // padding: 0;
    //   .main-weather--details {
    //     margin: 0;
    //     padding: 0;
    //     .main-weather--city-name {
    //       font-size: 2rem;
    //       font-weight: 400;
    //       min-height: 5rem;
    //       padding: 1rem 0rem;
    //       .main-weather--city-name__label {
    //         font-size: 1rem;
    //         font-size: 1.5rem;
    //         padding-right: 1rem;
    //         color: $gray;
    //       }
    //     }
    //     .main-weather--current-weather {
    //       // height: calc(100% - 5rem - 13rem);
    //     }
    //     .main-weather--selected-weather {
    //       // height: calc(100% - 5rem - 13rem);
    //     }
    //     .main-weather--sparkline {
    //       height: 13rem;
    //     }
    //   }
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
    return {};
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
<style></style>
