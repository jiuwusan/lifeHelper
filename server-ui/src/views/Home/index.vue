<template>
  <div class="fn-box">
    <div
      class="fn-item"
      v-for="item in fnList"
      :key="item.path"
      @click="toRoute(item.path)"
    >
      <Smage prefix class="image" :src="item.cover" />
      <div class="over">
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="desc" v-if="item.desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fnList: [
        {
          cover: "/assets/image/cooking.jpg",
          name: "菜谱",
          desc: "吃什么",
          path: "/cooking",
        },
        {
          cover: "/assets/image/more.jpg",
          name: "敬请期待",
          desc: "",
          path: "",
        },
      ],
    };
  },
  components: {},
  methods: {
    toRoute(path) {
      path && this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

.fn-box {
  .box();
  .flex();
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 0px 12px 10px 12px;
  .fn-item {
    margin-top: 12px;
    width: 170px;
    height: 100px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .image {
      width: 100%;
      height: 100%;
    }
    .over {
      .flex();
      align-items: center;
      justify-content: center;
      z-index: 99;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      .content {
        .flex();
        flex-direction: column;
        align-items: center;
        .name {
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 25px;
        }
        .desc {
          margin-top: 3px;
          border-top: 1px solid;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          padding: 5.5px 5px 2.5px 5px;
        }
      }
    }
  }
}
</style>