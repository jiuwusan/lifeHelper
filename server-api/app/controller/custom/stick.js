'use strict';

const BaseController = require('../../core/base');

class FmController extends BaseController {

    /**
     * 查询列表
     */
    async queryAll() {
        const { service } = this;
        let { typeid } = this.validate();
        let querySql = `select t.* from stick_logs t where t.deleted='00' and t.typeid=:typeid`;
        let replacements = { typeid };
        //拼接动态参数
        let result = await service.model.query(querySql, replacements);
        this.result(result);
    }

    /**
     * 完成
     */
    async complete() {
        const { ctx } = this;
        let { typeid, datetime } = this.validate({ typeid: "typeid不能为空", datetime: "datetime不能为空" });
        this.result(await ctx.model.StickLogs.create({ typeid, datetime }));
    }

    /**
     * 查询所有类型
     */
    async type() {
        const { service } = this;
        let { userid } = this.validate({ userid: "userid为必填项" });
        let querySql = `select t.*,(select DATE_FORMAT(t1.datetime,'%Y-%m-%d') as lasttime from stick_logs t1 where t1.typeid=t.uid order by t1.datetime desc LIMIT 0,1) as lasttime
            from stick_type t where t.deleted='00' and t.userid=:userid`;
        let replacements = { userid };
        //拼接动态参数
        let result = await service.model.query(querySql, replacements) || [];
        let seriesSql = `SELECT
                            COUNT(1) AS days
                            FROM
                            (
                            SELECT
                                DATE_SUB( a.datetime, INTERVAL 1 DAY ) signDate,
                                ( @i := DATE_ADD( @i, INTERVAL - 1 DAY ) ) today 
                            FROM
                                ( SELECT t2.DATETIME FROM stick_logs t2 WHERE t2.typeid=:typeid  ORDER BY t2.DATETIME DESC ) a
                                INNER JOIN (
                                SELECT
                                    @i := MAX( t3.DATETIME ) AS signMax 
                                FROM
                                    stick_logs t3
                                WHERE
                                t3.typeid=:typeid
                                    AND (
                                        TO_DAYS( t3.DATETIME ) = TO_DAYS(
                                        CURDATE()) 
                                        OR TO_DAYS( t3.DATETIME ) = TO_DAYS( DATE_ADD( CURDATE(), INTERVAL - 1 DAY ) ) 
                                    ) 
                                ) b 
                            WHERE
                                b.signMax IS NOT NULL 
                                AND TO_DAYS(
                                DATE_ADD( @i, INTERVAL - 1 DAY )) = TO_DAYS( DATE_SUB( a.datetime, INTERVAL 1 DAY ) ) 
                            ) c`;

        let seriesResult = {};
        for (let i = 0; i < result.length; i++) {
            seriesResult = await service.model.query(seriesSql, { typeid: result[i].uid }) || [];
            result[i].series = seriesResult[0].days;
        }

        this.result(result);
    }

    /**
     * 创建一个新类型
     */
    async createType() {
        const { ctx } = this;
        let { name, userid } = this.validate({ name: "name为必填项", userid: "userid为必填项" });
        this.result(await ctx.model.StickType.create({ name, userid }));
    }

    /**
     * 删除一个新类型
     */
    async deleteType() {
        const { ctx } = this;
        let { uid } = this.validate({ uid: "uid为必填项" });
        this.result(await ctx.model.StickType.create({ deleted: "01" }, { where: { uid } }));
    }

}

module.exports = FmController;