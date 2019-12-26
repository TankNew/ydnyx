const state = () => ({
  navbars: [],
  currentPath: {},
  currentPathParent: {},
  companyInfo: {},
  partners: [],
  homePage: {}
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
      context.state.navbars = res.data.result[0].children
      context.state.currentPath = context.state.navbars[0]
    }
  },
  async getCompanyInfo(context) {
    const res = await this.$axios.get('/api/services/app/CompanyInfo/GetOrCreate')
    if (res.data.success) {
      context.commit('setCompanyInfo', res.data.result)
    }
  },
  setcurrentPath(context, val) {
    const child = findChild(context.state.navbars, val)
    if (child !== null) {
      context.state.currentPath = child

      let element = null
      const array = context.state.navbars
      const parentId = context.state.currentPath.parentId

      for (let index = 0; index < array.length; index++) {
        if (array[index].id === parentId) {
          element = array[index]
          break
        }
      }
      context.state.currentPathParent = element
    }
  },
  async getPartner(context) {
    const res = await this.$axios.get('/api/services/app/Partner/GetAll')
    if (res.data.success) context.state.partners = res.data.result
  },
  async getHomePage(context) {
    const res = await this.$axios.get('/api/services/app/HomePage/GetOrCreate')
    if (res.data.success) context.state.homePage = res.data.result
  },
  async getAnounces(context, params) {
    const res = await this.$axios.get('/api/services/app/Announce/GetAll', params)
    if (res.data.success) return res.data.result
  },
  async getPage(context, params) {
    const res = await this.$axios.get('/api/services/app/Page/Get', params)
    if (res.data.success) return res.data.result
  },
  async getCatalogList(context, params) {
    const res = await this.$axios.get('/api/services/app/Catalog/GetAll', params)
    if (res.data.success) return res.data.result
  },
  async getCatalog(context, params) {
    const res = await this.$axios.get('/api/services/app/Catalog/Get', params)
    if (res.data.success) return res.data.result
  }
}

const findChild = function(arry, val) {
  let res = null
  for (let i = 0; i < arry.length; i++) {
    if (arry[i].url && val && val.toLowerCase().includes(arry[i].url.toLowerCase())) {
      res = arry[i]
      break
    } else if (arry[i].children && arry[i].children.length > 0) {
      res = findChild(arry[i].children, val)
      if (res) return res
    }
  }
  return res
}
export default {
  state,
  mutations,
  actions
}
