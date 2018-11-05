<template>
<ul class="nav flex-column"
    v-if="gearItems.length">
  <GearItem
    v-for="gearItem in gearItems"
    :key="gearItem.id"
    :gearItem="gearItem"
    @remove="removeGearItem"
    @updated="updateGearItem"
    />
</ul>
</template>

<script>

// import NewGearItemForm from './NewGearItemForm.vue'
import GearItem from './GearItem.vue'

export default {
  components: {
    //    NewGearItemForm,
    GearItem
  },
  computed: {
    totalGearWeight () {
      return this.gearItems.reduce((sum, gearItem) => sum + gearItem.weight, 0)
    }
  },
  created () {
    this.gearItemStore = this.$hoodie.store.withIdPrefix('gearItems')
    this.gearItemStore.findAll().then(gearItems => { this.gearItems = gearItems })
  },
  data () {
    return {
      gearItems: []
    }
  },
  methods: {
    addNewGearItem (newGearItem) {
      this.gearItemStore.add(newGearItem)
      this.gearItems.push(newGearItem)
    },
    removeGearItem (toRemove) {
      this.gearItemStore.remove(toRemove)
      this.gearItems = this.gearItems.filter(gearItem => gearItem !== toRemove)
    },
    updateGearItem (item) {
      this.gearItemStore.update(item)
    }
  }
}
</script>
