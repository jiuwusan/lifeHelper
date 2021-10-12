<template>
  <van-nav-bar v-if="visible" @click-left="leftEvent" @click-right="rightEvent">
    <template #left v-if="!hidden">
      <van-icon name="arrow-left" size="18" class="btn" />返回
    </template>
    <template #title>
      <span class="title">{{ title }}</span>
    </template>
    <template #right>
      <van-icon name="manager" size="20" class="home" v-show="!isAdmin" />
      <van-icon name="wap-home" size="20" class="home" v-show="isAdmin" />
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar, Icon } from "vant";
export default {
  data() {
    return {
      visible: true,
      hidden: false,
      title: "",
      isAdmin: false,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.hidden = to.path === "/" || to.path === "/admin";
        this.title = to.meta.title;
        this.isAdmin = to.path.indexOf("/admin") === 0;
      },
    },
  },
  methods: {
    leftEvent() {
      this.$router.back();
    },
    rightEvent() {
      this.toHome();
    },
    toHome() {
      if (this.isAdmin) {
        this.$router.replace("/");
      } else {
        this.$router.replace("/admin");
      }
    },
  },
  mounted() {
    console.log(NavBar.name, Icon.name);
  },
};
</script>

<style lang="less" scoped>
.btn {
  color: rgba(29, 29, 29, 1);
}

.home {
  color: rgba(229, 0, 18, 1);
}

.title {
  color: rgba(0, 0, 0, 1);
}
</style>