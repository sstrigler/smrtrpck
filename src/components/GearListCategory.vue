<template>
<div class="gear-list-category">
  <h2>
    <span @click="toggleEditable" v-show="!editable">{{category.name}}</span>
    <input type="text"
           class="form-control"
           v-show="editable"
           v-model.trim="d_name"
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
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td>{{totalWeight}}</td>
          <td />
          <td>{{totalQty}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    totalWeight () {
      return this.category.items.reduce((sum, item) => sum + item.weight, 0)
    },
    totalQty () {
      return this.category.items.reduce((sum, item) => sum + item.qty, 0)
    }
  },
  data() {
    return {
      d_name: this.category.name,
      editable: false
    }
  },
  methods: {
    toggleEditable() {
      this.editable=!this.editable;
    },
    updateCategoryName() {
      this.editable = false;
      this.category.name = this.d_name;
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
