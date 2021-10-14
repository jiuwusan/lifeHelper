'use strict';

const BaseController = require('../../core/base');

class CookingController extends BaseController {

    /**
     * 查询列表
     */
    async pageQuery() {
        const { service } = this;
        let { page = 1, pageSize = 10 } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select d.*,DATE_FORMAT(d.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from cooking d where d.deleted='00' and d.publish='01'`;
        let orderBy = `order by d.created_at desc`
        let replacements = {};
        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements, page, pageSize, orderBy);
        this.result(result);
    }

}

module.exports = CookingController;