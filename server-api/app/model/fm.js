'use strict';

//系统配置
module.exports = app => {
    const { UUID, TEXT, STRING, UUIDV1, INTEGER } = app.Sequelize;

    const Fm = app.model.define('fm', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        cover: { type: STRING, comment: "封面图片" },
        name: { type: STRING, comment: "内容" },
        desc: { type: STRING, comment: "描述" },
        path: { type: STRING, comment: "路由" },
        fn: { type: STRING, comment: "调用方法的名称" },
        type: { type: STRING(2), defaultValue: "00", comment: "类型，01=管理员，00=客户" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记，01=已删除，00=未删除" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Fm;
};