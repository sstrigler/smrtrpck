<template>
  <tr class="form-group">
    <td>
      <input type="text"
             class="form-control form-control-sm"
             placeholder="Name"
             v-model.trim="item.name"
             @keypress.enter="$event.target.blur()"
             @change="updateItem"
             />
    </td>
    <td >
      <input type="text"
             class="form-control form-control-sm"
             placeholder="Description"
             v-model.trim="item.description"
             @keypress.enter="$event.target.blur()"
             @change="updateItem"
             />
    </td>
    <td>
      <input type="number"
             lang="en-150"
             min="0"
             step="0.1"
             class="form-control form-control-sm text-right weight"
             placeholder="Weight"
             v-model.number="item.weight"
             @keypress.enter="$event.target.blur()"
             @change="updateItem"
             />
    </td>
    <td>
      <select
        class="form-control form-control-sm"
        v-model="item.unit"
        @change="updateItem"
        >
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="oz">oz</option>
        <option value="lb">lb</option>
      </select>
    </td>
    <td>
      <input type="number"
             min="0"
             class="form-control form-control-sm text-right qty"
             placeholder="Qty"
             v-model.number="item.qty"
             @keypress.enter="$event.target.blur()"
             @change="updateItem"
             />
    </td>
    <td>
      <select
        class="form-control form-control-sm"
        v-model="item.type"
        @change="updateItem"
        >
        <option value="">regular</option>
        <option value="worn">worn</option>
        <option value="consumable">consumable</option>
      </select>
    </td>
    <td>
      <a class="d-flex align-items-center text-muted" href="#" @click="deleteItem" title="Delete item">
        <x-circle-icon class="feather delete-icon"></x-circle-icon>
      </a>
    </td>
  </tr>
</template>

<script>
import { XCircle } from 'vue-feather-icon'

export default {
  components: {
    XCircleIcon: XCircle.default
  },
  mounted() {
    this.$el.children[0].children[0].focus();
  },
  methods: {
    deleteItem(e) {
      e.preventDefault();
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
  background-color: #f2f2f2;
  border-color: #f2f2f2;
}

tr:nth-of-type(2n) td input {
  background-color: #fff;
  border-color: #fff;
}

tr:nth-of-type(2n+1) td input:focus {
  background-color: #fff;
}

td input[type="number"].weight {
  width: 4.5rem;
}

td input[type="number"].qty {
  width: 2.5rem;
}

td .feather {
  margin-top: 7px;
  visibility: hidden;
}

tr:hover td .feather {
  visibility: visible;
}

.delete-icon:hover {
  stroke: red;
}

.delete-button:hover {
  color: red;
}

td select {
  width: auto !important;
}
</style>
