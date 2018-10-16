<template>
  <div>
    <h2>Your Inventory ({{gearItems.length}}/{{totalGearWeight}})</h2>
    <NewGearItemForm
      @newGearItem="addNewGearItem"
      />

    <ul
      v-if="gearItems.length">
      <GearItem
        v-for="gearItem in gearItems"
        :key="gearItem.id"
        :gearItem="gearItem"
        @remove="removeGearItem"
        @updated="updateGearItem"
        />
    </ul>
    <p v-else>Your inventory is empty, best time to start adding gear!</p>
  </div>
</template>

<script>

import NewGearItemForm from './NewGearItemForm.vue'
import GearItem from './GearItem.vue'

export default {
  name: 'app',
  components: {
    NewGearItemForm,
    GearItem
  },
  computed: {
    totalGearWeight () {
      return this.gearItems.reduce((sum, gearItem) => sum + gearItem.weight, 0)}
  },
  created () {
    this.gearItemStore = this.$hoodie.store.withIdPrefix('gearItems');
    this.gearItemStore.findAll().then(gearItems => this.gearItems = gearItems);
  },
  data () {
    return {
      gearItems: []
    }
  },
  methods: {
    addNewGearItem (newGearItem) {
      this.gearItemStore.add(newGearItem);
      this.gearItems.push(newGearItem);
      this.newGearItem = {};
    },
    removeGearItem (toRemove) {
      this.gearItemStore.remove(toRemove);
      this.gearItems = this.gearItems.filter(gearItem => gearItem !== toRemove);
    },
    updateGearItem (item) {
      this.gearItemStore.update(item);
    }
  }
}
</script>
