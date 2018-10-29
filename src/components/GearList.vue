<template>
<div :class="{ 'd-none': !isActive }">
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">
      <input type="text"
             title="Click to edit!"
             class="form-control"
             v-model.trim="list.name"
             @change="updateList"
             />
    </h1>
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

  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <tbody>
        <tr
          v-for="(category, idx) in list.categories"
          :key="idx"
          >
          <td>{{category.name}}</td>
          <td>{{sumWeights(category.items)}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td>{{totalWeight()}}</td>
        </tr>
        <tr>
          <th>Base Weight</th>
          <td>{{baseWeight()}}</td>
        </tr>
        <tr>
          <th>Worn</th>
          <td>{{wornWeight()}}</td>
        </tr>
        <tr>
          <th>Consumables</th>
          <td>{{consumablesWeight()}}</td>
        </tr>
        <tr>
          <th>Pack</th>
          <td>{{packWeight()}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <!--canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas-->
  <GearListCategory
    v-for="(category, idx) in list.categories"
    :key="idx"
    :category="category"
    @categoryUpdated="updateList"
    @deleteCategory="deleteCategory(idx)"
    />
  <a href="#" @click="addNewCategory">Add new category</a>
</div>
</template>

<script>
import GearListCategory from './GearListCategory.vue'

export default {
  components: {
    GearListCategory
  },
  data() {
    return {
      isActive: false
    }
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  methods: {
    addNewCategory() {
      this.list.categories.push({name: "New Category", items: []});
      this.updateList();
    },
    deleteCategory(idx) {
      this.list.categories.splice(idx, 1);
      this.updateList();
    },
    setActive() {
      this.isActive = true
    },
    updateList() {
      this.gearListStore.updateOrAdd(this.list);
    },
    sumWeights(items, filter) {
      if (!filter) filter = () => true;
      return items.filter(filter).reduce((sum, item) => sum + item.weight, 0);
    },
    totalWeight() {
      return this.list.categories.reduce((sum, category) => sum + this.sumWeights(category.items), 0);
    },
    baseWeight() {
      const filter = (item) => item.category != 'worn' && item.category != 'consumable';
      return this.list.categories.reduce((sum, category) => sum + this.sumWeights(category.items, filter), 0);
    },
    consumablesWeight() {
      const filter = (item) => item.category == 'consumable';
      return this.list.categories.reduce((sum, category) => sum + this.sumWeights(category.items, filter), 0);
    },
    packWeight() {
      const filter = (item) => item.category != 'worn';
      return this.list.categories.reduce((sum, category) => sum + this.sumWeights(category.items, filter), 0);
    },
    wornWeight() {
      const filter = (item) => item.category == 'worn';
      return this.list.categories.reduce((sum, category) => sum + this.sumWeights(category.items, filter), 0);
    }
  },
  created() {
    this.gearListStore = this.$hoodie.store.withIdPrefix('gearList');
    if (!this.list.categories) {
      this.list.categories = [];
      this.addNewCategory();
    }
  }
}
</script>

<style>
h1.h2 input {
  font-size: 2.0rem;
  height: 3.0rem !important;
  margin-left: -10px;
  border-color: #fff;
}
</style>
