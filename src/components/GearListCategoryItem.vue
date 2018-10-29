<template>
  <tr class="form-group">
    <td></td>
    <td>
      <input type="text"
             class="form-control form-control-sm"
             placeholder="Name"
             v-model.trim="d_item.name"
             @input="updateItem('name')"
             />
    </td>
    <td >
      <input type="text"
             class="form-control form-control-sm"
             placeholder="Description"
             v-model.trim="d_item.description"
             @input="updateItem('description')"
             />
    </td>
    <td></td>
    <td>
      <input type="number"
             class="form-control form-control-sm"
             placeholder="Weight"
             v-model.number="d_item.weight"
             @input="updateItem('weight')"
             />
    </td>
    <td>{{item.unit}}</td>
    <td>
      <input type="number"
             class="form-control form-control-sm"
             placeholder="Qty"
             v-model.number="d_item.qty"
             @input="updateItem('qty')"
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
    updateItem(key) {
      this.item[key] = this.d_item[key];
      this.$emit('itemUpdated', this.d_item);
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
tr:nth-of-type(2n+1) td input {
  background-color: #f2f2f2 !important;
  border-color: #f2f2f2 !important;
}
tr:nth-of-type(2n) td input {
  background-color: #fff !important;
  border-color: #fff !important;
}

td input[type="number"] {
  width: 60px;
}
</style>
