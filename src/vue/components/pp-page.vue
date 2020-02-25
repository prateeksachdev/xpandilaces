<template>
  <div>
    <section class="section product">
      <div class="container">
        <div id="loading-placeholder" style="min-height: 1200px;">
        </div>

        <pp-hero
          :product="product"
          :default-variant-id="defaultVariantId"
          :loading-gif-url="loadingGifUrl"
          :atc-text-color="atcTextColor"
          :atc-bg-color="atcBgColor"
        >
        </pp-hero>
      </div>
    </section>

    <section v-if="product.highlights.length > 0" class="section product-highlights">
      <div class="container">
        <pp-highlights :highlights="product.highlights" :text-color="highlightTextColor"></pp-highlights>
      </div>
    </section>

    <section v-if="product.tabs.length > 0" class="product-tab">
      <pp-tabs :tabs="product.tabs" :product="product"></pp-tabs>
    </section>

    <pp-reviews v-if="product.reviews" :reviews="product.reviews"></pp-reviews>

    <pp-faq v-if="product.faq" :faq="product.faq"></pp-faq>
  </div>

</template>

<script>
import store from '../store'
import PpHero from './pp-hero.vue'
import PpHighlights from './pp-highlights.vue'
import PpTabs from './pp-tabs.vue'
import PpReviews from './pp-reviews.vue'
import PpFaq from './pp-faq.vue'

export default {
  name: 'PpPage',
  components: {
    PpHero,
    PpHighlights,
    PpTabs,
    PpReviews,
    PpFaq
  },
  props: {
    defaultVariantId: String,
    loadingGifUrl: String,
    atcTextColor: String,
    atcBgColor: String,
    highlightTextColor: String
  },
  data: function () {
    return {
      product: {variants: [], images: [], tabs: [], highlights: [], promo_texts: []}
    }
  },
  mounted () {
    let productJson = this.$slots.product[0].children[0].text
    this.product = JSON.parse(productJson)
  }
}
</script>

<style lang="scss" scoped>
</style>
