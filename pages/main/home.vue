<template>
  <div class="container">
    <div>Home</div>
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
      currentPage: state => state.app.currentPage
    })
  },
  created() {}
}
</script>
