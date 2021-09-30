import styles from "./style.less";
import { useRef, useEffect } from 'react';
import { Drawer, Button, Form, Input, Select } from 'antd';
import UploadImage from '@/components/UploadImage';
import UploadFile from '@/components/UploadFile';
const FormItem = Form.Item;
export default (props) => {
    const { visible, value, onClose, onSubmit } = props || {};
    const [editForm] = Form.useForm();
    const mounting = useRef(true);

    useEffect(() => {
        if (mounting.current) {
            mounting.current = false;
        } else {
            value && editForm.setFieldsValue(value || {});
            (!value) && editForm.resetFields();
        }
    }, [value]);

    //提交表单
    const formSubmit = async () => {
        let values = await editForm.validateFields();
        values.uid = value?.uid;
        onSubmit && onSubmit(values, editForm.resetFields);
    }

    return <Drawer
        title="新增菜品"
        onClose={onClose}
        visible={visible}
        width={600}
        footer={
            <div className={styles.editFooter}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                <Button onClick={formSubmit} type="primary">保存</Button>
            </div>
        }
    >
        <Form size="small" validateMessages={{ required: "${label} 是必填字段" }} form={editForm} layout="vertical">
            <FormItem rules={[{ required: true }]} name='type' label="类别">
                <Select>
                    <Select.Option value="01">素菜</Select.Option>
                    <Select.Option value="02">荤菜</Select.Option>
                    <Select.Option value="03">汤菜</Select.Option>
                </Select>
            </FormItem>

            <FormItem rules={[{ required: true }]} name='name' label="名称">
                <Input rows={2} />
            </FormItem>

            <FormItem rules={[{ required: true }]} name='cover' label="图片">
                <UploadImage folder="cooking" />
            </FormItem>

            <FormItem name='adjunct' label="附件">
                <UploadFile noren="1" folder="cooking" />
            </FormItem>

            <FormItem rules={[{ required: true }]} name='remark' label="备注">
                <Input.TextArea rows={7} />
            </FormItem>
        </Form>
    </Drawer>
}