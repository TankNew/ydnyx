<template>
  <div class="body-container">
    <header>
      <div class="header-title container">
        <div class="logo">
          <img :src="companyInfo.logo" />
        </div>
        <div class="company-name">{{ companyInfo.appName }}</div>
        <div class="contact-info position-relative">
          <a :href="'tel://'+ companyInfo.tel" class="phone">
            <i class="fas fa-phone"></i>
            <span>{{ companyInfo.tel }}</span>
          </a>
          <a
            @click="isWeixinShow=true"
            href="javascript:void(0)"
            class="weixin"
          >
            <i class="fab fa-weixin"></i>
            <span>官方微信公众平台</span>
          </a>
          <div v-show="isWeixinShow" class="wexin-code">
            <div class="code">
              <img :src="companyInfo.weixinBarCode" />
              <h6>扫一扫，直接在手机上打开</h6>
              <p>推荐微信、QQ扫一扫等扫码工具</p>
            </div>
            <span @click="isWeixinShow=false" class="close">
              <i class="fas fa-times"></i>
            </span>
          </div>
        </div>
      </div>
      <b-navbar toggleable="lg" type="orange" variant="orange">
        <b-navbar-brand>{{ companyInfo.appName }}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <section v-for="item in navbars" :key="item.id">
              <b-nav-item-dropdown
                v-if="item.children&&item.children.length>0"
                :class="[currentPath.id===item.id
                ||(currentPathParent&&currentPathParent.id===item.id)?'active':'']"
                :text="$L(item.displayName)"
              >
                <b-dropdown-item
                  v-for="ditem in item.children"
                  :key="ditem.id"
                  :to="ditem.url"
                >{{ $L(ditem.displayName) }}</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item
                v-else
                :class="[currentPath.id===item.id
                ||(currentPathParent&&currentPathParent.id===item.id)?'active':'']"
                :to="item.url"
              >{{ $L(item.displayName) }}</b-nav-item>
            </section>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <section :class="['banner',currentPath.navbarType===5?'':'sub']">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#fff"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <b-carousel-slide
          v-for="(item, index) in bannerImgs"
          :key="index"
          :img-src="getImgUrl(item.imgUrl)"
        >
          <div :class="currentFontPosition(item)">
            <h2>{{ item.title }}</h2>
            <p>{{ item.subTitle }}</p>
          </div>
        </b-carousel-slide>
      </b-carousel>
    </section>
    <section class="main">
      <nuxt-child ref="main" />
    </section>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-10">
            <ul class="footer-nav">
              <li
                :key="navi.id"
                v-for="navi in navbars"
                v-if="navi.navbarType!==5&&(!navi.url||(navi.displayName&&navi.displayName!=='联系我们'))"
              >
                <dl>
                  <dt>
                    <nuxt-link
                      v-if="navi.url"
                      :to="navi.url"
                      class="white"
                    >{{ navi.displayName }}</nuxt-link>
                    <span v-else>{{ navi.displayName }}</span>
                  </dt>
                  <dd :key="child.id" v-for="child in navi.children">
                    <nuxt-link
                      :to="child.url"
                      class="white"
                    >{{ child.displayName }}</nuxt-link>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
          <div class="col-md-2 col-sm-12 contact-info">
            <h5>咨询热线</h5>
            <h5>{{ companyInfo.tel }}</h5>
            <p>http://www.ydnyx.com</p>
            <p>
              <img :src="companyInfo.weixinBarCode" style="width:120px" />
            </p>
          </div>
        </div>
        <div class="partner">
          <dl>
            <dt>友情链接</dt>
            <dd v-for="item in partners.items" :key="item.id">
              <a :href="item.url" class="white" target="_blank">
                <span>{{ item.title }}</span>
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </footer>
    <div class="footer-bottom">
      <div class="container">
        <dl>
          <dd>{{ companyInfo.appName }}</dd>
          <dd v-for="item in companyInfo.icps">
            <a
              class="gongan"
              target="_blank"
              href="http://beian.miit.gov.cn/publish/query/indexFirst.action"
            >
              <p>津ICP备{{ item }}</p>
            </a>
          </dd>
          <dd v-for="item in companyInfo.gongAns">
            <a
              :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${item}`"
              class="gongan"
              target="_blank"
            >
              <img src="@/assets/imgs/gongan.png" />
              <p>津公网安备{{ item }}号</p>
            </a>
          </dd>
          <dd>
            技术支持：
            <a href="https://www.ednet.cn" target="_blank">e德互联</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import AppConsts from '../utiltools/appconst'
export default {
  head() {
    return {
      title: this.$L(this.currentPath.displayName) + ' - ' + this.companyInfo.appName,
      meta: [{ hid: 'description', name: 'description', content: 'hi-Sen' }]
    }
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      isWeixinShow: false
    }
  },
  computed: {
    ...mapState({
      abp: state => state.abp,
      companyInfo: state => state.app.companyInfo,
      navbars: state => state.app.navbars,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent,
      partners: state => state.app.partners,
      bannerImgs: state =>
        state.app.currentPath.bannerImgs.length > 0
          ? state.app.currentPath.bannerImgs
          : state.app.currentPathParent.bannerImgs
    })
  },
  watch: {
    $route(val) {
      this.setcurrentPath(this.$route.path)
    }
  },
  asyncData(context) {
    return { name: 'Main', userAgent: context.userAgent }
  },
  async fetch(context) {
    await context.store.dispatch('app/getPartner')
  },
  created() {
    this.setcurrentPath(this.$route.path)
  },

  methods: {
    ...mapActions({ setcurrentPath: 'app/setcurrentPath' }),
    go(url) {
      this.$router.push({ path: url })
    },
    getImgUrl(val) {
      if (val) return AppConsts.remoteServiceBaseUrl + val
      else return null
    },
    currentFontPosition(item) {
      return `banner-font ${item.titleAlign} ${item.titleVertical}`
    }
  }
}
</script>
