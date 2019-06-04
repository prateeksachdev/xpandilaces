<template>
  <div class="tab-container">
    <div class="head">
      <slot name="head" :selectTab="selectTab" :activeTab="activeTab"></slot>
    </div>

    <div class="body">
      <slot name="body" :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabContent',
    data () {
      return  {
        activeTab: 'tab-1'
      }
    },
    methods: {
      selectTab (event) {
        this.activeTab = event.target.id;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>