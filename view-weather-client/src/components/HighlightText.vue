<template>
  <span class="hightlight-text">
    <template v-if="!!matchedText">
      <span>{{ firstText }}</span>
      <span class="hightlight-text--matched">{{ matchedText }}</span>
      <span>{{ lastText }}</span>
    </template>
    <template v-else>{{ text }}</template>
  </span>
</template>

<style lang="scss" scoped>
.hightlight-text {
  .hightlight-text--matched {
    color: rgba(0, 0, 0, 0.38);
    background: #eee;
  }
}
</style>

<script>
export default {
  props: ["text", "highLight"],
  computed: {
    firstText: function() {
      const text = this.text || "";
      const highLightText = this.highLight || "";
      const lowText = text.toLowerCase();
      const lowHighLightText = highLightText.toLowerCase();

      const startIndex = lowText.indexOf(lowHighLightText);
      const firstText = text.substring(0, startIndex);
      return firstText;
    },
    matchedText: function() {
      const text = this.text || "";
      const highLightText = this.highLight || "";
      const lowText = text.toLowerCase();
      const lowHighLightText = highLightText.toLowerCase();

      const startIndex = lowText.indexOf(lowHighLightText);
      const endIndex = startIndex + lowHighLightText.length;
      const matchedText = text.substring(startIndex, endIndex);
      return matchedText;
    },
    lastText: function() {
      const text = this.text || "";
      const highLightText = this.highLight || "";
      const lowText = text.toLowerCase();
      const lowHighLightText = highLightText.toLowerCase();

      const startIndex = lowText.indexOf(lowHighLightText);
      const endIndex = startIndex + lowHighLightText.length;
      const lastText = text.substring(endIndex);
      return lastText;
    }
  }
};
</script>

<style></style>
