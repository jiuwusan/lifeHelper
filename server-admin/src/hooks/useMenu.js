import { useState } from 'react';
import { CameraOutlined, SettingOutlined } from '@ant-design/icons';
//菜单数据
const menusDefault = [{
    name: "首页",
    route: "/",
    icon: <SettingOutlined />
}, {
    name: "私房菜",
    route: "/cooking",
    icon: <CameraOutlined />
}];

export default () => {
    let [menus, setMenus] = useState(menusDefault);
    let [activeKeys, setActiveKeys] = useState({ openKeys: [], selectedKeys: [] });
    return [menus, activeKeys, setMenus, setActiveKeys];
};
