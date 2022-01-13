<template>
  <van-image class="smage" :src="fullSrc" :fit="fit" :alt="alt || fullSrc" />
</template>

<script>
import { filePrefix } from "@config";
import { Image as VanImage } from "vant";
export default {
  props: {
    alt: {
      type: String,
      default: "",
    },
    fit: {
      type: String,
      default: "fill",
    },
    src: {
      type: String,
      default: "",
    },
    prefix: {
      type: [String, Boolean],
      default: true,
    },
  },
  components: {
    [VanImage.name]: VanImage,
  },
  data() {
    return {
      fullSrc: "",
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(newValue) {
        this.genFullSrc(newValue);
      },
    },
  },
  methods: {
    genFullSrc(src) {
      let fullSrc = src || this.src;
      if (!src) {
        return "";
      }
      let prefix = this.prefix;
      switch (Object.prototype.toString.call(prefix)) {
        case "[object String]":
          fullSrc = (prefix || filePrefix) + fullSrc;
          break;
        case "[object Boolean]":
          if (prefix === true) {
            fullSrc = require("../../assets/image/" + fullSrc);
          }
          break;
      }
      this.fullSrc = fullSrc;
    },
  },
};
</script>

<style lang="less" scoped>
.smage {
  overflow: hidden;
  object-fit: cover;
}
</style>