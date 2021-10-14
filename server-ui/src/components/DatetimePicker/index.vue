<template>
  <block v-if="!hidden">
    <div @click="showChange(true)" v-show="value" class="value">
      {{ fttValue }}
    </div>
    <div @click="showChange(true)" v-show="!value" class="placeholder">
      {{ fttValue }}
    </div>
  </block>
  <van-popup v-model:show="visible" position="bottom" round>
    <van-datetime-picker
      v-model="datetime"
      type="date"
      title="选择年月日"
      @confirm="confirm"
      @cancel="showChange(false)"
    />
  </van-popup>
</template>

<script>
import { Popup, DatetimePicker } from "vant";
import { util } from "@jws";
export default {
  emits: ["update:value", "update:show"],
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
  },
  props: {
    value: [String, Date, Number],
    hidden: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: "yyyy-MM-dd",
    },
    show: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "点击选择日期",
    },
  },
  data() {
    return {
      visible: false,
      datetime: new Date(),
    };
  },
  computed: {
    fttValue() {
      if (this.value) {
        return util.formatTime(this.value, this.format);
      }
      return this.placeholder;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (
          util.formatTime(newValue, this.format) ===
            util.formatTime(this.datetime, this.format) &&
          !newValue
        )
          return;
        if (typeof newValue === "string") {
          this.datetime = new Date(newValue);
          return;
        }
        this.datetime = newValue;
      },
    },
    show: {
      immediate: true,
      handler(visible) {
        this.visible = visible;
      },
    },
  },
  methods: {
    showChange(value) {
      this.visible = typeof value === "boolean" ? value : !this.visible;
    },
    confirm(value) {
      this.showChange();
      this.$emit(
        "update:value",
        value ? util.formatTime(value, this.format) : null
      );
    },
  },
};
</script>

<style lang="less" scoped>
.placeholder {
  color: #c8c9cc;
  width: 100%;
}
.value {
  color: #323233;
  width: 100%;
}
</style>