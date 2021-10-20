<template>
  <NavBar></NavBar>
  <router-view />
  <div class="page-bg"></div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="less" scoped>
.page-bg {
  background: rgba(245, 245, 245, 1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
