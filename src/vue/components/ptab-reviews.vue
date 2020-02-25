<template>
  <div class="container">
    <!--Start Stamped.io Auto Installation-->
    <div v-html="tab.stamped_reviews" id="stamped-main-widget" class="stamped-main-widget" data-widget-style="standard" data-photo-summary="false" :data-product-id="product.id" :data-name="product.title" :data-url="product.url" :data-image-url="product.stamped_image_url" :data-description="product.description" :data-product-sku="product.handle"></div>
    <!--End Stamped.io Auto Installation-->

    <p v-if="!tab.stamped_reviews" class="text-center">There is no reviews yet</p>
  </div>
</template>

<script>
export default {
  name: 'PtabDetails',
  props: {
    tab: Object,
    product: Object
  }
}
</script>

<style lang="scss" scoped>
</style>