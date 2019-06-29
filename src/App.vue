<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    />
    <v-app id="inspire">
      <router-view></router-view>
    </v-app>
  </div>
</template>

<style lang="scss">
@import "./styles/index";
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  font-size: 1.6rem;
}
</style>
