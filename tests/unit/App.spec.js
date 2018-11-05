import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'

import VueHoodie from 'vue-hoodie'

import Hoodie from '@hoodie/client'
import PouchDB from 'pouchdb'
const localVue = createLocalVue()
localVue.use(VueHoodie)

const hoodie = new Hoodie({
  PouchDB,
  url: 'http://localhost:8084'
})

describe('App.vue', () => {
  it('a simple smoke test', () => {
    const wrapper = shallowMount(App, { localVue, hoodie })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
