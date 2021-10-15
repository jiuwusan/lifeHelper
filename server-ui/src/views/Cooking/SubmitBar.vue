<template>
  <div class="submit-bar">
    <div class="submit-fixed">
      <van-button class="btn random" @click="randomCooking"
        >随机搭配</van-button
      >
      <van-button class="btn submit" @click="submitCooking"
        >提交菜谱</van-button
      >
    </div>
  </div>
  <van-popup v-model:show="visible" position="bottom" :closeable="true" round>
    <div class="popup-content">
      <div class="title">烹饪信息</div>
      <div class="">
        <van-form @submit="onSubmit">
          <van-field
            v-model="date"
            is-link
            readonly
            name="date"
            label="日期选择"
          >
            <template #input>
              <DatetimePicker v-model:value="date" placeholder="点击选择日期" />
            </template>
          </van-field>
          <van-field name="moment" label="时刻选择">
            <template #input>
              <van-radio-group v-model="moment" direction="horizontal">
                <van-radio name="10">早餐</van-radio>
                <van-radio name="20">午餐</van-radio>
                <van-radio name="30">晚餐</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div class="dishes-list">
            <van-swipe-cell v-for="item in zoneList" :key="item.uid">
              <template #right>
                <van-button square type="danger" text="删除" />
              </template>
              <div class="dishes-item">
                <Smage class="cover" prefix :src="item.cover"></Smage>
                <div class="name">{{ item.name }}</div>
              </div>
            </van-swipe-cell>
          </div>
          <div class="submit-box">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              class="btn"
            >
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { Form, Field, Popup, RadioGroup, Radio, Button, SwipeCell } from "vant";
import DatetimePicker from "@/components/DatetimePicker";
import { cookingApi } from "@/api";
export default {
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Form.name]: Form,
    [Field.name]: Field,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [SwipeCell.name]: SwipeCell,
    DatetimePicker,
  },
  data() {
    return {
      visible: false,
      currentDate: null,
      date: new Date(),
      moment: "20",
      isRandom: false,
      randomList: [],
    };
  },
  computed: {
    zoneList() {
      if (this.isRandom) {
        return this.randomList;
      }
      return this.$store.state.cooking.zoneList;
    },
  },
  mounted() {},
  methods: {
    showChange(value) {
      this.visible = typeof value === "boolean" ? value : !this.visible;
    },
    /**
     * 随机生成
     */
    async randomCooking() {
      this.isRandom = true;
      this.visible = true;
      let result = await cookingApi.random({
        number: parseInt(Math.random() * 6 + 2),
      });
      this.randomList = result;
    },
    /**
     * 提交
     */
    async submitCooking() {
      this.isRandom = false;
      this.$store.dispatch("cooking/zoneQuery");
      this.visible = true;
    },
    async onSubmit(value) {
      this.visible = false;
      let formData = {
        ...value,
        cookings: this.zoneList,
        isRandom: this.isRandom,
      };
      await cookingApi.submit(formData);
      //重新加载数据
      this.$store.dispatch("cooking/reload");
      //返回列表
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

.submit-bar {
  min-height: 55px;
  width: 100%;
  content: "";
  .submit-fixed {
    .box();
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    padding: 5px 15px;
    .flex();
    justify-content: space-between;
    background: #fff;
    .btn {
      border-radius: 20px;
      width: 170px;
      color: #fff;
    }
    .random {
      background: linear-gradient(315deg, #61b46a 0%, #96e6a1 100%);
    }
    .submit {
      background: linear-gradient(to right, #ff6034, #ee0a24);
    }
  }
}

.popup-content {
  width: 100%;
  max-height: 80vh;
  .flex();
  flex-direction: column;
  .title {
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(35, 24, 21, 1);
    padding: 14px;
    text-align: center;
    background: rgba(255, 255, 255, 1);
  }
  .datetime {
    padding: 0 14px;
  }
  .dishes-list {
    .flex();
    flex-direction: column;
    padding: 14px;
  }
}

.dishes-item {
  position: relative;
  margin-top: 10px;
  .flex();
  .box();
  align-items: center;
  padding-right: 20px;
  .cover {
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }
  .name {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #231815;
    line-height: 19px;
    margin-left: 10px;
  }
}

.submit-box {
  width: 100%;
  .box();
  padding: 14px;
  .btn {
    background: linear-gradient(to right, #ff6034, #ee0a24);
    border: none;
  }
}
</style>