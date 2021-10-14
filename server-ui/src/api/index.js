import { ApiGenerator } from '@jws';
import config from '@config';
import { Notification } from "@jws/components";
const apiv1 = new ApiGenerator(config.apiPrefix, { //异常处理
    onError: (error) => {
        console.log("请求错误==", error);
    },
    format: (res) => {
        if (res.status === 200) {
            if (res.data.code === 200) {
                return res.data.data;
            } else {
                Notification.error(res.data.msg);
                throw new Error(res);
            }
        } else {
            Notification.error(res.data.msg);
            throw new Error(res)
        }
    }
});

export const authApi = apiv1.genApi({
    imageCode: "GET /auth/imageCode"
});

export const configApi = apiv1.genApi({
    findById: "/custom/config/findById"
});

export const cookingApi = apiv1.genApi({
    pageQuery: "post /custom/cooking/pageQuery"
});

