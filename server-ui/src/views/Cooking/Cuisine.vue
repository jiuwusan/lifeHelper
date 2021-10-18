<template>
  <div class="cuisine-box">
    <div class="info">
      <div class="left">
        <div class="date">{{ fttData.date }}</div>
        <div class="moment">
          <van-tag type="success" v-if="fttData.moment === '10'">早餐</van-tag>
          <van-tag type="primary" v-if="fttData.moment === '20'">午餐</van-tag>
          <van-tag type="warning" v-if="fttData.moment === '30'">晚餐</van-tag>
        </div>
      </div>
      <div class="right">
        <Icon
          v-if="fttData.status === '99'"
          class="opt-btn"
          name="delete"
          @click="del()"
        />
        <Icon
          v-if="fttData.status === '99'"
          class="opt-btn"
          name="doFinish"
          @click="finish()"
        />
        <Icon v-if="fttData.status === '10'" class="opt-btn" name="finish" />
      </div>
    </div>
    <div class="cookings" v-if="fttData.cookings">
      <div
        class="dishe-item"
        v-for="item in fttData.cookings"
        :key="item.uid"
        @click="detail"
      >
        <Smage class="cover" prefix :src="item.cover"></Smage>
      </div>
    </div>
  </div>
</template>

<script>
import { SwipeCell, Button, Tag, Circle } from "vant";
export default {
  components: {
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Circle.name]: Circle
  },
  props: {
    data: {
      type: Object,
      visible: false,
    },
  },
  data() {
    return {
      fttData: {},
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newValue) {
        this.setFttData({ ...(newValue || {}) });
      },
    },
  },
  methods: {
    setFttData(value) {
      try {
        value.cookings = JSON.parse(value.cookings);
      } catch (error) {
        //出错了
        value = {
          ...(value || {}),
          cookings: [],
        };
      }
      this.fttData = value;
    },
    finish() {
      this.$emit("finish", this.fttData.uid);
    },
    del() {
      this.$emit("del", this.fttData.uid);
    },
    detail() {
      this.$emit("detail", this.fttData.cookings);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

.cell-button {
  //   height: 55px !important;
}

.cuisine-box {
  .box();
  .flex();
  flex-direction: column;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0px 0px 15px 0;
  .info {
    width: 100%;
    height: 55px;
    .box();
    .flex();
    justify-content: space-between;
    align-items: center;
    .left {
      .box();
      .flex();
      align-items: center;
      .date {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #231815;
      }
      .moment {
        margin-left: 5px;
      }
    }
    .right {
      .flex();
      .opt-btn {
        margin-left: 10px;
        font-size: 20px;
      }
    }
  }

  .cookings {
    width: 100%;
    overflow-x: auto;
    .box();
    .flex();
    .dishe-item {
      .box();
      .flex();
      .cover {
        width: 55px;
        height: 55px;
        margin-right: 8px;
        border-radius: 4px;
      }
    }
  }
}
</style>