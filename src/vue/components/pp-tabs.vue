<template>
  <div class="tab-container">
    <div class="head">
      <div class="container">
        <ul class="columns is-mobile">
          <li v-for="tab in tabs" @click="selectTab" :id="tabId(tab.name)" class="column" :class="{ active: activeTab === tabId(tab.name) }">
            {{ tab.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="body">
      <div v-for="tab in tabs" class="body-content" :class="tab.type">
        <transition name="fade">
          <component v-if="activeTab === tabId(tab.name)" :is="tab.type" :tab="tab" :product="product"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import PtabOverview from './ptab-overview.vue'
import PtabDetails from './ptab-details.vue'
import PtabReviews from './ptab-reviews.vue'
import PtabInstallation from './ptab-installation.vue'

export default {
  name: 'PpTabs',
  components: {
    PtabOverview,
    PtabDetails,
    PtabReviews,
    PtabInstallation
  },
  props: {
    tabs: Array,
    product: Object
  },
  data () {
    return  {
      activeTab: this.tabId(this.tabs[0].name)
    }
  },
  methods: {
    selectTab (event) {
      this.activeTab = event.target.id;
    },

    tabId (name) {
      return `tab-${name}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>