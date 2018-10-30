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
    <!--div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group mr-2">
        <button class="btn btn-sm btn-outline-secondary">Share</button>
        <button class="btn btn-sm btn-outline-secondary">Export</button>
      </div>
      <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
        <span data-feather="versions"></span>
        Versions
      </button>
    </div-->
  </div>

  <table align="right" class="table table-respsonsive table-sm text-nowrap">
    <thead class="thead-dark">
      <tr>
        <th style="width: 100%">Category</th>
        <th colspan="2">Weight</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(category, idx) in list.categories"
        :key="idx"
        >
        <td>{{category.name}}</td>
        <td class="text-right">{{convertToTotalsUnit(categoryWeight(category, () => true))}}</td>
        <td>{{list.totalsUnit}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Worn</th>
        <td class="text-right">{{totalWeight((item) => item.type == 'worn')}}</td>
        <td>{{list.totalsUnit}}</td>
      </tr>
      <tr>
        <th>Consumables</th>
        <td class="text-right">{{totalWeight((item) => item.type == 'consumable')}}</td>
        <td>{{list.totalsUnit}}</td>
      </tr>
      <tr>
        <th>Base Weight</th>
        <td class="text-right">{{totalWeight((item) => item.type != 'consumable' && item.type != 'worn')}}</td>
        <td>{{list.totalsUnit}}</td>
      </tr>
      <tr>
        <th>Packed</th>
        <td class="text-right">{{totalWeight((item) => item.type != 'worn')}}</td>
        <td>{{list.totalsUnit}}</td>
      </tr>
      <tr>
        <th>Total</th>
        <td class="text-right">{{totalWeight(() => true)}}</td>
        <td>
          <select
            v-model="list.totalsUnit"
            @change="updateList"
            >
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="oz">oz</option>
            <option value="lb">lb</option>
          </select>
        </td>
      </tr>
    </tfoot>
  </table>
  
  <GearListCategory
    v-for="(category, idx) in list.categories"
    :key="idx"
    :category="category"
    :totalsUnit="list.totalsUnit"
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
    categoryWeight(category, filter) {
      const toGrams = (weight, unit) => {
        switch (unit) {
        case 'kg': return weight * 1000;
        case 'oz': return weight * 28.35;
        case 'lb': return weight * 453.7;
        default: return weight;
        }
      };      
      return category.items.filter(filter).reduce((sum, item) => sum + item.qty * toGrams(item.weight, item.unit), 0);
    },
    convertToTotalsUnit(weight) {
      switch (this.list.totalsUnit) {
      case 'kg': return Number(weight / 1000).toFixed(2);
      case 'oz': return Number(weight / 28.35).toFixed(2);
      case 'lb': return Number(weight * 0.002204).toFixed(2);
      default: return weight;
      }
    },
    totalWeight(filter) {
      return this.convertToTotalsUnit(
        this.list.categories.reduce((sum, category) => sum + this.categoryWeight(category, filter), 0));
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

tfoot th {
  text-align: right;
}
</style>
