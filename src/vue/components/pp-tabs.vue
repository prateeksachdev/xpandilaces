<template>
  <div class="tab-container">
    <div class="head">
      <div class="container">
        <ul class="columns is-mobile">
          <li v-for="tab in contentTabs" @click="selectTab" :key="tab.name" :id="tabId(tab.name)" class="column" :class="{ active: activeTab === tabId(tab.name) }">
            {{ tab.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="body">
      <div v-for="tab in contentTabs" :key="tab.name" class="body-content" :class="tab.type">
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
import PtabSocialImpact from './ptab-social-impact.vue'

export default {
  name: 'PpTabs',
  components: {
    PtabOverview,
    PtabDetails,
    PtabReviews,
    PtabInstallation,
    PtabSocialImpact
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
  computed: {
    contentTabs () {
      return this.tabs.filter((tab) => {
        return !this._isEmptyReview(tab)
      })
    }
  },
  methods: {
    selectTab (event) {
      this.activeTab = event.target.id;
    },

    tabId (name) {
      return `tab-${name}`
    },

    _isEmptyReview (tab) {
      return tab.type === 'ptab-reviews' && !tab.stamped_reviews
    }
  }
}
</script>

<style lang="scss" scoped>
</style>