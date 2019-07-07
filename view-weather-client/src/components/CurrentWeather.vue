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
                <img :src="iconUrl" :alt="iconAlt" />
              </v-flex>
              <v-flex class="fs-xxl">{{temp}}&deg; F</v-flex>
              <v-flex class="fs-xl text-transform-capitalize">{{description}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout column class="text-small">
              <v-flex>Min Temp: {{tempMin}} &deg; F</v-flex>
              <v-flex>Max Temp: {{tempMax}} &deg; F</v-flex>
              <v-flex>Pressure: {{pressure}}</v-flex>
              <v-flex>Humidity: {{humidity}}</v-flex>
              <v-flex>Wind Speed: {{windSpeed}} km/h</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
@import "../styles/class";
@import "../styles/variables";
</style>


<script>
export default {
  data() {
    return {
      defaultIcon: require("../assets/logos/96.png")
    };
  },
  computed: {
    iconAlt: function() {
      return this.details && this.details.weather[0].Clear;
    },
    iconUrl: function() {
      return `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
    },
    icon: function() {
      return this.details && this.details.weather[0].icon;
    },
    temp: function() {
      return this.details && this.details.main.temp;
    },
    description: function() {
      return this.details && this.details.weather[0].description;
    },
    pressure: function() {
      return this.details && this.details.main.pressure;
    },
    humidity: function() {
      return this.details && this.details.main.humidity;
    },
    tempMin: function() {
      return this.details && this.details.main.temp_min;
    },
    tempMax: function() {
      return this.details && this.details.main.temp_max;
    },
    windSpeed: function() {
      return this.details && this.details.wind.speed;
    }
  },
  props: ["details"]
};
</script>
