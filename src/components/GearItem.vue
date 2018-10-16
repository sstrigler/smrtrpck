<template>
  <li class="nav-item">
    <a class="nav-link" href="#">
      <span data-feather="file-text"></span>

      {{gearItem.name}}</a>
    <span>{{gearItem.weight}}</span>
    <span>{{gearItem.description}}</span>
    <a class="btn btn-sm btn-danger" @click="$emit('remove', gearItem)">x</a>
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
