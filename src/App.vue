<template>
  <div id="app">
    <h1>Smrtrpck</h1>
    <small>for when you want to be smart when packing your pack</small>
    <Inventory/>
  </div>
</template>

<script>
import Inventory from './components/Inventory.vue'

export default {
    components: {
        Inventory
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
