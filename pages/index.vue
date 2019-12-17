<template>
  <div class="container">
    <div>
      <logo />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Logo from '~/components/Logo.vue'
export default {
    components: {
        Logo
    },
    fetch(context) {
        // context.redirect('/main/home')
        // The fetch method is used to fill the store before rendering the page
    },
    beforeCreate() {},
    async created() {
        await this.fetchSomething()
    },
    methods: {
        async fetchSomething() {
            const ip = (await axios.get('http://icanhazip.com')).data
            console.log(ip)
            this.ip = ip
        }
    }
}
</script>
