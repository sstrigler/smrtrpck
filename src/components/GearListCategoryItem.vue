<template>
  <tr class="form-group">
    <td></td>
    <td>
      <input type="text"
             class="form-control form-control-sm"
             placeholder="Name"
             v-model.trim="item.name"
             @change="updateItem"
             />
    </td>
    <td >
      <input type="text"
             class="form-control form-control-sm"
             placeholder="Description"
             v-model.trim="item.description"
             @change="updateItem"
             />
    </td>
    <td></td>
    <td>
      <input type="number"
             min="0"
             class="form-control form-control-sm"
             placeholder="Weight"
             v-model.number="item.weight"
             @change="updateItem"
             />
    </td>
    <td>{{item.unit}}</td>
    <td>
      <input type="number"
             min="0"
             class="form-control form-control-sm"
             placeholder="Qty"
             v-model.number="item.qty"
             @change="updateItem"
             />
    </td>
    <td><a class="d-flex align-items-center text-muted" href="#" @click="deleteItem">
        <x-circle-icon class="feather"></x-circle-icon>
    </a></td>
  </tr>
</template>

<script>
import { XCircle } from 'vue-feather-icon'

export default {
  components: {
    XCircleIcon: XCircle.default
  },
  methods: {
    deleteItem() {
      this.$emit('deleteItem');
    },
    updateItem() {
      this.$emit('itemUpdated');
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

td .feather {
  margin-top: 7px;
  visibility: hidden;
}

tr:hover td .feather {
  visibility: visible;
}
</style>
