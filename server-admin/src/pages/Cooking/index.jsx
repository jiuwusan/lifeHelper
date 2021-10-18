import styles from "./style.less"
import KdTable from "@/components/KdTable"
import Smage from "@/components/Smage"
import { Button, Space, Input, Modal, Tag } from 'antd';
import Editor from './Editor';
import { useState } from 'react';
import { cookingApi } from '@/api'
export default (props) => {
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [reloadKey, setReloadKey] = useState(null);
    /**
     * 保存数据
     * @param {*} values 
     * @param {*} reset 
     */
    const saveData = async (values, reset) => {
        await cookingApi.save(values);
        reset();
        setEditVisible(false);
        setReloadKey(Date.now());
    }

    const editOne = (rowData) => {
        setEditData(rowData);
        setEditVisible(true);
    }

    /**
     * 删除
     * @param {*} uid 
     */
    const delOne = (uid) => {
        Modal.confirm({
            title: "系统提示",
            content: "删除后不可恢复，请谨慎操作，删除？",
            onOk: async () => {
                await cookingApi.delById({ uid });
                setReloadKey(Date.now());
            }
        })
    }

    /**
     * 删除
     * @param {*} uid 
     */
    const publishOne = (uid, value) => {
        value = value === "00" ? "01" : "00";
        Modal.confirm({
            title: "系统提示",
            content: "上下架操作，请谨慎操作？",
            onOk: async () => {
                await cookingApi.publishById({ uid,value });
                setReloadKey(Date.now());
            }
        })
    }

    const loadData = async (formData) => {
        return await cookingApi.pageQuery(formData);
    }

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            key: 'cover',
            align: 'center',
            render: (text, record) => (
                <Smage className={styles.cover} src={text}></Smage>
            )
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '类别',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (text) => {
                switch (text) {
                    case "01":
                        return <Tag color="green">素菜</Tag>;
                    case "02":
                        return <Tag color="cyan">荤菜</Tag>;
                    case "03":
                        return <Tag color="blue">汤菜</Tag>;
                    default:
                        return <Tag color="red">未知</Tag>;
                }
            }
        },
        {
            title: '状态',
            dataIndex: 'publish',
            key: 'publish',
            align: 'center',
            render: (text) => {
                switch (text) {
                    case "01":
                        return <Tag color="blue">上架中</Tag>;
                    default:
                        return <Tag color="red">已下架</Tag>;
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <Button type="primary" size="small" ghost onClick={() => editOne(record)}>编辑</Button>
                    {record.publish === "00" && <Button type="primary" size="small" ghost onClick={() => publishOne(record.uid, record.publish)}>上架</Button>}
                    {record.publish === "01" && <Button type="primary" size="small" danger ghost onClick={() => publishOne(record.uid, record.publish)}>下架</Button>}
                    <Button type="primary" size="small" danger ghost onClick={() => delOne(record.uid)}>删除</Button>
                </Space>
            ),
        }
    ];

    return <div className={styles.articleBox}>
        <div>
            <KdTable rowKey="uid"
                reloadKey={reloadKey}
                searchBar={({ FormItem }) => <>
                    <FormItem name='createAt' label="关键字">
                        <Input />
                    </FormItem>
                </>}
                toolBar={<Button type="primary" onClick={() => {
                    setEditData(null);
                    setEditVisible(true);
                }}>新增菜品</Button>}
                columns={columns} loadData={loadData}></KdTable>
        </div>
        <Editor value={editData} visible={editVisible} onSubmit={saveData} onClose={() => setEditVisible(false)}></Editor>
    </div>
}