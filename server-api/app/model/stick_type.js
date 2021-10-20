'use strict';

//系统配置
module.exports = app => {
    const { UUID, TEXT, STRING, UUIDV1, INTEGER } = app.Sequelize;

    const StickType = app.model.define('stick_type', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        name: { type: STRING, comment: "名称" },
        userid: { type: STRING, comment: "创建的用户" },
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记，01=已删除，00=未删除" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return StickType;
};