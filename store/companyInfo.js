const state = () => ({
    data: {}
})
const mutations = {
    DECREMENT_MAIN_COUNTER(state) {
        state.number--
    },
    INCREMENT_MAIN_COUNTER(state) {
        state.number++
    },
    setData(state, val) {
        state.data = val
    }
}

const actions = {
    async get(context) {
        const res = await this.$axios.get(
            '/api/services/app/CompanyInfo/GetOrCreate'
        )
        if (res.data.success) {
            // context.state.data = res.data.result
            context.commit('setData', res.data.result)
        }
    }
}

export default {
    state,
    mutations,
    actions
}
