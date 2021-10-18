'use strict';

const BaseController = require('../../core/base');

class CookingController extends BaseController {

    /**
     * 创建
     */
    async save() {
        const { ctx, app } = this;
        let params = this.validate({
            type: "类别 不能为空",
            name: "名称 不能为空",
            cover: "图片 不能为空",
            remark: "备注 不能为空",
        });
        let saveData = this.genParams(params, ["type", "name", "cover", "image", "adjunct", "remark"]);
        let { uid } = params;
        let res;
        if (uid) {
            res = await ctx.model.Cooking.update(saveData, { where: { uid } });
        } else {
            res = await ctx.model.Cooking.create(saveData);
        }
        this.result(res);
    }

    /**
     * 查询单个
     */
    async findById() {
        const { ctx } = this;
        let params = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Cooking.findOne({ where: { uid: params.uid } });
        if (!result) {
            this.error("数据不存在");
        }
        this.result(result);
    }

    /**
     * 查询列表
     */
    async pageQuery() {
        const { ctx, service } = this;
        let { page, pageSize, startTime, endTime } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select d.*,DATE_FORMAT(d.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from cooking d where d.deleted='00'`;
        let orderBy = `order by d.created_at desc`
        let replacements = {};
        if (startTime && endTime) {
            querySql = `${querySql} and (d.created_at>=:startTime and d.created_at<=:endTime)`;
            replacements = { startTime, endTime };
        } else if (startTime) {
            querySql = `${querySql} and d.created_at>=:startTime`;
            replacements = { startTime };
        } else if (endTime) {
            querySql = `${querySql} and d.created_at<=:endTime`;
            replacements = { endTime };
        }
        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements, page, pageSize, orderBy);
        this.result(result);
    }

    /**
     * 删除
     */
    async delById() {
        const { ctx } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Cooking.update({ deleted: "01" }, { where: { uid } });
        this.result(result);
    }

    /**
     * 上下架
     */
    async publishById() {
        const { ctx } = this;
        let { uid, value } = this.validate({
            uid: "uid不能为空", value: (val) => {
                if (!val) return "value不能为空";
                if (!(typeof val === "string" && (val === "00" || val === "01"))) return "value格式错误";
                return null;
            }
        });
        //只能删除未完成
        this.result(await ctx.model.Cooking.update({ publish: value }, { where: { uid } }));
    }

}

module.exports = CookingController;