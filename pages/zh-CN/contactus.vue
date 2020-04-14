<template>
  <div class="container">
    <h4 class="page-title">
      <span>联系我们</span>
    </h4>
    <div class="page-content">
      <div class="contactus">
        <img class="img-fluid ad" src="~/assets/imgs/910x390px.jpg" />
        <ul class="address">
          <li>
            <label>
              <i class="fas fa-id-card"></i>名称
            </label>
            {{ companyInfo.appName }}
          </li>
          <li>
            <label>
              <i class="fas fa-map-marker-alt"></i>地址
            </label>
            {{ companyInfo.appAddress }}
          </li>
          <li>
            <label>
              <i class="fas fa-phone-volume"></i>电话
            </label>
            {{ companyInfo.tel }}
          </li>
          <li>
            <label>
              <i class="fas fa-envelope"></i>邮箱
            </label>
            {{ companyInfo.email }}
          </li>
        </ul>
      </div>
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
      companyInfo: state => state.app.companyInfo
    })
  },
  created() {}
}
</script>
