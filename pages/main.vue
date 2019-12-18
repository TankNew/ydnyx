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
            <b-nav-item
              v-for="item in navbar[0].children"
              :key="item.id"
              href="#"
            >{{ item.displayName }}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <nuxt-child ref="main" />
    <footer></footer>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    head() {
        return {
            title: this.companyInfo.appName,
            meta: [
                { hid: 'description', name: 'description', content: 'hi-Sen' }
            ]
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters({ currentPath: 'path/current' }),
        ...mapState({
            ip: 'ip',
            companyInfo: state => state.companyInfo.data,
            navbar: state => state.navbar.data
        })
    },
    asyncData(context) {
        return { name: 'Main', userAgent: context.userAgent }
    },
    async fetch(context) {
        const ip = (await axios.get('http://icanhazip.com')).data
        context.store.dispatch('setIp', ip)
        await context.store.dispatch('companyInfo/get')
        await context.store.dispatch('navbar/getAll')
    },

    created() {},
    mounted() {
        // console.log(this.navbar)
        // console.log(abp)
        // console.log(this.ip)
        // console.log(this.L('HomePage'))
    },
    methods: {}
}
</script>
