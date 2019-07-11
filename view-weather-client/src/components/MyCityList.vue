<template>
  <v-card class="width-100pc height-100pc city-list">
    <v-container class="height-100pc">
      <v-layout
        wrap
        column
        v-if="isLoggedIn && (!!addingCityToList || (cities && cities.length))"
        class="height-100pc"
      >
        <v-flex class="city-list--header subheader">My City List:</v-flex>
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
            <city-list-item
              v-if="addingCityToList"
              class="city-list-item loading"
              :item="addingCityToList"
              :search="search"
              :searchedCity="searchedCity"
            ></city-list-item>
            <template v-for="(item, index) in filteredCities">
              <city-list-item
                class="city-list-item"
                @removeCity="removeCity($event, item)"
                @viewCity="viewCity($event, item)"
                :key="index"
                :item="item"
                :search="search"
                :searchedCity="searchedCity"
              ></city-list-item>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
      <v-layout v-else-if="!isLoggedIn" column wrap>
        <v-flex class="subheader">Please login to create your list of cities...</v-flex>
      </v-layout>
      <v-layout v-else-if="myCityListLoadnig">
        <v-progress-circular indeterminate color="primary" class="vw-align-center"></v-progress-circular>
      </v-layout>
      <v-layout v-else column wrap>
        <v-flex class="subheader">Add cities to your list</v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style lang="scss" scoped>
@import "../styles/variables";
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
  }
  .spinX {
    animation: spinX 2s ease;
  }
  .remove {
    animation: remove 1s ease-in;
  }

  .loading {
    background: #dcdcdc52;
    pointer-events: none;
    opacity: 0.7;
    position: relative;
    filter: blur(0.7px);
    &:after {
      content: "";
      display: inline-block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background: $lightgray;
      animation: spreadLoad 2s ease-in-out;
      animation-iteration-count: infinite;
      opacity: 0.6;
    }
  }

  @keyframes spreadLoad {
    0% {
      transform: scaleX(0);
      transform-origin: left;
    }
    50% {
      transform: scaleX(1);
      transform-origin: left;
    }
    51% {
      transform: scaleX(1);
      transform-origin: right;
    }
    100% {
      transform: scaleX(0);
      transform-origin: right;
    }
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
import CityListItem from "./CityListItem";
export default {
  components: {
    CityListItem
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "searchedCity",
      "myCityList",
      "myCityListLoadnig",
      "addingCityToList"
    ]),
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
      this.$emit("viewWeather", item);
    },
    removeCity(event, item) {
      this.doRemove(event).then(() => {
        const i = this.cities.findIndex(el => el.id === item.id);
        this.cities.splice(i, 1);
        this.removeCityFromList(item);
      });
    },
    doRemove(event) {
      return new Promise(resolve => {
        const ele = event.target.closest(".city-list-item");
        ele.classList.add("remove");
        setTimeout(() => {
          ele.classList.remove("remove");
          resolve();
        }, 1000);
      });
    },
    doSpin(event) {
      const ele = event.target.closest(".city-list-item");
      ele.classList.add("spinX");
      setTimeout(() => {
        ele.classList.remove("spinX");
      }, 2000);
    }
  }
};
</script>
