<template>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">
      <span @click="toggleEditable" v-show="!editable">{{list.name}}</span>
      <input type="text"
             class="form-control"
             v-show="editable"
             v-model.trim="list.name"
             @input="updateList"
             @blur="toggleEditable"/></h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group mr-2">
        <button class="btn btn-sm btn-outline-secondary">Share</button>
        <button class="btn btn-sm btn-outline-secondary">Export</button>
      </div>
      <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
        <span data-feather="versions"></span>
        Versions
      </button>
    </div>
  </div>
  <!--canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas-->
  <GearListCategory
    v-for="category in list.categories"
    :key="category.name"
    :category="category"/>
</main>
</template>

<script>
import GearListCategory from './GearListCategory.vue'

export default {
  components: {
    GearListCategory
  },
  data() {
    return {
      editable: false
    }
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleEditable() {
      this.editable=!this.editable;
    },
    updateList() {
        this.gearListStore.updateOrAdd(this.list);
    }
  },
  created() {
    this.gearListStore = this.$hoodie.store.withIdPrefix('gearList');
    if (!this.list.categories) {
      this.list.categories = [];
      this.list.categories.push({});
    }
  }
}
</script>
