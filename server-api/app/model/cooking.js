'use strict';

//系统配置
module.exports = app => {
    const { UUID, TEXT, STRING, UUIDV1 } = app.Sequelize;

    const Config = app.model.define('cooking', {
        uid: { type: UUID, primaryKey: true, comment: "唯一标识", defaultValue: UUIDV1 },
        type: { type: STRING(2), comment: "类别" },
        name: { type: STRING, comment: "内容" },
        adjunct: { type: TEXT, comment: "附件" },
        cover: { type: STRING, comment: "封面" },
        image: { type: TEXT, comment: "图片" },
        remark: { type: TEXT, comment: "备注" },
        publish: { type: STRING(2), defaultValue: "00", comment: "上架标记，01=上架，00=下架" },//01=上架，00=下架
        deleted: { type: STRING(2), defaultValue: "00", comment: "删除标记，01=已删除，00=未删除" },//删除
    }, {
        //防止查询在表名后加s
        freezeTableName: true,
        //是否自动创建create_at
        timestamps: true
    });

    return Config;
};