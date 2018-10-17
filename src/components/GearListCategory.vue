<template>
<div class="gear-list-category">
  <h2>
    <span @click="toggleEditable" title="Click to edit" v-show="!editable">{{category.name}}</span>
    <input type="text"
           class="form-control"
           v-show="editable"
           v-model.trim="d_name"
           @keypress.enter="updateCategoryName"
           @blur="updateCategoryName"
           />
  </h2>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
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
        <tr
          v-for="item in category.items"
          :key="item.name">
          <td>[pic/tbd]</td>
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>[options/tbd]</td>
          <td>{{item.weight}}</td>
          <td>{{item.unit}}</td>
          <td>{{item.qty}}</td>
        </tr>
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
function toNum(any) {
  if (isNaN(any)) return 0;
}

export default {
  computed: {
    totalWeight () {
      return this.category.items.reduce((sum, item) => sum + toNum(item.weight), 0)
    },
    totalQty () {
      return this.category.items.reduce((sum, item) => sum + toNum(item.qty), 0)
    }
  },
  data() {
    return {
      d_name: this.category.name,
      editable: false
    }
  },
  methods: {
    addNewItem() {
      this.category.items.push({});
    },
    toggleEditable() {
      this.editable=!this.editable;
    },
    updateCategoryName() {
      this.editable = false;
      if (this.category.name != this.d_name) {
        this.category.name = this.d_name;
        this.$emit('updateCategory');
      }
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
