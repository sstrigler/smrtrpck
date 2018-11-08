<template>
<div id="app" class="container-fluid">
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">smrtrpck (alpha)</a>
    <!--input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#">Sign in</a>
      </li>
    </ul-->
  </nav>

  <div class="row">
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">

        <h6 class="sidebar-heading d-flex justify-content-start align-items-center px-3 mt-4 mb-1 text-muted">
          Lists
          &nbsp;
          <button class="feather-button"
                  title="Add new list"
                  @click="addNewList">
            <plus-circle-icon class="feather"></plus-circle-icon>
          </button>
        </h6>
        <ul class="nav flex-column mb-2">
          <li
            class="nav-item"
            v-for="(list, idx) in lists"
            :key="list._id">
            <a class="nav-link"
               :class="{ active: currentList === idx }"
               href="#"
               @click.prevent="setCurrentList(idx)">
              <FileTextIcon class="feather"></FileTextIcon>{{list.name}}
            </a>
          </li>
        </ul>

        <!--h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Inventory</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <Inventory/-->
      </div>
    </nav>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <GearList v-for="list in lists"
                :key="list._id"
                :list="list"
                @deleteList="deleteList"/>
    </main>
  </div>
</div>
</template>

<script>
import GearList from './components/GearList.vue'
import { PlusCircle, FileText } from 'vue-feather-icon'

export default {
  components: {
    GearList,
    PlusCircleIcon: PlusCircle.default,
    FileTextIcon: FileText.default
  },
  created: function () {
    this.gearListStore = this.$hoodie.store.withIdPrefix('gearList')
    this.$hoodie.store.find({ _id: 'smrtrpck' }).then(
      smrtrpck => {
        this.smrtrpck = smrtrpck
        this.gearListStore.findAll().then(
          lists => {
            this.lists = lists
            if (this.lists.length === 0) this.addNewList()
          })
      }
    ).catch(() => {
      this.$hoodie.store.add(this.smrtrpck).then(
        () => this.addNewList())
    })
  },
  updated: function () {
    this.setCurrentList(this.smrtrpck.lastList)
  },
  data: function () {
    return {
      lists: [],
      currentList: null,
      smrtrpck: { _id: 'smrtrpck' }
    }
  },
  methods: {
    addNewList () {
      let newList = { name: 'New List', totalsUnit: 'kg' }
      this.gearListStore.add(newList).then(
        list => {
          this.lists.push(list)
          this.setCurrentList(this.lists.indexOf(list))
        }
      )
    },
    deleteList (list) {
      const idx = this.lists.indexOf(list)
      this.gearListStore.remove(list).then(() => {
        this.lists.splice(idx, 1)
        this.setCurrentList(0)
      })
    },
    setCurrentList (idx) {
      this.currentList = idx
      this.$children.forEach(
        child => {
          if (child.list) { child.isActive = child.list === this.lists[idx] }
        })
      if (!this.smrtrpck.lastList || this.smrtrpck.lastList !== idx) {
        this.smrtrpck.lastList = idx
        this.$hoodie.store.update(this.smrtrpck)
      }
    }
  }
}
</script>

<style>
a {
  color: #256537;
}

a:focus {
  text-decoration: underline;
  color: #256537;
}

a:hover {
  color: #256537;
}

body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
  stroke: #999;
}

.table-info .feather {
  stroke: #666;
}

.feather-button {
  border: 0;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.feather-button:hover {
  cursor: pointer;
}

.feather-button:hover .feather {
  stroke: #256537;
}

.delete-button:hover .feather,
.delete-button:focus .feather {
  stroke: red;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #256537;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active,
.sidebar .nav-link:hover {
  text-decoration: underline;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 48px; /* Space for fixed navbar */
  padding-bottom: 1rem;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}
</style>
