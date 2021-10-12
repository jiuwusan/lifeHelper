<template>
  <NavBar></NavBar>
  <router-view />
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
</style>
