<template>
  <v-list-tile
    @click="$emit('viewCity', $event)"
    class="bg-hover city-item relative"
    :selected="selected"
  >
    <v-list-tile-content>
      <highlight-text :text="item.name" :highLight="search">
        <template v-slot:after>
          <sub class="country city-item--conuntry" title="Country" v-html="item.country"></sub>
        </template>
      </highlight-text>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-btn
        class="no-gutter scale-85"
        title="Remove from list"
        ripple
        flat
        icon
        color="#808080"
        @click.stop="$emit('removeCity', $event)"
      >
        <v-icon>fa-lg fa-trash</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.city-item {
  padding-left: 0;
  .city-item--delete-avatar {
    min-width: auto;
  }
  .scale-85 {
    transform: scale(0.85);
  }
}
</style>
<style lang="scss">
.city-item {
  [selected="selected"] {
    background: whitesmoke;
  }
}
</style>


<script>
import HighlightText from "./HighlightText";
export default {
  props: ["item", "search", "searchedCity"],
  components: {
    HighlightText
  },
  computed: {
    selected() {
      return this.item === this.searchedCity;
    }
  }
};
</script>
