<template>
  <div class="product-swatch">
    <div v-for="(imageUrl, color) in images" :key="color" class="swatch" :class="{selected: color == value}">
      <a v-scroll-to="'body'" :data-bg="imageUrl" @click="selectColor(color)" class="lazyload" href="javascript:;"></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PpSwatch',
    props: {
      images: Object,
      value: String
    },
    methods: {
      selectColor (color) {
        this.$emit('input', color)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
