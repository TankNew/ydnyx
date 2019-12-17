<template>
  <div class="container">
    <div>
      {{ name }}
      {{ userAgent }}
    </div>
    <nuxt-child ref="main" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    asyncData(context) {
        // called every time before loading the component
        return { name: 'Main', userAgent: context.userAgent }
    },
    fetch() {
        // The fetch method is used to fill the store before rendering the page
    },
    head() {
        // Set Meta Tags for this Page
        return {
            title: '主题内容',
            meta: [{ hid: 'description', name: 'description', content: 'hi-Sen' }]
        }
    }
    // and more functionality to discover
}
</script>
