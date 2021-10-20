<template>
  <div class="page-box">
    <div class="user-box">
      <div
        class="user-item"
        v-for="item in userlist"
        :key="item.uid"
        @click="toType(item.uid)"
      >
        <Smage class="avatar" prefix :src="item.avatar" />
        <div class="info">
          <div class="name">{{ item.nickname }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userApi } from "@/api";
import { Button } from "vant";
export default {
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      userlist: [],
      show: false,
    };
  },
  mounted() {
    this.queryAll();
  },
  methods: {
    async queryAll() {
      let userlist = (await userApi.queryAll()) || [];
      this.userlist = userlist;
    },
    toType(userid) {
      this.$router.push(`/stick/${userid}`);
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
  .user-box {
    .box();
    .flex();
    flex-direction: column;
    padding: 0 10px;
    .user-item {
      .box();
      .flex();
      background: #ffffff;
      border-radius: 5px;
      padding: 13px 14px;
      margin: 10px 0 0 0;
      align-items: center;
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .info {
        margin-left: 10px;
        .name {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #231815;
          line-height: 23px;
        }
      }
    }
  }
}
</style>