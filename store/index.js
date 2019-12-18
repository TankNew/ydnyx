// 禁用严格模式
const strict = false

//首先，只需将状态导出为 函数，将变量和操作作为 store/index.js 中的对象导出：
const state = () => ({
    number: 0,
    ip: null
})
const mutations = {
    DECREMENT_MAIN_COUNTER(state) {
        state.number--
    },
    INCREMENT_MAIN_COUNTER(state) {
        state.number++
    }
}

const actions = {
    someAsyncTask({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    },
    setIp(context, val) {
        context.state.ip = val
    }
}

export default {
    strict,
    state,
    mutations,
    actions
}
