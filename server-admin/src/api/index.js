import config from '@config';
import ApiGenerator from '@jws/api/ApiGenerator';
import { notification } from 'antd';
import { history } from 'umi';
//缓存数据
let apiState = {};
let lastNotice = { stamp: 0 };
export const updateApiState = (newState = {}) => {
    apiState = {
        ...apiState,
        ...newState
    }
    console.log("##更新Api成功##");
};


const genApi = new ApiGenerator(config.apiPrefix, {
    format: (res) => {
        switch (res.code) {
            case 200:
                return res.data;
            case 7401:
                history.replace("/login");
                break;
            case 7402:
                history.replace("/login");
                break;
            case 7403:
                history.replace("/login");
                break;
        }
        if (lastNotice !== res.msg && (Date.now() - lastNotice.stamp) > 1500) {
            notification.error({
                message: "系统提示",
                description: res.msg
            });
        }
        lastNotice = {
            msg: res.msg,
            stamp: Date.now()
        };
        throw res;
    },
    //拦截器
    interceptors: (options) => {
        let { token } = apiState;
        if (!options.outAuth) {
            token && (options.headers.Authorization = token.access_token);
        }
        return options;
    },
    onError: (error) => {
        console.log("请求错误==", error);
    }
}).genApi;

// 查询类型的用 MERGE  提交类型的用BREAK

// 用户相关api
export const authApi = genApi({
    login: {
        url: "/auth/token",
        method: "POST",
        serialize: "form",
        outAuth: true,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": "Basic WlktQmxvZzp6aG91eXVhbjIwMDI="
        }
    },
    logout: 'GET /auth/logout',
    changePassword: 'POST /auth/changePassword',
    imageCode: 'GET /auth/imageCode',
    refreshToken: 'POST /auth/refreshToken',
});

export const validApi = genApi({
    imageCode: "GET /valid/imageCode"
});

export const fileApi = genApi({
    upload: {
        url: "/upload/:folder",
        method: "POST",
        outAuth: true
    }
});

export const configApi = genApi({
    profile: "POST /admin/config/profile",
    findById: "/admin/config/findById",
    profileById: "/admin/profile/findById"
});

export const cookingApi = genApi({
    save: "POST /admin/cooking/save",
    findById: "/admin/cooking/findById",
    pageQuery: "POST /admin/cooking/pageQuery",
    delById: "POST /admin/cooking/delById",
    publishById: "POST /admin/cooking/publishById",
});
