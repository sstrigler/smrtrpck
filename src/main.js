import Vue from 'vue'
import App from './App.vue'
import VueHoodie from 'vue-hoodie';
Vue.use(VueHoodie);

import Hoodie from '@hoodie/client';
import PouchDB from 'pouchdb';

const hoodie = new Hoodie({
  PouchDB,
  url: 'http://localhost:8084'
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  hoodie: hoodie
}).$mount('#app')
