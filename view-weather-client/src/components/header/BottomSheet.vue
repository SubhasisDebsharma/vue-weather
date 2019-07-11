<template>
  <v-bottom-sheet v-model="sheet" full-width>
    <v-container class="no-gutter bottom-sheet z-index-up">
      <v-layout wrap column>
        <v-flex class="bottom-sheet--close-btn">
          <v-btn @click="sheet = false" flat icon color="primary" class="vw-align-center">
            <v-icon>fa-angle-down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex class="bottom-sheet--content">
          <template v-if="display === 'localWeather'">
            <local-weather></local-weather>
          </template>
          <template v-else-if="display === 'cityList'">
            <my-city-list @viewWeather="sheet = false"></my-city-list>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </v-bottom-sheet>
</template>

<style lang="scss" scoped>
@import "../../styles/class";
@import "../../styles/variables";
.bottom-sheet {
  background: $white;
  .bottom-sheet--content {
    height: 60vh;
  }
}
</style>


<script>
import LocalWeather from "../LocalWeather";
import MyCityList from "../MyCityList";
export default {
  components: {
    LocalWeather,
    MyCityList
  },
  props: ["display", "openBottomSheet"],
  computed: {
    sheet: {
      get: function() {
        return this.openBottomSheet;
      },
      set: function(v) {
        this.$emit("open", v);
      }
    }
  }
};
</script>
