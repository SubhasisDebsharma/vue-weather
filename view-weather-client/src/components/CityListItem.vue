<template>
  <v-list-tile class="bg-hover city-item">
    <v-list-tile-avatar class="city-item--delete-avatar">
      <v-btn
        class="no-gutter scale-85"
        title="Remove from list"
        ripple
        flat
        icon
        color="#808080"
        @click="$emit('removeCity', $event)"
      >
        <v-icon>fa-lg fa-trash</v-icon>
      </v-btn>
    </v-list-tile-avatar>

    <span
      class="country no-margin city-item--conuntry"
      title="Country"
      v-html="item.country"
    ></span>

    <v-list-tile-content>
      <highlight-text :text="item.name" :highLight="search"></highlight-text>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-btn
        @click="$emit('viewCity', $event)"
        icon
        ripple
        flat
        title="View Weather"
        :color="item === searchedCity ? 'primary' : '#808080'"
      >
        <v-icon>fa-cloud-sun</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<style lang="scss" scoped>
@import "../styles/class";
.city-item {
  padding-left: 0;
  .city-item--conuntry {
    margin-right: 1rem;
  }
  .city-item--delete-avatar {
    min-width: auto;
  }
}
</style>

<script>
import HighlightText from "./HighlightText";
export default {
  props: ["item", "search", "searchedCity"],
  components: {
    HighlightText
  }
};
</script>
