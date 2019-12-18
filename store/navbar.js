const state = () => ({
    data: {}
})
const mutations = {}

const actions = {
    async getAll(context) {
        const res = await this.$axios.get('/api/services/app/Navbar/GetAll')
        if (res.data.success) {
            context.state.data = res.data.result
        }
    }
}
export default {
    state,
    mutations,
    actions
}
