'use strict';

const BaseController = require('../../core/base');

class UserController extends BaseController {

    /**
     * 查询列表
     */
    async queryAll() {
        const { service } = this;
        let { role = "custom" } = this.validate();
        let querySql = `select t.uid,t.nickname,t.realname,t.avatar from user t where t.deleted='00' and t.role=:role`;
        let replacements = { role };
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }


}

module.exports = UserController;