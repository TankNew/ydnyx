const state = () => ({
  navbars: [],
  currentPage: {}
})
const mutations = {}

const actions = {
  async getNavbars(context) {
    const res = await this.$axios.get('/api/services/app/Navbar/GetAll')
    if (res.data.success) {
      context.state.navbars = res.data.result
    }
  }
}
export default {
  state,
  mutations,
  actions
}
