const state = () => ({
    data: { culture: 'zh-CN', headerName: '.AspNetCore.Culture' }
})
const mutations = {
    set(state, val) {
        state.data = val
    }
}
const getters = {
    getCulture(state) {
        return state.data.culture
    }
}
const actions = {}
export default {
    state,
    getters,
    mutations,
    actions
}
