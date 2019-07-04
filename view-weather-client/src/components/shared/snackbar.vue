<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" top :color="colorType">
    {{ text }}
    <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
import { SNACKBAR_TYPE } from "../../constants/snackbar.const";
export default {
  data() {
    return {
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "",
      colorType: SNACKBAR_TYPE.INFO
    };
  },
  computed: {
    ...mapGetters(["snackbarMessage", "snackbarType"])
  },
  watch: {
    snackbarMessage: function(nv) {
      if (nv) {
        this.text = nv;
        this.snackbar = true;
      } else {
        this.snackbar = false;
      }
    },
    snackbarType: function(nv) {
      if (nv) {
        this.colorType = nv;
      } else {
        this.colorType = SNACKBAR_TYPE.INFO;
      }
    }
  }
};
</script>

<style></style>
