'use strict';

const BaseController = require('../../core/base');

class FmController extends BaseController {

    /**
     * 查询列表
     */
    async queryAll() {
        const { service } = this;
        let { type } = this.validate();
        let querySql = `select t.* from fm t where t.deleted='00' order by t.created_at asc`;
        let replacements = { type };
        if (type) {
            querySql = `select t.* from fm t where t.type=:type and t.deleted='00' order by t.created_at asc`;
        }
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }

}

module.exports = FmController;