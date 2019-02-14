import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { NumberKeyboard, Toast, Cell, CellGroup, Loading } from 'vant'
Vue.use(NumberKeyboard).use(Toast).use(Cell).use(CellGroup).use(Loading)
Vue.config.productionTip = false
// BusEvent使用1/3
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
