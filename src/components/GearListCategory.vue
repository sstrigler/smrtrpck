<template>
<div class="col-xl-9 col-12 p-0 m-0 pr-lg-3">
  <h2 class="h2">
    <a :id="'cat-' + cat_id" class="anchor"></a>
    <input type="text"
           title="Click to edit!"
           class="form-control"
           placeholder="New Category"
           v-model.trim="category.name"
           @keypress.enter="$event.target.blur()"
           @change="updateCategory"
           />
  </h2>
  <table class="table table-sm table-responsive table-striped mb-0">
    <thead class="thead-dark">
      <tr>
        <th style="width: 30%; min-width: 6rem;">Name</th>
        <th style="width: 70%; min-width: 10rem;">Description</th>
        <th colspan="2">Weight</th>
        <th>Qty</th>
        <th>Type</th>
        <th/>
      </tr>
    </thead>
    <tbody>
      <GearListCategoryItem
        v-for="(item, idx) in category.items"
        :key="idx"
        :item="item"
        @deleteItem="deleteItem(idx)"
        @itemUpdated="updateCategory"/>
      </tbody>
    <tfoot>
      <tr>
        <th class="text-right" colspan="2">
          Total
        </th>
        <td class="sum text-right">{{totalWeight}}</td>
        <td class="bold">{{totalsUnit}}</td>
        <td class="sum text-right">{{totalQty}}</td>
        <td />
        <td/>
      </tr>
    </tfoot>
  </table>
  <div class="d-flex justify-content-end">
    <button class="btn btn-sm btn-primary"
            @click="addNewItem">Add new item</button>
  </div>
</div>
</template>

<script>
import GearListCategoryItem from './GearListCategoryItem.vue'

export default {
  components: {
    GearListCategoryItem
  },
  computed: {
    totalWeight () {
      const toGrams = (weight, unit) => {
        switch (unit) {
          case 'kg': return weight * 1000
          case 'oz': return weight * 28.35
          case 'lb': return weight * 453.7
          default: return weight
        }
      }

      const convertToTotalsUnit = (weight) => {
        switch (this.totalsUnit) {
          case 'kg': return Number(weight / 1000).toFixed(2)
          case 'oz': return Number(weight / 28.35).toFixed(2)
          case 'lb': return Number(weight * 0.002204).toFixed(2)
          default: return weight
        }
      }

      return convertToTotalsUnit(
        this.category.items.reduce((sum, item) => sum + item.qty * toGrams(item.weight, item.unit), 0))
    },
    totalQty () {
      return this.category.items.reduce((sum, item) => sum + item.qty, 0)
    }
  },
  methods: {
    addNewItem () {
      this.category.items.push({ weight: 0, qty: 1, unit: 'g', type: '' })
    },
    deleteItem (idx) {
      this.category.items.splice(idx, 1)
      this.$emit('categoryUpdated')
    },
    updateCategory () {
      this.$emit('categoryUpdated')
    }
  },
  mounted () {
    this.$el.children[0].children[1].focus()
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    totalsUnit: {
      type: String
    },
    cat_id: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.anchor {
  display: block;
  position: relative;
  top: -48px;
  visibility: hidden;
}

h2 input {
  font-size: 1.4rem !important;
  margin-left: -10px;
  border-color: #fff !important;
}

tfoot td.sum {
  font-weight:bold;
  padding-right: 1.5rem;
}
</style>
