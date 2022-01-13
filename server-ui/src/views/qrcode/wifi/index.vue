<template>
  <div class="page-box" v-if="visible">
    <smage :src="wifidata.bg" prefix fit="cover" class="bg-box" />
    <div class="list-box" v-if="wifidata.list">
      <div
        class="list-item"
        v-for="(item, index) in wifidata.list"
        :key="item.name"
      >
        <div class="info">
          <div class="item">
            <div class="name">名称：</div>
            <div class="txt">{{ item.name }}</div>
          </div>
          <div class="item">
            <div class="name">密码：</div>
            <div class="txt">{{ item.password }}</div>
            <div
              :class="['copy', 'password_' + index]"
              :data-clipboard-text="item.password"
              @click="copy('.password_' + index)"
            >
              <icon name="copy-gray" class="icon"></icon>
            </div>
          </div>
        </div>

        <div class="vpn" v-if="item.vpn">
          <div class="warning">访问国外网站:</div>
          <div class="logo-list">
            <smage src="/assets/wifi/logo001.png" prefix class="logo-item" />
            <smage src="/assets/wifi/logo002.png" prefix class="logo-item" />
            <smage src="/assets/wifi/logo003.png" prefix class="logo-item" />
          </div>
        </div>

        <div class="info" v-if="item.vpn && item.vpn === 'gateway'">
          <div class="item">
            <div class="name">网关：</div>
            <div class="txt">{{ item.gateway }}</div>
            <div
              :class="['copy', 'name_' + index]"
              :data-clipboard-text="item.gateway"
              @click="copy('.name_' + index)"
              v-if="item.vpn === 'gateway'"
            >
              <icon name="copy-gray" class="icon"></icon>
            </div>
          </div>
          <div class="item">
            <div class="name">DNS：</div>
            <div class="txt">{{ item.dns }}</div>
            <div
              :class="['copy', 'password_' + index]"
              :data-clipboard-text="item.dns"
              @click="copy('.password_' + index)"
            >
              <icon name="copy-gray" class="icon"></icon>
            </div>
          </div>
        </div>
        <div class="vpn-warning" v-if="item.vpn && item.vpn === 'route'">
          温馨提示：连接后可直接访问国外网站
        </div>
        <div class="vpn-warning" v-if="item.vpn && item.vpn === 'gateway'">
          设置静态IP地址后可访问国外网站【<span class="blue" @click="showTuto"
            >查看教程</span
          >】
        </div>
      </div>
      <div class="tutorial-box" ref="tuto">
        <div class="title">网关/DNS设置教程</div>
        <div class="tuto-list">
          <div
            class="tuto-item"
            v-for="(item, index) in wifidata.tuto"
            :key="index"
          >
            <div class="number">第{{ index + 1 }}步</div>
            <smage :src="item" prefix class="image" />
          </div>
        </div>
      </div>
      <!-- <van-button
        round
        block
        type="primary"
        class="edit-btn"
        @click="checkShow = true"
        >修改WIFI信息</van-button -->
      >
    </div>
    <van-dialog
      v-model:show="checkShow"
      title="密码验证"
      show-cancel-button
      @cancel="checkShow = false"
      @confirm="confirmCheck"
    >
      <div class="password-box">
        <input
          ref="password"
          class="password"
          type="password"
          placeholder="请输入验证密码"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Button, Toast, Dialog } from "vant";
import { wifiApi } from "@/api";
import Clipboard from "clipboard";

export default {
  components: {
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      checkShow: false,
      visible: false,
      wifidata: {},
    };
  },
  mounted() {
    this.getSetting();
  },
  methods: {
    /**
     * 获取数据
     */
    async getSetting() {
      let { uid } = this.$route.query || {};
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      let result = await wifiApi.findById({ uid });
      Toast.clear();
      if (result.bind === "01") {
        result.list = JSON.parse(result.content);
      }
      result.bg = `/assets/wifi/bg${parseInt(Math.random() * 10)}.jpeg`;
      //赋值
      this.wifidata = result;
      this.visible = true;
    },
    copy(className) {
      let clipboard = new Clipboard(className);
      clipboard.on("success", () => {
        Toast.success("复制成功");
        //  释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        // 不支持复制
        Toast.fail("该浏览器不支持复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    async confirmCheck() {
      let { uid } = this.$route.query || {};
      let password = this.$refs.password.value;
      let result = await wifiApi.checkPassword({ uid, password });
      this.$router.push(
        "/qrcode/wifi/edit?checkid=" + result.checkid + "&uid=" + uid
      );
    },
    showTuto() {
      let tutoDom = this.$refs.tuto;
      tutoDom.scrollIntoView();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

.page-box {
  min-height: calc(100vh - 50px);
  width: 100%;
  //   background: #136e9d;
  position: relative;
  z-index: 2;
  overflow: hidden;
  flex-direction: column;
  .bg-box {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
}

.password-box {
  .box();
  width: 100%;
  padding: 15px;
  .password {
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-align: center;
    border: 0.5px solid #aaaaaa !important;
    padding: 0 15px !important;
    .box();
  }
}

.list-box {
  .box();
  width: 100%;
  padding: 15px;
  position: relative;
  z-index: 3;

  .edit-btn {
    background: linear-gradient(to right, #ff6034, #ee0a24);
    border: none !important;
    margin-top: 20px;
    opacity: 0.8;
  }

  .list-item {
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #cccccc;
    border-radius: 8px;
    padding: 10px;
    &:first-child .title {
      color: #231815;
      font-size: 24px;
      font-weight: 400;
      margin: 15px 0 15px 0px;
    }

    .vpn {
      margin-top: 15px;
      .warning {
        color: #231815;
        font-weight: 600;
      }
      .logo-list {
        .flex();
        align-items: center;
        // justify-content: center;
        margin: 15px 0 15px -10px;
        .logo-item {
          border-radius: 6px;
          height: 25px;
          width: auto;
          margin: 0 0 0 10px;
        }
      }
    }

    .vpn-warning {
      margin-top: 15px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: rgba(229, 0, 18, 0.8);
      line-height: 16px;
      .blue {
        color: rgba(244, 186, 43, 1);
        font-weight: 600;
      }
    }

    .info {
      .box();
      .flex();
      flex-direction: column;
      .item {
        .flex();
        align-items: center;
        &:nth-child(2) {
          margin-top: 6px;
        }
        .name {
          color: #231815;
          font-size: 16px;
          font-weight: 400;
          min-width: 60px;
        }

        .txt {
          //   margin: 0 0 0 10px;
          color: #34495e;
          font-size: 18px;
          font-weight: 400;
          position: relative;
        }

        .copy {
          margin-left: 15px;
          .flex();
          width: 18px;
          height: 18px;
          .icon {
            width: 18px;
            height: 18px;
            font-size: 18px;
          }
        }
      }
    }
  }
}

.tutorial-box {
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 10px;
  .flex();
  flex-direction: column;
  .title {
    color: rgba(89, 87, 87, 0.8);
    font-weight: 600;
    width: 100%;
    text-align: center;
  }

  .tuto-list {
    width: 100%;
    .flex();
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
    .tuto-item {
      margin-top: 10px;
      width: 150px;
      .number {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #e50012;
        line-height: 18px;
        margin-bottom: 10px;
      }

      .image {
        width: 100%;
        height: auto;
        border-radius: 4px;
        overflow: hidden;
        opacity: 0.9;
      }
    }
  }
}
</style>