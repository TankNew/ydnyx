const state = () => ({
  navbars: [],
  currentPage: {},
  companyInfo: {},
  partners: []
})
const mutations = {
  setCompanyInfo(state, val) {
    state.companyInfo = val
  }
}

const actions = {
  async getNavbars(context) {
    const res = await this.$axios.get('/api/services/app/Navbar/GetAll')
    if (res.data.success) {
      context.state.navbars = res.data.result
      context.state.currentPage = context.state.navbars[0]
    }
  },
  async getCompanyInfo(context) {
    const res = await this.$axios.get('/api/services/app/CompanyInfo/GetOrCreate')
    if (res.data.success) {
      context.commit('setCompanyInfo', res.data.result)
    }
  },
  setCurrentPage(context, val) {
    const child = findChild(context.state.navbars, val)
    if (child !== null) context.state.currentPage = child
  },
  async getPartner(context) {
    const res = await this.$axios.get('/api/services/app/Partner/GetAll')
    if (res.data.success) context.state.partners = res.data.result
  }
}

const findChild = function(arry, val) {
  let res = null
  for (let i = 0; i < arry.length; i++) {
    if (arry[i].url === val) {
      res = arry[i]
      break
    } else if (arry[i].children && arry[i].children.length > 0) findChild(arry[i].children)
  }
  return res
}
export default {
  state,
  mutations,
  actions
}
