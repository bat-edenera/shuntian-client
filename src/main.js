import Vue from 'vue'
import App from './app/App.vue'
import router from '@/shared/router'
import store from '@/shared/store'
import './shared/plugins/element'
import './shared/plugins/common'
import './assets/style.scss'
// import sassStyle from '@/assets/style.module.scss'

Vue.config.productionTip = false;
// Vue.prototype.$sass = sassStyle;
export default new Vue({
  router,
  store,
  render: h => h(App)
})
// .$mount('#app')
