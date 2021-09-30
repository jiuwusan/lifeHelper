import React, { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
const Root = (props) => {
    const { init } = useAuth();

    useState(() => {
        //初始化授权信息
        init();
    })

    return props.children;
};

export function rootContainer(container) {
    return React.createElement(Root, null, container);
}