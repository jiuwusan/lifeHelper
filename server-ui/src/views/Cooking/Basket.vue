<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="pageQuery"
  >
    <div class="list-box">
      <div class="item-box">
        <Dishes v-for="item in datalist.left" :key="item.uid" :data="item" />
      </div>
      <div class="item-box">
        <Dishes v-for="item in datalist.right" :key="item.uid" :data="item" />
      </div>
    </div>
  </van-list>
  <SubmitBar />
</template>

<script>
import { List, Button } from "vant";
import Dishes from "./Dishes.vue";
import SubmitBar from "./SubmitBar.vue";
export default {
  data() {
    return {};
  },
  components: {
    [List.name]: List,
    [Button.name]: Button,
    Dishes,
    SubmitBar,
  },
  computed: {
    datalist() {
      return this.$store.state.cooking.datalist;
    },
    loading() {
      return this.$store.state.cooking.loading;
    },
  },
  methods: {
    pageQuery() {
      this.$store.dispatch("cooking/pageQuery");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

.list-box {
  .box();
  .flex();
  padding: 0 11.5px 15px 11.5px;
  justify-content: space-between;
  .item-box {
    .box();
    .flex();
    flex-direction: column;
  }
}
</style>