'use strict';

//系统配置
module.exports = app => {
    const { UUID, TEXT, STRING, UUIDV1 } = app.Sequelize;

    const Config = app.model.define('cuisine', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        date: { type: STRING, comment: "日期" },
        moment: { type: STRING(2), comment: "时刻" },
        random: { type: STRING(2), defaultValue: "00", comment: "是否随机" },
        cookings: { type: TEXT, comment: "菜品 数组" },
        status: { type: STRING(2), defaultValue: "99", comment: "10 已完成，99 未完成" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记，01=已删除，00=未删除" },
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Config;
};