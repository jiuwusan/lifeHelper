
import { cookingApi } from "@/api";

let backScrollYTimer = null;

const cooking = {
    namespaced: true,
    state: () => ({
        loading: true,
        page: 1,
        pageSize: 10,
        totalSize: 0,
        datalist: { left: [], right: [] },
        query: {},
        recruitScrollY: 0,
        zoneList: []
    }),
    mutations: {
        update(state, payload = {}) {
            for (const key in payload) {
                state[key] = payload[key];
            }
        }
    },
    actions: {
        async pageQuery({ commit, state = {} }) {
            let { page = 1, pageSize = 10, totalSize = 0, datalist = {}, query = {} } = state;
            if (page === 1) {
                //重置数据
                datalist = { left: [], right: [] };
            }
            //长度
            let datasize = 0;
            for (const key in datalist) {
                datasize += datalist[key].length;
            }
            if (page > 1 && totalSize <= datasize) {
                //数据已经全部加载
                return;
            }
            commit('update', { loading: true });
            let result = await cookingApi.pageQuery({ page, pageSize, ...query });
            commit('update', { loading: false })
            let current = { left: [], right: [] };
            for (let i = 0; i < result?.datalist?.length; i++) {
                current[i % 2 === 0 ? "left" : "right"].push(result.datalist[i])
            }
            //合并
            for (const key in current) {
                Array.prototype.push.apply(datalist[key], current[key]);
            }
            totalSize = result?.totalSize;
            page = result?.page + 1;
            pageSize = result?.pageSize;
            commit('update', { page, pageSize, totalSize, datalist })
        },
        async zoneQuery({ commit }) {
            let zoneList = await cookingApi.zoneQuery() || [];
            commit('update', { zoneList })
        },
        async append({ state = {}, commit }, params = {}) {
            let { datalist } = state;
            let { uid, checked } = params;
            await cookingApi[checked === "01" ? "append" : "remove"]({ uid });
            //遍历
            for (const key in datalist) {
                for (let i = 0; i < datalist[key].length; i++) {
                    if (datalist[key][i].uid === uid) {
                        datalist[key][i].checked = checked;
                        uid = null;
                        break;
                    }
                }
                if (!uid) break;
            }
            commit('update', { datalist });
        },
        async reload({ commit, dispatch }) {
            commit('update', { page: 1, totalSize: 0, datalist: { left: [], right: [] } });
            dispatch("pageQuery", {});
        },
        async setQuery({ state, commit, dispatch }, newQuery = {}) {
            let { query = {} } = state;
            let flag = true;
            for (const key in newQuery) {
                if (query[key] !== newQuery[key]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                //没有变更
                dispatch("backScrollY");
                return;
            }
            commit('update', { page: 1, totalSize: 0, query: newQuery });
            dispatch("pageQuery", {});
        },
        async setScrollY({ commit }) {
            let recruitScrollY = document.body.scrollTop
                ? document.body.scrollTop
                : document.documentElement.scrollTop;
            commit('update', { recruitScrollY });
        },
        async backScrollY({ state }) {
            if (backScrollYTimer) {
                clearTimeout(backScrollYTimer);
                backScrollYTimer = null;
            }
            backScrollYTimer = setTimeout(() => {
                let { recruitScrollY } = state;
                // chrome
                document.body.scrollTop = recruitScrollY;
                // firefox
                document.documentElement.scrollTop = recruitScrollY;
                // safari
                window.pageYOffset = recruitScrollY;
                clearTimeout(backScrollYTimer);
                backScrollYTimer = null;
            }, 200)
        }
    },
}

export default cooking;