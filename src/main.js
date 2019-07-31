import Vue from 'vue'
import App from './App'
import store from './store/index'

import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

import WXrequest from './utils/wx-request'
Vue.prototype.$httpWX = WXrequest

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
