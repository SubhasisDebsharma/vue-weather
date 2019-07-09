<template>
  <v-sparkline
    :value="tempList"
    stroke-linecap="round"
    color="white"
    line-width="2"
    padding="16"
    :gradient="['#ff9300', '#f5ff00', '#00ffe2']"
    show-labels
    smooth
    class="sparkline"
  >
    <template v-slot:label="item">
      <tspan
        :class="{ lt: true, disable: !canViewPrevious }"
        @click="onArrowClick(-1)"
        v-if="item.index === 0"
      >&#xf060; &nbsp;</tspan>

      <template v-if="list[item.index] === selectedItem">
        <tspan @click="onSelect(list[item.index])" class="selectedItem">
          {{
          list[item.index].main.temp
          }}&deg; F
        </tspan>
      </template>

      <template v-else>
        <tspan @click="onSelect(list[item.index])" class="not-selectedItem">
          {{
          list[item.index].main.temp
          }}&deg; F
        </tspan>
      </template>

      <tspan
        :class="{ gt: true, disable: !canViewNext }"
        @click="onArrowClick(+1)"
        v-if="item.index === 4"
      >&nbsp; &#xf061;</tspan>
    </template>
  </v-sparkline>
</template>

<style lang="scss" scoped>
@import "../styles/class";
@import "../styles/variables";
.sparkline {
  background: $themeColor1;
  color: $white;
  font-weight: 400;
  height: 13rem;
  .selectedItem {
    fill: ivory white;
    font-weight: bold;
    font-size: 105%;
    text-shadow: 2px 2px 5px black;
    cursor: pointer;
  }
  .not-selectedItem {
    fill: $white;
    cursor: pointer;
  }
  .lt,
  .gt {
    font-family: "Font Awesome\ 5 Free";
    font-weight: bold;
    font-size: 150%;
    cursor: pointer;
  }
  .disable {
    font-size: 100%;
    pointer-events: none;
    fill: lightgray;
  }
}
</style>

<script>
export default {
  data() {
    return {
      list: [],
      localSelectedItem: null
    };
  },
  computed: {
    selectedItem: {
      get: function() {
        return this.selected || this.localSelectedItem;
      },
      set: function(v) {
        this.localSelectedItem = v;
      }
    },
    canViewPrevious: function() {
      return this.details.indexOf(this.list[0]) > 0;
    },
    canViewNext: function() {
      return (
        this.details.indexOf(this.list[this.list.length - 1]) <
        this.details.length - 1
      );
    },
    tempList: function() {
      return this.list.map(l => l.main.temp);
    }
  },
  watch: {
    selectedItem: function() {
      this.setList();
    }
  },
  props: ["details", "selected"],
  methods: {
    onSelect: function(item) {
      this.$emit("input", item);
    },
    onArrowClick: function(offset) {
      const firstObject = this.list[0];
      const firstIndex = this.details.indexOf(firstObject);
      let startIndex = firstIndex;
      startIndex = startIndex + offset < 0 ? 0 : startIndex + offset;
      startIndex =
        startIndex + 5 > this.details.length
          ? this.details.length - 5
          : startIndex;
      this.list = this.details.slice(startIndex, startIndex + 5);
    },
    setList: function() {
      if (this.list && this.list.includes(this.selectedItem)) {
        return this.list;
      }
      if (this.details && this.details.length) {
        const itemIndex = this.details.indexOf(this.selectedItem);
        let startIndex = itemIndex - 2 < 0 ? 0 : itemIndex - 2;
        startIndex =
          startIndex + 5 > this.details.length
            ? this.details.length - 5
            : startIndex;
        this.list = this.details.slice(startIndex, startIndex + 5);
      } else {
        this.list = [];
      }
      return this.list;
    }
  },
  mounted: function() {
    if (this.details) {
      this.selectedItem = this.details[0];
      this.setList();
    }
  }
};
</script>
