<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="searchAPIProgress"
    :search-input.sync="search"
    color="#8096ce"
    hide-no-data
    hide-selected
    item-text="name"
    label="Search city and View Weather"
    placeholder="Start typing to Search"
    prepend-icon="fa-search"
    return-object
    auto-select-first
    dense
    clearable
    @input="onInput($event)"
  >
    <template v-slot:selection="data">
      <span>
        {{ data.item.name }}
        <sub class="country" title="Country">{{ data.item.country }}</sub>
      </span>
    </template>
    <template v-slot:item="data">
      <span>
        <highlight-text :text="data.item.name" :highLight="search">
          <template v-slot:after>
            <sub class="country" title="Country">{{ data.item.country }}</sub>
          </template>
        </highlight-text>
      </span>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HighlightText from "./HighlightText";
export default {
  components: {
    HighlightText
  },
  data() {
    return {
      model: null,
      search: "",
      searchTimeout: null
    };
  },
  watch: {
    search: function(nv) {
      this.setTimeWait(
        () => {
          this.loadAutoSearch(nv);
        },
        () => {
          if (nv && nv.length >= 3) {
            const lowNv = nv.toLowerCase();
            const itemPresent = this.items.some(item => {
              return item.name.toLowerCase().includes(lowNv);
            });
            return !itemPresent;
          }
          return false;
        },
        1000
      );
    }
  },
  methods: {
    setTimeWait: function(cb, shouldCall, timeWait) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(() => {
        if (shouldCall()) {
          cb();
        }
      }, timeWait);
    },
    onInput: function(event) {
      if (event) {
        this.getSearchWeather(event);
      }
    },
    ...mapActions(["loadAutoSearch", "getSearchWeather"])
  },
  computed: {
    ...mapGetters({
      searchAPIProgress: "searchAPIProgress",
      items: "autoSearchList"
    })
  }
};
</script>
<style></style>
