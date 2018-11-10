<template>
<div class="container-fluid" :class="{ 'd-none': !isActive }">
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">
      <input type="text"
             title="Click to edit!"
             class="form-control"
             v-model.trim="list.name"
             @keypress.enter="$event.target.blur()"
             @change="updateList"
             />
    </h1>
    <!--div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group mr-2">
        <button class="btn btn-sm btn-outline-secondary">Share</button>
        <button class="btn btn-sm btn-outline-secondary">Export</button>
      </div>
      <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
        <span data-feather="versions"></span>
        Versions
      </button>
    </div-->
  </div>
  <div class="col-xl-3 col-12 float-xl-right mt-xl-5 bg-white p-0 m-0"
       id="statsTable"
       :class="{ 'sticky-top': isStickyTop ,
                 'shadow-sm' : isStickyTop ,
                 'rounded'   : isStickyTop ,
                 'stats'     : isStickyTop }">
    <table class="table table-respsonsive table-sm table-striped">
      <thead>
        <tr class="table-info">
          <th/>
          <th class="w-100">Category
            <button class="feather-button"
                    title="Add new category"
                    @click="addNewCategory">
              <plus-circle-icon class="feather"></plus-circle-icon>
            </button>
          </th>
          <th colspan="2">
            Weight
          </th>
          <th>
            <button class="feather-button sticky-button"
                    title="Make overview stick to the top"
                    v-show="!isStickyTop"
                    @click="isStickyTop = true">
              <UnlockIcon class="feather"></UnlockIcon></button>
            <button class="feather-button sticky-button"
                    title="Release sticky overview"
                    v-show="isStickyTop"
                    @click="isStickyTop = false">
              <LockIcon class="feather"></LockIcon></button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, idx) in categories"
            :key="idx">
          <td class="p-0 text-nowrap">
            <button class="feather-button chevron"
                    title="Move category up"
                    @click="moveCategory(-1, idx)">
              <ChevronUpIcon class="feather"></ChevronUpIcon></button>
            <button class="feather-button chevron"
                    title="Move category down"
                    @click="moveCategory(1, idx)">
              <ChevronDownIcon class="feather"></ChevronDownIcon></button>
          </td>
          <td><a :href="'#cat-' + list._id + idx">{{category.name?  category.name : "Unnamed"}}</a></td>
          <td class="text-right font-weight-bold">
            {{ convertToTotalsUnit(categoryWeight(category, () => true)) }}
          </td>
          <td class="font-weight-bold ">{{list.totalsUnit}}</td>
          <td class="">
            <button class="feather-button delete-button"
                    title="Delete category"
                    @click="deleteCategory(idx)">
              <x-circle-icon class="feather"></x-circle-icon>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="table-primary">
          <th/>
          <th class="text-right">Base Weight</th>
          <td class="text-right font-weight-bold">{{baseWeight}}</td>
          <td class="font-weight-bold">{{list.totalsUnit}}</td>
          <td/>
        </tr>
        <tr>
          <th/>
          <th class="text-right">Worn</th>
          <td class="text-right font-weight-bold">{{wornWeight}}</td>
          <td class="font-weight-bold">{{list.totalsUnit}}</td>
          <td/>
        </tr>
        <tr>
          <th/>
          <th class="text-right">Consumables</th>
          <td class="text-right font-weight-bold">{{consumableWeight}}</td>
          <td class="font-weight-bold">{{list.totalsUnit}}</td>
          <td/>
        </tr>
        <tr>
          <th/>
          <th class="text-right">Packed</th>
          <td class="text-right font-weight-bold">{{packedWeight}}</td>
          <td class="font-weight-bold">{{list.totalsUnit}}</td>
          <td/>
        </tr>
        <tr>
          <th/>
          <th class="text-right va-middle">Total</th>
          <td class="text-right font-weight-bold va-middle">{{totalWeight}}</td>
          <td>
            <select class="form-control form-control-sm"
                    v-model="list.totalsUnit"
                    @change="updateList">
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="oz">oz</option>
              <option value="lb">lb</option>
            </select>
          </td>
          <td/>
        </tr>
      </tfoot>
    </table>
  </div>
  <GearListCategory
    v-for="(category, idx) in categories"
    :key="idx"
    :category="category"
    :totalsUnit="list.totalsUnit"
    :cat_id="list._id + idx"
    @categoryUpdated="updateList"
    @move="moveItem"
    />
</div>
</template>

<script>
import GearListCategory from './GearListCategory.vue'
import { PlusCircle, XCircle, Lock, Unlock, ChevronUp, ChevronDown } from 'vue-feather-icon'

export default {
  components: {
    GearListCategory,
    LockIcon: Lock.default,
    PlusCircleIcon: PlusCircle.default,
    UnlockIcon: Unlock.default,
    XCircleIcon: XCircle.default,
    ChevronUpIcon: ChevronUp.default,
    ChevronDownIcon: ChevronDown.default
  },
  computed: {
    wornWeight: function () { return this.calcWeight((item) => item.type === 'worn') },
    consumableWeight: function () { return this.calcWeight((item) => item.type === 'consumable') },
    baseWeight: function () { return this.calcWeight((item) => item.type !== 'consumable' && item.type !== 'worn') },
    packedWeight: function () { return this.calcWeight((item) => item.type !== 'worn') },
    totalWeight: function () { return this.calcWeight(() => true) }
  },
  data: function () {
    return {
      isActive: false,
      isStickyTop: false,
      gearListStore: this.$hoodie.store.withIdPrefix('gearList'),

      // [FIXME] if we don't keep this separate new list's view
      // doesn't get update with new categories
      categories: this.list.categories || []

    }
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  methods: {
    addNewCategory () {
      this.categories.push({ items: [] })
    },
    deleteCategory (idx) {
      this.categories.splice(idx, 1)
      this.updateList()
    },
    moveCategory (amount, categoryIdx) {
      const newIdx = categoryIdx + amount
      if (newIdx >= 0 && newIdx < this.categories.length) {
        this.categories.splice(newIdx, 0, this.categories.splice(categoryIdx, 1)[0])
        this.updateList()
      }
    },
    moveItem (dir, category, item) {
      const amount = dir === 'up' ? -1 : 1
      const idx = this.categories.indexOf(category)
      const newIdx = idx + amount
      if (newIdx >= 0 && newIdx < this.categories.length) {
        category.items.splice(category.items.indexOf(item), 1)
        if (dir === 'up') {
          this.categories[newIdx].items.push(item)
        } else {
          this.categories[newIdx].items.splice(0, 0, item)
        }
        this.updateList()
      }
    },
    updateList () {
      this.list.categories = this.categories // re-assign, see above
      this.gearListStore.updateOrAdd(this.list)
    },
    categoryWeight (category, filter) {
      const toGrams = (weight, unit) => {
        switch (unit) {
          case 'kg': return weight * 1000
          case 'oz': return weight * 28.35
          case 'lb': return weight * 453.7
          default: return weight
        }
      }
      return category.items.filter(filter).reduce((sum, item) => sum + item.qty * toGrams(item.weight, item.unit), 0)
    },
    convertToTotalsUnit (weight) {
      switch (this.list.totalsUnit) {
        case 'kg': return Number(weight / 1000).toFixed(2)
        case 'oz': return Number(weight / 28.35).toFixed(2)
        case 'lb': return Number(weight * 0.002204).toFixed(2)
        default: return weight
      }
    },
    calcWeight (filter) {
      return this.convertToTotalsUnit(
        this.categories.reduce((sum, category) => sum + this.categoryWeight(category, filter), 0))
    }
  },
  created () {
    if (this.categories.length === 0) this.addNewCategory()
  },
  mounted () {
    this.$nextTick(function () {
      this.$emit('listMounted', this.list)
    })
  }
}
</script>

<style>
h1.h2 input {
  font-size: 2.0rem;
  height: 3.0rem !important;
  margin-left: -10px;
  border-color: #fff;
}

.stats {
  top: 4rem;
}

#statsTable .chevron .feather {
  width: 12px;
}

@media (max-width:768px) {
  .stats {
    top: 5rem;
  }
}

@media (min-width: 1200px) {

  #statsTable table{
    margin-top: -2px;
  }

  @supports ((position: -webkit-sticky) or (position: sticky)) {
    #statsTable {
      position: -webkit-sticky;
      position: sticky;
      top: 4rem;
    }
    .sticky-button {
      visibility: hidden;
    }
  }
}

.va-middle {
  vertical-align: middle !important;
}
</style>
