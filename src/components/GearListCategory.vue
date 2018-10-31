<template>
<div>
  <h2>
    <input type="text"
           title="Click to edit!"
           class="form-control"
           v-model.trim="category.name"
           @keypress.enter="$event.target.blur()"
           @change="updateCategory"
           />
  </h2>
  <table class="table table-responsive table-sm table-striped">
    <thead class="thead-dark">
      <tr>
        <th>#</th>
        <th style="width: 30%">Name</th>
        <th style="width: 70%">Description</th>
        <th colspan="2">Weight</th>
        <th>Qty</th>
        <th/>
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
        <td colspan="3">
          <a href="#"
             @click="addNewItem">Add new item</a>
        </td>
        <td class="sum text-right">{{totalWeight}}</td>
        <td>{{totalsUnit}}</td>
        <td class="sum text-right">{{totalQty}}</td>
        <td />
        <td/>
      </tr>
      <tr>
        <td colspan="8"><a @click="deleteCategory" href="#" class="delete-button">Delete category</a></td>
      </tr>
    </tfoot>
  </table>
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
        case 'kg': return weight * 1000;
        case 'oz': return weight * 28.35;
        case 'lb': return weight * 453.7;
        default: return weight;
        }
      };

      const convertToTotalsUnit = (weight) => {
        switch (this.totalsUnit) {
        case 'kg': return Number(weight/1000).toFixed(2);
        case 'oz': return Number(weight/28.35).toFixed(2);
        case 'lb': return Number(weight * 0.002204).toFixed(2);
        default: return weight;
        }
      };

      return convertToTotalsUnit(
        this.category.items.reduce((sum, item) => sum + item.qty * toGrams(item.weight, item.unit), 0));
    },
    totalQty () {
      return this.category.items.reduce((sum, item) => sum + item.qty, 0)
    }
  },
  methods: {
    addNewItem() {
      this.category.items.push({weight: 0, qty: 1, unit: "g", type: ""});
    },
    deleteCategory() {
      this.$emit('deleteCategory');
    },
    deleteItem(idx) {
      this.category.items.splice(idx, 1);
      this.$emit('categoryUpdated');
    },
    updateCategory() {
      this.$emit('categoryUpdated');
    }
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    totalsUnit: {
      type: String
    }
  }
}
</script>

<style>
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
