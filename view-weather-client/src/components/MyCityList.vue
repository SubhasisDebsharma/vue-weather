<template>
  <v-card class="width-100pc height-100pc city-list">
    <v-container class="height-100pc">
      <v-layout wrap column v-if="isLoggedIn && cities && cities.length" class="height-100pc">
        <v-flex class="city-list--header subheader">My List:</v-flex>
        <v-flex class="city-list--search">
          <v-text-field
            label="Start typing to search"
            clearable
            prepend-icon="fa-search"
            v-model="search"
          ></v-text-field>
        </v-flex>
        <v-flex class="height-100pc city-list--items">
          <v-list dense light>
            <template v-for="(item, index) in filteredCities">
              <v-list-tile class="bg-hover city-list--item" :key="index + 'C'">
                <v-list-tile-avatar class="city-list--delete-avatar">
                  <v-btn
                    class="no-gutter scale-85"
                    title="Remove from list"
                    ripple
                    flat
                    icon
                    color="#808080"
                    @click="removeCity($event, item)"
                  >
                    <v-icon>fa-lg fa-trash</v-icon>
                  </v-btn>
                </v-list-tile-avatar>

                <span
                  class="country no-margin city-list--item__conuntry"
                  title="Country"
                  v-html="item.country"
                ></span>

                <v-list-tile-content>
                  <highlight-text :text="item.name" :highLight="search"></highlight-text>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn
                    @click="viewCity($event, item)"
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
              <!-- <v-divider inset :key="index + 'D'"></v-divider> -->
            </template>
          </v-list>
        </v-flex>
      </v-layout>
      <v-layout v-else-if="!isLoggedIn" column wrap>
        <v-flex class="subheader">Please login to create your list of cities...</v-flex>
      </v-layout>
      <v-layout v-else column wrap>
        <v-flex class="subheader">Add cities to your list</v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style lang="scss" scoped>
@import "../styles/class";
.city-list {
  .city-list--header {
    height: 2.5rem;
  }
  .city-list--search {
    height: 5.2rem;
  }
  .city-list--items {
    height: calc(100% - 7.7rem);
    overflow-y: auto;
    overflow-x: hidden;
    .city-list--item {
      padding-left: 0;
      .city-list--item__conuntry {
        margin-right: 1rem;
      }
      .city-list--delete-avatar {
        min-width: auto;
      }
    }
  }
  .spinX {
    animation: spinX 2s ease;
  }
  .remove {
    animation: remove 1s ease-in;
  }
  @keyframes remove {
    0% {
      box-shadow: 0 0.5rem 1rem gray;
    }
    100% {
      opacity: 0;
      transform: rotate(-45deg) translateY(50%) scale(0.4) rotateX(360deg);
      transform-origin: right;
    }
  }
  @keyframes spinX {
    100% {
      transform: rotateX(360deg);
    }
  }
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import HighlightText from "./HighlightText";
export default {
  components: {
    HighlightText
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "searchedCity", "myCityList"]),
    cities: function() {
      return [...this.myCityList];
    },
    filteredCities: function() {
      const search = this.search || "";
      return this.cities.filter(el =>
        el.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(["getSearchWeather", "removeCityFromList"]),
    viewCity: function(event, item) {
      this.doSpin(event);
      this.getSearchWeather(item);
    },
    removeCity(event, item, index) {
      this.doRemove(event).then(d => {
        const i = this.cities.findIndex(el => el.id === item.id);
        this.cities.splice(i, 1);
        this.removeCityFromList(item);
      });
    },
    doRemove(event) {
      return new Promise((resolve, reject) => {
        const ele = event.target.closest(".city-list--item");
        ele.classList.add("remove");
        setTimeout(() => {
          ele.classList.remove("remove");
          resolve();
        }, 1000);
      });
    },
    doSpin(event) {
      const ele = event.target.closest(".city-list--item");
      ele.classList.add("spinX");
      setTimeout(() => {
        ele.classList.remove("spinX");
      }, 2000);
    }
  }
};
</script>
