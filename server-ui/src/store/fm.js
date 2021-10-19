
import { fmApi } from "@/api";

const fm = {
    namespaced: true,
    state: () => ({
        list: []
    }),
    mutations: {
        update(state, payload = {}) {
            for (const key in payload) {
                state[key] = payload[key];
            }
        }
    },
    actions: {
        async queryAll({ commit, state = {} }, newQuery = {}) {
            let { list } = state;
            let { type } = newQuery;
            if (list && list.length > 0) {
                return;
            }
            let result = await fmApi.queryAll({ type }) || [];
            commit('update', { list: result })
        },
    },
}

export default fm;