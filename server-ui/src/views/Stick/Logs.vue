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
      :formatter="formatter"
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
import { Calendar, Button, Toast } from "vant";
import { util } from "@jws";
export default {
  components: {
    [Calendar.name]: Calendar,
    [Button.name]: Button,
  },
  data() {
    return {
      minDate: new Date(2021, 1, 1),
      maxDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      valuelist: null,
      show: false,
      typeid: "",
      dateStrArray: [],
      renderRandom: Math.random(),
    };
  },
  mounted() {
    let { typeid } = this.$route.params || {};
    this.queryAll(typeid);
    this.typeid = typeid;
  },
  methods: {
    formatter(day) {
      if (
        this.dateStrArray.indexOf(
          util.formatTime(day.date, "yyyy-MM-dd hh:mm:ss")
        ) > -1
      ) {
        day.type = "selected";
      } else {
        day.type = "disabled";
      }
      return day;
    },
    clock() {
      this.show = true;
    },
    confirm(value) {
      this.complete(util.formatTime(value, "yyyy-MM-dd hh:mm:ss"));
    },
    async queryAll(typeid) {
      typeid = typeid || this.typeid;
      let result = (await stickApi.queryAll({ typeid })) || [];
      let dateArray = [];
      let dateStrArray = [];
      result.forEach((item) => {
        dateStrArray.push(item.datetime);
        dateArray.push(new Date(item.datetime));
      });
      //处理空数组
      if (dateArray.length === 0) {
        result = null;
      }
      this.valuelist = dateArray;
      this.dateStrArray = dateStrArray;
      this.renderRandom = Math.random();
    },
    async complete(datetime) {
      if (this.dateStrArray.indexOf(datetime) > -1) {
        Toast.fail("当前日期重复");
        return;
      }
      let { typeid } = this;
      await stickApi.complete({ typeid, datetime });
      this.queryAll();
      this.show = false;
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