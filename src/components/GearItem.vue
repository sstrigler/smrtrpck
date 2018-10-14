<template>
  <li>
    {{gearItem.name}} - {{gearItem.description}} -
    <input type="number" v-model.number="gearItem.weight" @input="$emit('updated', gearItem)">
    <button class="btn btn-sm btn-danger" @click="$emit('remove', gearItem)">X</button>
  </li>
</template>

<script>
export default {
  props: {
    gearItem: {
      type: Object,
      required: true
    }
  }
}
</script>
