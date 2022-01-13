<template>
  <van-nav-bar
    v-if="!hidden"
    @click-left="leftEvent"
    @click-right="rightEvent"
    fixed
    placeholder
    z-index="99999"
  >
    <template #left v-if="goBack">
      <van-icon name="arrow-left" size="18" class="btn" />返回
    </template>
    <template #title>
      <span class="title">{{ title }}</span>
    </template>
    <template #right v-if="menu">
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
      goBack: false,
      menu: false,
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
        console.log("to--", to);
        let {
          meta: { title, goBack = true, menu = true, hidden = false },
        } = to || {};
        this.hidden = hidden;
        this.title = title;
        this.goBack = goBack;
        this.menu = menu;
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