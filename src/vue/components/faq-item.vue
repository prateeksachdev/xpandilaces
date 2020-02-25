<template>
  <li class="faq-item">
    <a href="javascript:;" @click="toggleVisiblity" :class="{ selected: isVisible }">
      <slot name="question"></slot>
    </a>

    <height-transition>
      <div v-if="isVisible">
        <slot name="answer"></slot>
      </div>
    </height-transition>
  </li>
</template>

<script>
import HeightTransition from './height-transition.vue'

export default {
  name: 'FaqItem',
  components: {
    HeightTransition
  },
  data: function () {
    return {
      isVisible: false,
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
