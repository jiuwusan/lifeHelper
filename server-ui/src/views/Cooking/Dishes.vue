<template>
  <div class="dishes-box" v-if="fttData">
    <Smage class="cover" prefix :src="fttData.cover" />
    <div class="info">
      <div class="name">{{ fttData.name }}</div>
      <div class="count">
        <div class="number">
          <Icon class="icon" name="eat" />
          <span>{{ fttData.sum || 0 }}</span>
        </div>
        <div class="add-btn">
          <Icon class="icon" name="cooking" />
          <div class="checked" v-show="fttData.checked">
            <Icon class="icon" name="checked" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      fttData: null,
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newValue) {
        this.setFttData(newValue);
      },
    },
  },
  methods: {
    setFttData(value) {
      this.fttData = value;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.dishes-box {
  .box();
  width: 170px;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0 0 0;
  .cover {
    width: 100%;
    height: auto;
  }
  .info {
    width: 100%;
    .box();
    padding: 10px;
    .name {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #231815;
      line-height: 20px;
    }
    .count {
      margin-top: 5px;
      width: 100%;
      .flex();
      justify-content: space-between;
      align-items: center;
      .number {
        .flex();
        align-items: center;
        .icon {
          font-size: 16px;
          margin-right: 4px;
        }
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #eb453c;
      }
      .add-btn {
        .active();
        border-radius: 50%;
        width: 25px;
        height: 25px;
        position: relative;
        cursor: pointer;
        .flex();
        justify-content: center;
        align-items: center;
        background: #61b46a;
        .icon {
          font-size: 16px;
        }
        .checked {
          .flex();
          position: absolute;
          top: -5px;
          right: -5px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          z-index: 9;
          color: #ffffff;
          background: #ffffff;
          .icon {
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>