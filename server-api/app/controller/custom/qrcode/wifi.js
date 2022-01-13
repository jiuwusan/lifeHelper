'use strict';

const BaseController = require('../../../core/base');

class WifiController extends BaseController {

    /**
     * 配置
     */
    async findById() {
        const { ctx } = this;
        let { uid } = this.validate({
            uid: "uid不能为空"
        });
        let result = await ctx.model.QrcodeWifi.findOne({ where: { uid } });
        if (!result) {
            this.error("数据不存在");
        }
        result.dataValues.tuto=["/assets/wifi/tuto/001.png","/assets/wifi/tuto/002.png","/assets/wifi/tuto/003.png","/assets/wifi/tuto/004.png"];
        this.result(result);
    }

    /**
     * 验证密码
     */
    async checkPassword() {
        const { ctx, app } = this;
        let { uid, password } = this.validate({
            uid: "uid不能为空",
            password: "密码不能为空",
        });
        let result = await ctx.model.QrcodeWifi.findOne({ where: { uid } });
        if (!result) {
            this.error("数据不存在");
        }

        let encodePassword = app.utils.tools.MD5(password, result.salt);
        if (encodePassword !== result.pwd) {
            this.error("密码错误");
        }

        let checkid = await app.utils.uuid.v5();

        await ctx.service.redis.set(checkid, uid, 60 * 30);

        this.result({ checkid });
    }

}

module.exports = WifiController;