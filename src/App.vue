<template>
  <div id="app">
    <h2>Your Inventory ({{gearItems.length}}/{{totalGearWeight}})</h2>
    <ul>
      <li v-for="gearItem in gearItems">
        {{gearItem.name}} - {{gearItem.description}} -
        <input type="number" v-model.number="gearItem.weight">
      </li>
    </ul>
    <form id="form" class="form-inline" v-on:submit.prevent="addNewGearItem">
      <div class="form-group">
        <label for="gearItemName">Name:</label>
        <input type="text" id="gearItemName" class="form-control" v-model="newGearItem.name">
      </div>
      <div class="form-group">
        <label for="gearItemDescription">Description:</label>
        <input type="text" id="gearItemDescription" class="form-control" v-model="newGearItem.description">
      </div>
      <div class="form-group">
        <label for="gearItemWeight">Weight:</label>
        <input type="number" id="gearItemWeight" class="form-control" v-model.number="newGearItem.weight">
      </div>
      <input type="submit" class="btn btn-default btn-primary" value="Add Item">
    </form>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    totalGearWeight () {
      return this.gearItems.reduce((sum, gearItem) => sum + gearItem.weight, 0)}
  },
  created () {
    this.store = this.$hoodie.store.withIdPrefix('gearItems');
    this.store.findAll().then(gearItems => this.gearItems = gearItems);
  },
  data () {
    return {
      gearItems: [],
      newGearItem: {}
    }
  },
  methods: {
    addNewGearItem () {
      this.store.add(this.newGearItem);
      this.gearItems.push(this.newGearItem);
      this.newGearItem = {};
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
