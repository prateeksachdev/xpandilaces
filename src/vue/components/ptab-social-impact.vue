<template>
  <div class="container">
    <div v-for="detail in tab.details" :key="detail.title" class="detail">
      <h3 v-html="detail.title"></h3>
      <div class="divider"></div>
      <p v-html="detail.text"></p>
      
      <div class="img-wrap">
        <img :data-src="detail.image_url" class="lazyload">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PtabSocialImpact',
  props: {
    tab: Object,
    product: Object
  }
}
</script>

<style lang="scss" scoped>
</style>