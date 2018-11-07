<template>
<div :class="{ 'd-none': !isActive }">
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">
      <input type="text"
             title="Click to edit!"
             class="form-control"
             v-model.trim="list.name"
             @keypress.enter="$event.target.blur()"
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

  <table class="table table-respsonsive table-sm table-striped text-nowrap form-group">
    <thead class="thead-dark">
      <tr>
        <th style="width: 100%">Category</th>
        <th colspan="2">Weight</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(category, idx) in categories"
        :key="idx"
        >
        <td>{{category.name}}</td>
        <td class="text-right font-weight-bold">{{convertToTotalsUnit(categoryWeight(category, () => true))}}</td>
        <td class="font-weight-bold">{{list.totalsUnit}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th class="text-right">Worn</th>
        <td class="text-right font-weight-bold">{{wornWeight}}</td>
        <td class="font-weight-bold">{{list.totalsUnit}}</td>
      </tr>
      <tr>
        <th class="text-right">Consumables</th>
        <td class="text-right font-weight-bold">{{consumableWeight}}</td>
        <td class="font-weight-bold">{{list.totalsUnit}}</td>
      </tr>
      <tr>
        <th class="text-right">Base Weight</th>
        <td class="text-right font-weight-bold">{{baseWeight}}</td>
        <td class="font-weight-bold">{{list.totalsUnit}}</td>
      </tr>
      <tr>
        <th class="text-right">Packed</th>
        <td class="text-right font-weight-bold">{{packedWeight}}</td>
        <td class="font-weight-bold">{{list.totalsUnit}}</td>
      </tr>
      <tr>
        <th class="text-right va-middle">Total</th>
        <td class="text-right font-weight-bold va-middle">{{totalWeight}}</td>
        <td>
          <select
            class="form-control form-control-sm"
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
    v-for="(category, idx) in categories"
    :key="idx"
    :category="category"
    :totalsUnit="list.totalsUnit"
    @categoryUpdated="updateList"
    @deleteCategory="deleteCategory(idx)"
    />

  <div style="padding-bottom: 1rem;">
    <a href="#" @click="addNewCategory">Add new category</a>
  </div>
</div>
</template>

<script>
import GearListCategory from './GearListCategory.vue'

export default {
  components: {
    GearListCategory
  },
  computed: {
    wornWeight: function () { return this.calcWeight((item) => item.type === 'worn') },
    consumableWeight: function () { return this.calcWeight((item) => item.type === 'consumable') },
    baseWeight: function () { return this.calcWeight((item) => item.type !== 'consumable' && item.type !== 'worn') },
    packedWeight: function () { return this.calcWeight((item) => item.type !== 'worn') },
    totalWeight: function () { return this.calcWeight(() => true) }
  },
  data: function () {
    return {
      isActive: false,
      gearListStore: this.$hoodie.store.withIdPrefix('gearList'),

      // [FIXME] if we don't keep this separate new list's view
      // doesn't get update with new categories
      categories: this.list.categories || []

    }
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  methods: {
    addNewCategory (e) {
      e.preventDefault()
      this.categories.push({ items: [] })
    },
    deleteCategory (idx) {
      this.categories.splice(idx, 1)
      this.updateList()
    },
    setActive () {
      this.isActive = true
    },
    updateList () {
      this.list.categories = this.categories // re-assign, see above
      this.gearListStore.updateOrAdd(this.list)
    },
    categoryWeight (category, filter) {
      const toGrams = (weight, unit) => {
        switch (unit) {
          case 'kg': return weight * 1000
          case 'oz': return weight * 28.35
          case 'lb': return weight * 453.7
          default: return weight
        }
      }
      return category.items.filter(filter).reduce((sum, item) => sum + item.qty * toGrams(item.weight, item.unit), 0)
    },
    convertToTotalsUnit (weight) {
      switch (this.list.totalsUnit) {
        case 'kg': return Number(weight / 1000).toFixed(2)
        case 'oz': return Number(weight / 28.35).toFixed(2)
        case 'lb': return Number(weight * 0.002204).toFixed(2)
        default: return weight
      }
    },
    calcWeight (filter) {
      return this.convertToTotalsUnit(
        this.categories.reduce((sum, category) => sum + this.categoryWeight(category, filter), 0))
    }
  },
  created () {
    if (this.categories.length === 0) this.addNewCategory()
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

.va-middle {
  vertical-align: middle !important;
}
</style>
