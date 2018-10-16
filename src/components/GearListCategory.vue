<template>
<div class="gear-list-category">
  <h2>{{name}}</h2>
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
          v-for="item in items">
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
      return this.items.reduce((sum, item) => sum + item.weight, 0)
    },
    totalQty () {
      return this.items.reduce((sum, item) => sum + item.qty, 0)
    }
  },
  props: {
    name: {
      type: String,
      default: "New Category"
    },
    items: {
      type: Array,
      default: function() { return []}
    }
  }
}
</script>
