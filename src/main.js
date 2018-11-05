import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueHoodie from 'vue-hoodie'

import Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb'
Vue.use(VueHoodie)

const hoodie = new Hoodie({
  PouchDB,
  url: 'http://localhost:8084'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  hoodie: hoodie
}).$mount('#app')
