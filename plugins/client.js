import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    //do something to validate
    if (to.path) window._hmt.push(['_trackPageview', to.fullPath])
    next()
  })
}
