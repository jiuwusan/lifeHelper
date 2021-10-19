<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="pageQuery"
  >
    <div class="list-box">
      <Cuisine
        v-for="item in datalist"
        :key="item.uid"
        :data="item"
        @finish="finish"
        @del="del"
        @detail="showDetail"
      />
      <van-empty
        image="error"
        description="暂无记录"
        v-show="!loading && datalist.length < 1"
      />
    </div>
  </van-list>
  <div class="btn-box">
    <div class="go">
      <van-button
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        block
        round
        @click="goBasket"
        >进入厨房</van-button
      >
    </div>
  </div>
  <van-popup v-model:show="visible" position="bottom" :closeable="true" round>
    <div class="popup-content">
      <div class="title">详细信息</div>
      <div class="dishes-list">
        <div class="dishes">
          <div class="dishes-item" v-for="item in cookings" :key="item.uid">
            <Smage class="cover" prefix :src="item.cover"></Smage>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { cookingApi } from "@/api";
import { List, Button, Empty, Popup } from "vant";
import Cuisine from "./Cuisine";
export default {
  components: {
    [List.name]: List,
    [Button.name]: Button,
    [Empty.name]: Empty,
    [Popup.name]: Popup,
    Cuisine,
  },
  data() {
    return {
      loading: true,
      page: 1,
      pageSize: 10,
      totalSize: 0,
      datalist: [],
      reday: false,
      currentRate: 50,
      visible: false,
      cookings: [],
    };
  },
  methods: {
    async pageQuery(reload) {
      try {
        let { page, pageSize, totalSize, datalist = [], reday = false } = this;
        if (reload) {
          reday = false;
          datalist = [];
          totalSize = 0;
          page = 1;
        }
        if (reday && datalist.length >= totalSize) {
          return;
        }
        this.loading = true;
        let result = await cookingApi.pageQueryCuisine({
          page,
          pageSize,
        });
        Array.prototype.push.apply(datalist, result.datalist);
        this.datalist = datalist;
        this.page = result.page + 1;
        this.totalSize = result.totalSize;
      } finally {
        this.loading = false;
        this.reday = true;
      }
    },
    showDetail(cookings) {
      this.cookings = cookings;
      this.visible = true;
    },
    async finish(uid) {
      await cookingApi.status({
        uid,
        status: "10",
      });
      this.pageQuery(true);
    },
    async del(uid) {
      await cookingApi.delete({
        uid,
      });
      this.pageQuery(true);
    },
    goBasket() {
      this.$router.push("/cooking/basket");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

.list-box {
  .box();
  .flex();
  flex-direction: column;
  width: 100%;
  padding: 0px 15px;
  background: #fff;
}

.btn-box {
  width: 100%;
  height: 55px;
  content: "";
  .go {
    .box();
    position: fixed;
    width: 100%;
    padding: 10px;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
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
}

.dishes-list {
  .flex();
  flex-grow: 1;
  overflow-y: auto;
  .dishes {
    .box();
    .flex();
    flex-direction: column;
    padding: 0 14px;
    .dishes-item {
      padding: 4px;
      position: relative;
      margin: 10px 0 0 0;
      border-radius: 4px;
      // border: 1px solid rgba(170, 170, 170, 0.5);
      .flex();
      .box();
      align-items: center;
      &:last-child{
        margin: 10px 0;
      }
      .cover {
        width: 30px;
        height: 30px;
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
  }
}
</style>