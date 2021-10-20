<template>
  <div class="page-box">
    <div class="type-box">
      <div class="type-item" v-for="item in typelist" :key="item.uid" @click="toLogs(item.uid)">
        <div class="name">{{ item.name }}</div>
        <div class="info">
          <div class="item">最近一次：{{ item.lasttime || "~" }}</div>
          <div class="item">连续记录：{{ item.series || "~" }}次</div>
        </div>
      </div>
    </div>
    <div class="create-fixed">
      <van-button
        round
        block
        type="primary"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="visible = true"
        >创建一个新任务</van-button
      >
    </div>
  </div>
  <van-popup v-model:show="visible" position="bottom" :closeable="true" round>
    <div class="popup-form">
      <div class="title">请输入信息</div>
      <div class="form">
        <van-form @submit="onSubmit">
          <div class="field">
            <van-field
              v-model="formData.name"
              name="name"
              placeholder="请输入内容"
            ></van-field>
          </div>
          <div class="submit-box">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              color="linear-gradient(315deg, #61b46a 0%, #96e6a1 100%)"
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
import { stickApi } from "@/api";
import { Form, Field, Popup, Button, SwipeCell, Toast } from "vant";
export default {
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [SwipeCell.name]: SwipeCell,
  },
  data() {
    return {
      typelist: [],
      show: false,
      visible: false,
      formData: {},
    };
  },
  mounted() {
    let { userid } = this.$route.params || {};
    this.queryAll(userid);
    this.userid = userid;
  },
  methods: {
    async queryAll(userid) {
      userid = userid || this.userid;
      let typelist = (await stickApi.queryType({ userid })) || [];
      this.typelist = typelist;
    },
    toLogs(typeid) {
      this.$router.push(`/stick/logs/${typeid}`);
    },
    async onSubmit(value) {
      if (!value.name) {
        Toast.fail("请填写内容");
        return;
      }
      let { userid } = this;
      await stickApi.createType({ ...value, userid });
      this.queryAll();
      this.formData = {};
      this.visible = false;
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
  padding-bottom: 60px;
  .type-box {
    .box();
    .flex();
    flex-direction: column;
    padding: 0 10px;
    .type-item {
      .box();
      .flex();
      background: #ffffff;
      box-shadow: 0px 2px 10px 2px rgba(224, 224, 224, 1);
      border-radius: 5px;
      padding: 13px 14px;
      margin: 10px 0 0 0;
      flex-direction: column;
      .name {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #231815;
        line-height: 23px;
      }
      .info {
        .flex();
        align-items: center;
        width: 100%;
        margin-top: 10px;
        justify-content: space-between;
        .item {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #989898;
          line-height: 17px;
        }
      }
    }
  }
}

.popup-form {
  width: 100%;
  max-height: 80vh;
  .box();
  .flex();
  flex-direction: column;
  padding: 14px;
  .title {
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(35, 24, 21, 1);
    padding: 14px;
    text-align: center;
    background: rgba(255, 255, 255, 1);
  }
  .form {
    .field {
      padding: 14px;
    }
  }
}

.create-fixed {
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
}
</style>