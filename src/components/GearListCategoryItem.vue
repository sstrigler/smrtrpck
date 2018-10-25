<template>
  <tr class="form-group">
    <td>[tbd]</td>
    <td>
      <input type="text"
             class="form-control form-control-sm"
             placeholder="Name"
             v-model.trim="d_item.name"
             @input="updateItem"
             />
    </td>
    <td >
      <input type="text"
             class="form-control form-control-sm"
             placeholder="Description"
             v-model.trim="d_item.description"
             @input="updateItem"
             />
    </td>
    <td>[tbd]</td>
    <td>
      <input type="number"
             class="form-control form-control-sm"
             placeholder="Weight"
             v-model.number="d_item.weight"
             @input="updateItem"
             />
    </td>
    <td>{{item.unit}}</td>
    <td>
      <input type="number"
             class="form-control form-control-sm"
             placeholder="Qty"
             v-model.number="d_item.qty"
             @input="updateItem"
             />
    </td>
  </tr>
</template>

<script>
export default {
  data() {
    return {
      d_item: {...this.item}
    }
  },
  methods: {
    updateItem() {
      console.log(this.d_item);
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
td input {
  background-color: #f2f2f2 !important;
  border-color: #f2f2f2 !important;
}
td input[type="number"] {
  width: 80px;
}
</style>
