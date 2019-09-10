<template>
  <div class="columns">
    <div class="column gallery">
      <pp-gallery :images="images(variantId)" :loading-gif-url="loadingGifUrl"></pp-gallery>

      <div class="shoes-types desktop">
        <ul>
          <li v-for="feature in product.features" :key="feature.text">
            <img class="lazyload" :data-src="feature.icon_url"><span>{{feature.text}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="column controls">
      <div class="brief">
        <h1>{{product.title}}</h1>
        <div v-html="product.stamped_badge" class="desktop stamped-product-reviews-badge stamped-main-badge" :data-id="product.id" :data-product-sku="product.handle"></div>
        <p class="selected-swatch-text mobile">Color: {{variant.title}}</p>
        <div class="price-note mobile" v-html="product.price_note"></div>
      </div>

      <div class="price">
        <span>{{variant.price | dollar}}</span> <div class="price-note desktop" v-html="product.price_note"></div>
      </div>

      <div v-if="product.stamped_badge" v-html="product.stamped_badge" class="mobile only-mobile stamped-product-reviews-badge stamped-main-badge" :data-id="product.id" :data-product-sku="product.handle"></div>

      <div class="swatch">
        <pp-swatch :variants="variants" :variant-id="variantId" @selected="setVariant"></pp-swatch>
        <p class="selected-swatch-text desktop">Color: {{variant.title}}</p>
      </div>

      <div v-if="product.promo_title || product.promo_texts.length > 0" class="promo mobile">
        <h3>{{product.promo_title}}</h3>

        <div class="text">
          <p v-for="text in product.promo_texts">{{text}}</p>
        </div>
      </div>

      <cart-control :variant-id="variantId" :atc-text-color="atcTextColor" :atc-bg-color="atcBgColor"></cart-control>

      <div v-if="product.promo_title || product.promo_texts.length > 0" class="promo desktop">
        <h3>{{product.promo_title}}</h3>

        <div class="text">
          <p v-for="text in product.promo_texts">{{text}}</p>
        </div>
      </div>

      <div class="shoes-types mobile">
        <ul>
          <li v-for="feature in product.features" :key="feature.text">
            <img class="lazyload" :data-src="feature.icon_url"><span>{{feature.text}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import store from '../store'
import PpGallery from './pp-gallery.vue'
import PpSwatch from './pp-swatch.vue'
import CartControl from './cart-control.vue'
import { dollar } from '../filters'

export default {
  name: 'PpHero',
  components: {
    PpGallery,
    PpSwatch,
    CartControl
  },
  filters: {
    dollar
  },
  props: {
    defaultVariantId: String,
    loadingGifUrl: String,
    atcTextColor: String,
    atcBgColor: String,
    product: Object
  },
  data: function () {
    return {
      show: false,
      variantId: this.defaultVariantId
    }
  },
  computed: {
    variants () {
      let variants = {}
      this.product.variants.forEach((variant) => {
        variants[variant.id] = variant
      })

      return variants
    },

    variant () {
      return this.variants[this.variantId] || {}
    }
  },
  methods: {
    images (variantId) {
      let images = []
      let variant = this.variants[variantId]
      if (!variant) { return [] }

      if (variant.avatar) {
        images.push({
          id: variant.avatar.id,
          smLink: variant.avatar.urls.sm,
          mdLink: variant.avatar.urls.md
        })
      }

      variant.image_urls.forEach((url) => {
        images.push({
          id: url,
          smLink: url,
          mdLink: url
        })
      })

      return images
    },

    setVariant (variantId) {
      this.variantId = variantId

      if (history.pushState) {
        let params = qs.parse(location.search.substring(1))
        params['variant'] = variantId
        let qstring = qs.stringify(params)

        var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${qstring}`
        window.history.pushState({ path: newUrl }, '', newUrl)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
