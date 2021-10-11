import { useState } from 'react';
import { authApi, updateApiState } from '@/api';
import { history } from 'umi';
import useGlobalState from '@jws/hooks/useGlobalState';
export default () => {
    let [token, setToken] = useGlobalState("ACCESS_TOKEN", { storage: 'local' });
    let [userInfo, setUserInfo] = useGlobalState("ACCESS_USERINFO", { storage: 'local' });

    //登录方法
    const login = async (params) => {
        let result = await authApi.login(params);
        updateApiState({ token: result });
        setToken(result);
        history.replace("/");
    }

    //刷新token
    const refresh = async () => {
        if (token) {
            // updateApiState({ token });
            let result = await authApi.refreshToken({
                refreshToken: token?.refresh_token
            });
            updateApiState({ token: result });
            setToken(result);
        } else {
            history.replace("/login");
        }
        return true;
    }

    const logout = async (flag) => {
        if (flag) {
            //调用退出接口
        }
        setToken(null);
        setUserInfo(null);
        history.replace('/login');
    };

    const password = async (params, callback) => {
        await authApi.changePassword(params);
        callback && callback();
        logout();
    }

    return { token, userInfo, refresh, login, password, logout };
};
