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
              @click="goNewsGroup(firstPhotoGroup.id,2)"
              class="btn btn-orange"
              type="button"
            >点击查看更多</button>
          </p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="block container mt-5">
        <img :src="homePage.blocks[0].img" class="img-fluid" />
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
              <img :src="fifthGroup.cover" />
            </div>
            <div class="info">
              <h5>{{ filter(fifthGroupItemsTop.title,30 ) }}</h5>
              <p>{{ filter(fifthGroupItemsTop.content,160 ) }}</p>
              <p class="text-right">
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
                  <img :src="item.cover" />
                </div>
                <div class="item">
                  <h5>{{ filter(item.title,30 ) }}</h5>
                  <p class="mb-0">{{ filter(item.content,86) }}</p>
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
            <img :src="sixGroup.cover" />
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
      switch (type) {
        case 1:
          this.$router.push('/main/news/detail/' + String(id))
          break
        case 2:
          this.$router.push('/main/photonews/detail/' + String(id))
          break
        case 3:
          this.$router.push('/main/product/detail/' + String(id))
          break
      }
    },
    filter(val, length) {
      return tools.cutString(tools._filter(val), length)
    },
    async loadFirstGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 0) {
        this.firstGroup = Groups[0].catalogGroup
        await this.$axios
          .get('/api/services/app/CatalogGroup/GetAll', { params: { id: this.firstGroup.id } })
          .then(res => {
            if (res.data.success) this.firstGroup.children = res.data.result
          })
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
        await this.$axios.get('/api/services/app/Catalog/GetAll', params).then(res => {
          if (res.data.success) this.firstPhotoGroupItems = res.data.result.items
        })
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
        await this.$axios.get('/api/services/app/Catalog/GetAll', params).then(res => {
          if (res.data.success) this.secondGroupItems = res.data.result.items
        })
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
        await this.$axios.get('/api/services/app/Catalog/GetAll', params).then(res => {
          if (res.data.success) this.thirdGroupItems = res.data.result.items
        })
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
        await this.$axios.get('/api/services/app/Catalog/GetAll', params).then(res => {
          if (res.data.success) this.fourthGroupItems = res.data.result.items
        })
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
        await this.$axios.get('/api/services/app/Catalog/GetAll', params).then(res => {
          if (res.data.success) {
            this.fifthGroupItemsTop = res.data.result.items[0]
            this.fifthGroupItemsOther = res.data.result.items.filter((x, index) => index > 0)
          }
        })
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
        await this.$axios.get('/api/services/app/Catalog/GetAll', params).then(res => {
          if (res.data.success) this.sixGroupItems = res.data.result.items
        })
      }
    }
  }
}
</script>
