'use strict';

const BaseController = require('../../core/base');

class FmController extends BaseController {

    /**
     * 查询列表
     */
    async queryAll() {
        const { service } = this;
        let { typeid, userid } = this.validate();
        let querySql = `select t.* from stick_logs t where t.deleted='00' and t.typeid=:typeid and t.typeid=:typeid`;
        let replacements = { typeid, userid };
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }

    /**
     * 完成
     */
    async complete() {
        const { ctx } = this;
        let { typeid, userid, datetime } = this.validate({ typeid: "typeid不能为空", userid: "userid不能为空", datetime: "datetime不能为空" });
        this.result(await ctx.model.stickLogs.create({ typeid, userid, datetime }));
    }

}

module.exports = FmController;