export default async function({ store, app, route }, inject) {
  if (!app.$cookies.get(store.state.location.data.headerName)) {
    const language = 'zh-CN'
    app.$cookies.set(store.state.location.data.headerName, language, {
      path: store.state.abp.appPath || '/',
      maxAge: 5 * 365 * 86400000
    })
  }

  await store.dispatch('getAbp')
  await store.dispatch('app/getCompanyInfo')
  await store.dispatch('app/getNavbars')
  // store.dispatch('app/setcurrentPath', route.path)
  //   stroe.commit('app/initCachepage')
  //   stroe.commit('app/updateMenulist')
}
