'use strict';

//系统配置
module.exports = app => {
    const { UUID, TEXT, STRING, UUIDV1, INTEGER } = app.Sequelize;

    const QrcodeWifi = app.model.define('qrcode_wifi', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        pwd: { type: STRING, comment: "密码" },
        salt: { type: STRING, comment: "盐" },
        content: { type: TEXT, comment: "内容" },//数组
        bind: { type: STRING(2), defaultValue: "00", comment: "删除标记，01=已绑定，00=未绑定" },//删除
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记，01=已删除，00=未删除" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return QrcodeWifi;
};