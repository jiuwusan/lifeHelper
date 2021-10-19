<template>
  <div class="page-box">
    <van-calendar
      type="multiple"
      title="日历"
      :poppable="false"
      :show-confirm="false"
      class="calendar"
      :min-date="minDate"
      :max-date="maxDate"
      readonly
      :default-date="valuelist"
    />
    <div class="btn-box">
      <van-button round block type="primary" class="btn" @click="clock">
        立即打卡
      </van-button>
    </div>
    <van-calendar
      v-model:show="show"
      color="#1989fa"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import { stickApi } from "@/api";
import { Calendar, Button } from "vant";
import { util } from "@jws";
export default {
  components: {
    [Calendar.name]: Calendar,
    [Button.name]: Button,
  },
  data() {
    return {
      minDate: new Date(2021, 1, 1),
      maxDate: new Date(2099, 12, 31),
      valuelist: null,
      show: false,
    };
  },
  mounted() {
    this.queryAll();
  },
  methods: {
    formatter(day) {
      return day;
    },
    clock() {
      this.show = true;
    },
    confirm(value) {
      this.complete(util.formatTime(value, "yyyy-MM-dd hh:mm:ss"));
    },
    async queryAll() {
      let result = (await stickApi.queryAll()) || [];
      let dateArray = [];
      result.forEach((item) => {
        dateArray.push(new Date(item.datetime));
      });
      //处理空数组
      if (dateArray.length === 0) {
        result = null;
      }
      this.valuelist = dateArray;
    },
    async complete(datetime) {
      let { typeid, userid } = this;
      await stickApi.complete({ typeid, userid, datetime });
      this.queryAll();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

.page-box {
  .box();
  .flex();
  flex-direction: column;
  height: calc(100vh - 46px);
  .calendar {
    height: calc(100vh - 100px);
  }
  .btn-box {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    width: 100%;
    .box();
    .flex();
    flex-grow: 1;
    background: #fff;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    .btn {
      border: none;
      background: linear-gradient(to right, #ff6034, #ee0a24);
    }
  }
}
</style>