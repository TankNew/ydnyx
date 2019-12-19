<template>
  <div class="body-container">
    <header>
      <div class="header-title container">
        <div class="logo">
          <img :src="companyInfo.logo" />
        </div>
        <div class="company-name">{{ companyInfo.appName }}</div>
        <div class="contact-info">
          <a :href="'tel://'+ companyInfo.tel" class="phone">
            <i class="fas fa-phone"></i>
            <span>{{ companyInfo.tel }}</span>
          </a>
          <a href="javascript:void(0)" class="weixin">
            <i class="fab fa-weixin"></i>
            <span>官方微信公众平台</span>
          </a>
          <img :src="companyInfo.weixinBarCode" hidden />
        </div>
      </div>
      <b-navbar toggleable="lg" type="orange" variant="orange">
        <b-navbar-brand>{{ companyInfo.appName }}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/main/home">首页</b-nav-item>
            <section v-for="item in navbars[0].children" :key="item.id">
              <b-nav-item-dropdown
                v-if="item.navbarType===0"
                :text="item.displayName "
              >
                <b-dropdown-item
                  v-for="ditem in item.children"
                  :key="ditem.id"
                  :href="ditem.url"
                >{{ ditem.displayName }}</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item v-else :href="item.url">{{ item.displayName }}</b-nav-item>
            </section>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <nuxt-child ref="main" />
    <footer></footer>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  head() {
    return {
      title: this.companyInfo.appName,
      meta: [{ hid: 'description', name: 'description', content: 'hi-Sen' }]
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({ currentPath: 'path/current' }),
    ...mapState({
      companyInfo: state => state.companyInfo.data,
      navbars: state => state.app.navbars
    })
  },
  asyncData(context) {
    return { name: 'Main', userAgent: context.userAgent }
  },
  async fetch(context) {
    await context.store.dispatch('companyInfo/get')
    await context.store.dispatch('app/getNavbars')
  },

  created() {},
  mounted() {
    console.log(this.navbars)
    // console.log(abp)
    // console.log(this.ip)
    // console.log(this.L('HomePage'))
  },
  methods: {}
}
</script>
