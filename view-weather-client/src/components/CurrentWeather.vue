<template>
  <v-container v-if="details" class="no-gutter">
    <v-layout column wrap>
      <v-flex>
        <slot name="header"></slot>
      </v-flex>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs6>
            <v-layout column class="text-xs-center">
              <v-flex>
                <img class="weather-icon" :src="iconUrl" :alt="iconAlt" />
              </v-flex>
              <v-flex class="fs-xxl">{{ temp }}&deg; C</v-flex>
              <v-flex class="fs-xl text-transform-capitalize">
                {{
                description
                }}
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout column class="text-small">
              <v-flex>Min Temp: {{ tempMin }} &deg; C</v-flex>
              <v-flex>Max Temp: {{ tempMax }} &deg; C</v-flex>
              <v-flex>Pressure: {{ pressure }}</v-flex>
              <v-flex>Humidity: {{ humidity }}</v-flex>
              <v-flex>Wind Speed: {{ windSpeed }} km/h</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
.text-transform-capitalize {
  text-transform: capitalize;
}
.fs-xxl {
  font-size: 2.3rem;
}
.text-small {
  font-size: 80%;
}
</style>

<script>
export default {
  data() {
    return {
      defaultIcon: require("../assets/logos/96.png")
    };
  },
  computed: {
    weather: function() {
      return this.details && this.details.weather && this.details.weather[0];
    },
    main: function() {
      return this.details && this.details.main;
    },
    wind: function() {
      return this.details && this.details.wind;
    },
    iconAlt: function() {
      return this.weather && this.weather.Clear;
    },
    iconUrl: function() {
      return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
    },
    icon: function() {
      return this.weather && this.weather.icon;
    },
    temp: function() {
      return this.main && this.main.temp;
    },
    description: function() {
      return this.weather && this.weather.description;
    },
    pressure: function() {
      return this.main && this.main.pressure;
    },
    humidity: function() {
      return this.main && this.main.humidity;
    },
    tempMin: function() {
      return this.main && this.main.temp_min;
    },
    tempMax: function() {
      return this.main && this.main.temp_max;
    },
    windSpeed: function() {
      return this.wind && this.wind.speed;
    }
  },
  props: ["details"]
};
</script>
