<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="pageQuery"
  >
    <div class="list-box">
      <van-swipe-cell v-for="(item, index) in datalist" :key="item.uid">
        <template #right v-if="item.status !== '10'">
          <van-button
            class="cell-button"
            square
            type="danger"
            text="删除"
            @click="del(index)"
          />
          <van-button
            class="cell-button"
            square
            type="primary"
            text="完成"
            @click="finish(index)"
          />
        </template>
        <div class="cuisine-box" @click="showDetail(index)">
          <div class="left">
            <div class="date">{{ item.date }}</div>
            <div class="moment">
              <van-tag type="success" v-if="item.moment === '10'">早餐</van-tag>
              <van-tag type="primary" v-if="item.moment === '20'">午餐</van-tag>
              <van-tag type="warning" v-if="item.moment === '30'">晚餐</van-tag>
            </div>
          </div>
          <div class="right">
            <van-circle
              color="#E50012"
              current-rate="20"
              size="35"
              text="20%"
              v-if="item.status === '99'"
            />
            <van-circle
              current-rate="100%"
              size="35"
              text="100"
              v-if="item.status === '10'"
            />
          </div>
        </div>
      </van-swipe-cell>
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
import { SwipeCell, List, Button, Tag, Empty, Circle, Popup } from "vant";
export default {
  components: {
    [SwipeCell.name]: SwipeCell,
    [List.name]: List,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Empty.name]: Empty,
    [Circle.name]: Circle,
    [Popup.name]: Popup,
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
    showDetail(index) {
      let { datalist = [] } = this;
      this.cookings = JSON.parse(datalist[index].cookings);
      this.visible = true;
    },
    async finish(index) {
      let { datalist = [] } = this;
      await cookingApi.status({
        uid: datalist[index].uid,
        status: "10",
      });
      this.pageQuery(true);
    },
    async del(index) {
      let { datalist = [] } = this;
      await cookingApi.delete({
        uid: datalist[index].uid,
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
}

.cell-button {
  height: 55px !important;
}

.cuisine-box {
  .box();
  .flex();
  padding: 0px 15px;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
  }
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
  .dishes {
    .flex();
    //   flex-direction: column;
    flex-wrap: wrap;
    padding: 14px;
    margin-left: -10px;
    .dishes-item {
      padding: 4px;
      position: relative;
      margin: 10px 0 0 10px;
      border-radius: 4px;
      border: 1px solid rgba(170, 170, 170, 0.5);
      .flex();
      .box();
      align-items: center;
      padding-right: 20px;
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