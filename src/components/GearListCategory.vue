<template>
<div class="gear-list-category">
  <h2>
    <input type="text"
           title="Click to edit!"
           class="form-control"
           v-model.trim="d_category.name"
           @change="updateCategoryName"
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
        </tr>
      </thead>
      <tbody>
        <GearListCategoryItem
          v-for="item in d_category.items"
          :key="item.name"
          :item="item"/>
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
        </tr>
      </tfoot>
    </table>
  </div>
</div>
</template>

<script>
import GearListCategoryItem from './GearListCategoryItem.vue'

function toNum(any) {
  if (isNaN(any)) return 0;
}

export default {
  components: {
    GearListCategoryItem
  },
  computed: {
    totalWeight () {
      return this.d_category.items.reduce((sum, item) => sum + toNum(item.weight), 0)
    },
    totalQty () {
      return this.d_category.items.reduce((sum, item) => sum + toNum(item.qty), 0)
    }
  },
  data() {
    return {
      d_category: {...this.category}
    }
  },
  methods: {
    addNewItem() {
      this.d_category.items.push({});
    },
    updateCategoryName() {
      console.log(this.d_category.name);
      this.category.name = this.d_category.name;
      this.$emit('updateCategory');
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
