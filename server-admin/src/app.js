import React, { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
const Root = (props) => {
    const { refresh } = useAuth();
    const [initialize, setInitialize] = useState(false);

    useState(async () => {
        //初始化授权信息
        await refresh();
        setInitialize(true);
    })

    if (initialize) {
        //挂载子组件
        return props.children;
    } else {
        return null;
    }
};

export function rootContainer(container) {
    return React.createElement(Root, null, container);
}