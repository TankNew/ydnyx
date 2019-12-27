<template>
  <section class="home">
    <div class="home-group-1">
      <div class="title">
        <h5>
          {{ firstGroup.displayName }}
          <span class="small float-right">
            <nuxt-link :to="'/main/news/'+firstGroup.id" class="white">
              <i class="fas fa-angle-double-right mr-1"></i>更多
            </nuxt-link>
          </span>
        </h5>
      </div>
      <div class="list">
        <ul>
          <li
            v-for="item in firstGroup.children"
            :key="item.id"
            @click="goNewsGroup(item.id,1)"
          >
            <img :src="item.cover" />
            <span class="cover-title">{{ item.displayName }}</span>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
    </div>
    <div class="home-body">
      <div class="photo-group-container">
        <div class="photo-group-right">
          <div class="photo-group-right-top">
            <div class="title">
              <h5>
                {{ secondGroup.displayName }}
                <span class="small float-right">
                  <a href="#" class="white">
                    <i class="fas fa-angle-double-right mr-1"></i>更多
                  </a>
                </span>
              </h5>
            </div>
            <ul>
              <li
                v-for="(item,index) in secondGroupItems"
                :key="index"
                v-if="index<2"
                @click="goNewsDetail(item.id,1)"
              >
                <img :src="item.cover" />
                <span class="cover-title">{{ item.title }}</span>
              </li>
            </ul>
          </div>
          <div class="photo-group-right-bottom">
            <h5>{{ thirdGroup.displayName }}</h5>
            <div class="list">
              <ul>
                <li v-for="item in thirdGroupItems" :key="item.id">
                  <a
                    @click="goNewsDetail(item.id,1)"
                    href="javascript:void(0)"
                  >{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="photo-group-left">
          <div class="title">
            <h5>
              {{ firstPhotoGroup.displayName }}
              <span class="small float-right">
                <a href="#" class="white">
                  <i class="fas fa-angle-double-right mr-1"></i>更多
                </a>
              </span>
            </h5>
          </div>
          <div class="list">
            <ul>
              <li
                v-for="item in firstPhotoGroupItems"
                :key="item.id"
                @click="goNewsDetail(item.id,3)"
              >
                <img :src="item.cover" />
                <div class="cover-title">
                  <span>{{ item.title }}</span>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
          <p class="center">
            <button
              @click="goNewsGroup(firstPhotoGroup.id,3)"
              class="btn btn-orange"
              type="button"
            >点击查看更多</button>
          </p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="block container mt-5">
        <a :href="homePage.blocks[0].url" target="_blank">
          <img :src="homePage.blocks[0].img" class="img-fluid" />
        </a>
      </div>
      <div class="home-group-3">
        <div class="list">
          <ul>
            <li
              v-for="item in fourthGroupItems"
              :key="item.id"
              @click="goNewsDetail(item.id,2)"
            >
              <img :src="item.cover" />
              <span class="cover-title">{{ item.title }}</span>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="home-footer">
      <div class="home-footer-container">
        <div class="home-footer-left">
          <div class="title">
            <h5>{{ fifthGroup.displayName }}</h5>
          </div>
          <div class="top-news">
            <div class="cover">
              <a
                @click="goNewsGroup(fifthGroup.id,1)"
                href="javascript:void(0)"
              >
                <img :src="fifthGroupItemsTop.cover" />
              </a>
            </div>
            <div class="info">
              <h5>
                <a
                  @click="goNewsDetail(fifthGroupItemsTop.id,1)"
                  href="javascript:void(0)"
                  class="orange"
                >{{ filter(fifthGroupItemsTop.title,30 ) }}</a>
              </h5>
              <p>
                <a
                  @click="goNewsDetail(fifthGroupItemsTop.id,1)"
                  href="javascript:void(0)"
                >{{ filter(fifthGroupItemsTop.content,260 ) }}</a>
              </p>
              <p class="text-right mt-2">
                <a
                  @click="goNewsDetail(fifthGroupItemsTop.id,1)"
                  href="javascript:void(0)"
                  class="orange"
                >
                  <i class="fas fa-angle-double-right mr-1"></i>查看详情
                </a>
              </p>
            </div>
          </div>
          <div class="other-news">
            <ul>
              <li v-for="item in fifthGroupItemsOther" :key="item.id">
                <div class="item-cover">
                  <a @click="goNewsDetail(item.id,1)" href="javascript:void(0)">
                    <img :src="item.cover" />
                  </a>
                </div>
                <div class="item">
                  <h5>
                    <a
                      @click="goNewsDetail(item.id,1)"
                      href="javascript:void(0)"
                      class="orange"
                    >{{ filter(item.title,26 ) }}</a>
                  </h5>
                  <p class="mb-0">
                    <a
                      @click="goNewsDetail(item.id,1)"
                      href="javascript:void(0)"
                    >{{ filter(item.content,86) }}</a>
                  </p>
                  <p class="text-right">
                    <a
                      @click="goNewsDetail(item.id,1)"
                      href="javascript:void(0)"
                      class="orange"
                    >
                      <i class="fas fa-angle-double-right mr-1"></i>查看详情
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="home-footer-right">
          <div class="title">
            <h5>{{ sixGroup.displayName }}</h5>
          </div>
          <div class="cover">
            <a @click="goNewsGroup(sixGroup.id,1)" href="javascript:void(0)">
              <img :src="sixGroup.cover" />
            </a>
          </div>
          <div class="list">
            <ul>
              <li v-for="item in sixGroupItems" :key="item.id">
                <a
                  @click="goNewsDetail(item.id,1)"
                  href="javascript:void(0)"
                >{{ filter(item.title,70 ) }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../utiltools/tools'
export default {
  data() {
    return {
      firstGroup: {},
      firstPhotoGroup: {},
      firstPhotoGroupItems: [],
      secondGroup: {},
      secondGroupItems: [],
      fourthGroup: {},
      fourthGroupItems: [],
      fifthGroup: {},
      fifthGroupItemsTop: {},
      fifthGroupItemsOther: [],
      sixGroup: {},
      sixGroupItems: [],
      thirdGroup: {},
      thirdGroupItems: []
    }
  },
  computed: {
    ...mapState({
      currentPath: state => state.app.currentPath,
      homePage: state => state.app.homePage
    })
  },
  async fetch(context) {
    await context.store.dispatch('app/getHomePage')
  },
  /**存放异步方法 */
  created() {
    this.loadFirstPhotoGroup()
    this.loadFirstGroup()
    this.loadSecondGroup()
    this.loadThird()
    this.loadFourthGroup()
    this.loadFifthGroup()
    this.loadSixGroup()
  },
  methods: {
    goNewsGroup(id, type) {
      switch (type) {
        case 1:
          this.$router.push('/main/news/' + String(id))
          break
        case 2:
          this.$router.push('/main/photonews/' + String(id))
          break
        case 3:
          this.$router.push('/main/product/' + String(id))
          break
      }
    },
    goNewsDetail(id, type) {
      let typename
      switch (type) {
        case 1:
          typename = 'news'
          break
        case 2:
          typename = 'photonews'
          break
        case 3:
          typename = 'product'
          break
      }
      window.open('/main/' + typename + '/detail/' + String(id), '_blank')
    },
    filter(val, length) {
      return tools.cutString(tools._filter(val), length)
    },
    async loadFirstGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 0) {
        this.firstGroup = Groups[0].catalogGroup
        const res = await this.$store.dispatch('app/getCatalogGroupList', { params: { id: this.firstGroup.id } })
        this.firstGroup.children = res
      }
    },
    async loadFirstPhotoGroup() {
      const Groups = this.$store.state.app.homePage.groups.filter(
        x => x.catalogGroup && x.catalogGroup.catalogType === 3
      )
      if (Groups.length > 0) {
        this.firstPhotoGroup = Groups[0].catalogGroup
        const params = {
          params: {
            CatalogGroupId: this.firstPhotoGroup.id,
            SkipCount: 0,
            MaxResultCount: 8,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.firstPhotoGroupItems = res.items
      }
    },
    async loadSecondGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 0) {
        this.secondGroup = Groups[1].catalogGroup
        const params = {
          params: {
            CatalogGroupId: this.secondGroup.id,
            SkipCount: 0,
            MaxResultCount: 2,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.secondGroupItems = res.items
      }
    },
    async loadThird() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 0) {
        this.thirdGroup = Groups[2].catalogGroup
        const params = {
          params: {
            CatalogGroupId: this.thirdGroup.id,
            SkipCount: 0,
            MaxResultCount: 6,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.thirdGroupItems = res.items
      }
    },
    async loadFourthGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 2)
      if (Groups.length > 0) {
        this.fourthGroup = Groups[0].catalogGroup

        const params = {
          params: {
            CatalogGroupId: this.fourthGroup.id,
            SkipCount: 0,
            MaxResultCount: 5,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.fourthGroupItems = res.items
      }
    },
    async loadFifthGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 0) {
        this.fifthGroup = Groups[3].catalogGroup

        const params = {
          params: {
            CatalogGroupId: this.fifthGroup.id,
            SkipCount: 0,
            MaxResultCount: 4,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.fifthGroupItemsTop = res.items[0]
        this.fifthGroupItemsOther = res.items.filter((x, index) => index > 0)
      }
    },
    async loadSixGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 0) {
        this.sixGroup = Groups[4].catalogGroup

        const params = {
          params: {
            CatalogGroupId: this.sixGroup.id,
            SkipCount: 0,
            MaxResultCount: 5,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.sixGroupItems = res.items
      }
    }
  }
}
</script>
