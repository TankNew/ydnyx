<template>
  <div class="home-group-1">
    <div class="title">
      <h5>
        {{ firstGroup.displayName }}
        <span class="small float-right">
          <a herf>更多</a>
        </span>
      </h5>
    </div>
    <div class="group-list">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      currentPage: state => state.app.currentPage,
      homePage: state => state.app.homePage
    })
  },
  async asyncData(context) {
    const firstGroups = context.store.state.app.homePage.groups.filter(
      x => x.catalogGroup && x.catalogGroup.catalogType === 1
    )
    const firstGroup = firstGroups[0].catalogGroup
    
    await context.$axios.get('/api/services/app/CatalogGroup/GetAll', { params: { catalogType: firstGroup.id } })

    return { name: 'Main', userAgent: context.userAgent, firstGroup }
  },
  async fetch(context) {
    await context.store.dispatch('app/getHomePage')
  },
  created() {
    console.log(this.firstGroup)
  }
}
</script>
