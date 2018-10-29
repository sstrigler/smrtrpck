<template>
<div class="gear-list-category">
  <h2>
    <input type="text"
           title="Click to edit!"
           class="form-control"
           v-model.trim="category.name"
           @change="updateCategory"
           />
  </h2>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Options</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Qty</th>
          <th />
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
          <td colspan="4">
            <a href="#"
               @click="addNewItem">Add new item</a>
          </td>
          <td>{{totalWeight}}</td>
          <td />
          <td>{{totalQty}}</td>
          <td />
        </tr>
        <tr>
          <td colspan="8"><a @click="deleteCategory" href="#">Delete category</a></td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
</template>

<script>
import GearListCategoryItem from './GearListCategoryItem.vue'

function toNum(any) {
  return isNaN(any) ? 0 : any;
}

export default {
  components: {
    GearListCategoryItem
  },
  computed: {
    totalWeight () {
      return this.category.items.reduce((sum, item) => sum + toNum(item.weight), 0)
    },
    totalQty () {
      return this.category.items.reduce((sum, item) => sum + toNum(item.qty), 0)
    }
  },
  methods: {
    addNewItem() {
      this.category.items.push({weight: 0, qty: 0});
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
      require: true
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
</style>
