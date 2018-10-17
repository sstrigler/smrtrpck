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
          <span>Lists</span> <a @click="addNewList" href="#">(+)</a>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li
            class="nav-item"
            v-for="list in lists"
            :key="list._id">
            <a class="nav-link" :class="{ active: currentList === list }" href="#" @click="setCurrentList(list._id)">
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
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <GearList v-for="(list, idx) in lists"
                :key="list._id"
                :isActive="idx === 0"
                :list="list"/>
    </main>
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
    this.$hoodie.store.find({_id: 'smrtrpck'}).then(
      smrtrpck => {
        this.smrtrpck = smrtrpck
        this.gearListStore.findAll().then(
          lists => {
            this.lists = lists;
            if (this.lists.length === 0) this.addNewList();
          });
      }
    ).catch(() =>
            this.$hoodie.store.add(this.smrtrpck).then(
              () => this.addNewList())
    );
  },
  updated: function() {
    this.setCurrentList(this.smrtrpck.lastList)
  },
  data: function() {
    return {
      lists: [],
      currentList: null,
      smrtrpck: {_id: 'smrtrpck'}
    }
  },
  methods: {
    addNewList() {
      let newList = {name: "New List"};
      this.gearListStore.add(newList).then(
        list => {
          this.lists.push(list);
          this.setCurrentList(list._id);
        }
      )
    },
    setCurrentList(list_id) {
      this.$children.forEach(child =>
                             {
                               if (child.list)
                                 child.isActive = child.list._id === list_id});
      if (!this.smrtrpck.lastList || this.smrtrpck.lastList !== list_id) {
        this.smrtrpck.lastList = list_id;
        this.$hoodie.store.update(this.smrtrpck);
      }
    }
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
