<template>
  <div class="product-swatch">
    <div v-for="(variant, id) in variants" :key="id" class="swatch" :class="{selected: id == variantId}">
      <a :style="{backgroundImage: `url(${variant.swatchImageUrl})`}" @click="selectVariant(id)" href="javascript:;"></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductSwatch',
    props: {
      variants: Object,
      variantId: String
    },
    data () {
      return {

      }
    },
    methods: {
      selectVariant (variantId) {
        this.$emit('selected', variantId)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
