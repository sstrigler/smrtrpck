<template>
<div id="app" class="container-fluid">
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">smrtrpck</a>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#">Sign in</a>
      </li>
    </ul>
  </nav>

  <div class="row">
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Lists</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item" v-for="list in lists">
            <a class="nav-link" href="#">
              <span data-feather="file-text"></span>
              {{list.name}}
            </a>
          </li>
        </ul>

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Inventory</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <Inventory/>
      </div>
    </nav>
    <GearList v-for="list in lists"
              :key="list.id"
              :list="list"/>
  </div>
</div>
</template>

<script>
import GearList from './components/GearList.vue'
import Inventory from './components/Inventory.vue'

export default {
  components: {
    GearList,
    Inventory
  },
  created: function () {
    this.gearListStore = this.$hoodie.store.withIdPrefix('gearList');
    this.gearListStore.findAll().then(
      lists => {
        this.lists = lists;
        if (this.lists.length === 0) {
          let newList = {name: "New List"};
          this.gearListStore.add(newList).then(
            list => {
              this.lists.push(list);
            }
          )
        }
      }
    );
  },
  data: function() {
    return {lists: []}
  }
}
</script>


<style>
/*
 * Base structure
 */

/* Move down content because we have a fixed navbar that is 50px tall */
body {
  padding-top: 50px;
}

/*
 * Global add-ons
 */

.sub-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
