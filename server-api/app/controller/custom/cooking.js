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
        let orderBy = `order by d.create_at desc`
        let replacements = {};
        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements, page, pageSize, orderBy);
        this.result(result);
    }

    /**
     * 查询列表
     */
    async zoneQuery() {
        const { service } = this;
        let querySql = `select d.*,DATE_FORMAT(d.created_at,'%Y-%m-%d %H:%i') as created_at_ftt from cooking d where d.deleted='00' and d.publish='01'and d.checked='01' order by d.created_at desc`;
        let replacements = {};
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }

    /**
     * 添加
     */
    async append() {
        const { ctx } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Cooking.update({ checked: "01" }, { where: { uid } });
        this.result(result);
    }

    /**
     * 移除
     */
    async remove() {
        const { ctx } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        let result = await ctx.model.Cooking.update({ checked: "00" }, { where: { uid } });
        this.result(result);
    }

    /**
     * 随机生成
     */
    async random() {
        const { service } = this;
        let { number } = this.validate({});
        let querySql = `SELECT * FROM cooking WHERE deleted='00' and publish='01' order by RAND() LIMIT :number`;
        let replacements = { number: number };
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }

    /**
     * 提交记录
     */
    async submit() {
        const { ctx, service } = this;
        let { cookings, date, moment, isRandom = false } = this.validate({ cookings: "cookings不能为空", date: "date不能为空", moment: "moment不能为空" });

        if (!isRandom) {
            let cookuids = [];
            cookings.map((item) => {
                cookuids.push(item.uid);
            });
            let sumSql = `update cooking t set t.checked='00' where t.uid in (:cookuids)`;
            await service.model.execute(sumSql, { cookuids });
        }

        let saveData = { date, moment, random: isRandom ? "01" : "00", cookings: JSON.stringify(cookings) };
        this.result(await ctx.model.Cuisine.create(saveData));
    }

    /**
     * 修改记录
     */
    async status() {
        const { ctx, service } = this;
        let { uid, status } = this.validate({ uid: "uid不能为空", status: "状态不能为空", });
        if (status === "10") {
            let cus = await ctx.model.Cuisine.findOne({ where: { uid } });
            let cookings = JSON.parse(cus.cookings);
            let cookuids = [];
            cookings.map((item) => {
                cookuids.push(item.uid);
            });
            let sumSql = `update cooking t set t.sum=t.sum+1 where t.uid in (:cookuids)`;
            await service.model.execute(sumSql, { cookuids });

        }
        this.result(await ctx.model.Cuisine.update({ status }, { where: { uid } }));
    }

    /**
     * 删除
     */
    async delete() {
        const { ctx } = this;
        let { uid } = this.validate({ uid: "uid不能为空" });
        //只能删除未完成
        this.result(await ctx.model.Cuisine.update({ deleted: "01" }, { where: { uid, status: "99" } }));
    }

    /**
     * 查询列表
     */
    async pageQueryCuisine() {
        const { service } = this;
        let { page = 1, pageSize = 10 } = this.validate({
            page: "page 为必要参数",
            pageSize: "pageSize 为必要参数"
        });
        let querySql = `select t.* from cuisine t where t.deleted='00'`;
        let orderBy = `order by t.date desc,t.moment desc`
        let replacements = {};
        //拼接动态参数
        let result = await service.model.pageQuery(querySql, replacements, page, pageSize, orderBy);
        this.result(result);
    }

}

module.exports = CookingController;