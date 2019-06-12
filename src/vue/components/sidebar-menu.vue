<template>
  <div class="sidebar">
    <h2 @click="toggleVisiblity" :class="{ selected: isVisible }">
      <slot name="title"></slot>
      <span class="icon-down-arrow"></span>
    </h2>
    <height-transition>
      <div v-if="isVisible">
        <slot name="menu"></slot>
      </div>
    </height-transition>
  </div>
</template>

<script>
  export default {
    name: 'SidebarMenu',
    data: function () {
      return {
        isVisible: false,
      }
    },
    mounted() {
      console.log(window.innerWidth);
      if (window.innerWidth > 576) {
        this.isVisible = true;
      }
    },
    methods: {
      toggleVisiblity () {
        this.isVisible = !this.isVisible
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
