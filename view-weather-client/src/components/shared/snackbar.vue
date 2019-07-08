<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" bottom :color="colorType">
    {{ text }}
    <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { SNACKBAR_TYPE } from "../../constants/snackbar.const";
export default {
  data() {
    return {
      snackbar: false,
      timeout: 6000,
      text: "",
      colorType: SNACKBAR_TYPE.INFO
    };
  },
  computed: {
    ...mapGetters(["snackbarMessage", "snackbarType"])
  },
  methods: {
    ...mapActions(["triggerSnackbar"])
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
    },
    snackbar: function(v) {
      if (!v) {
        this.triggerSnackbar();
      }
    }
  }
};
</script>

<style></style>
