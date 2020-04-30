<template>
  <div class="columns">
    <div class="column gallery">
      <pp-gallery :images="images(selectedColor)" :loading-gif-url="loadingGifUrl"></pp-gallery>

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
        <h1>{{product.heading}}</h1>
        <p class="subheading">{{product.subheading}}</p>

        <div class="desktop">
          <div v-if="product.social_banner" class="social-impact">
            <span>{{product.social_banner.left}}</span>
            <img :data-src="cdnURL(product.social_banner.middle, 'w_60')" class="lazyload">
            <span>{{product.social_banner.right}}</span>
          </div>

          <div v-if="product.stamped_badge" v-html="product.stamped_badge" class="stamped-product-reviews-badge stamped-main-badge" :data-id="product.id" :data-product-sku="product.handle"></div>
        </div>

        <div class="mobile">
          <div v-if="product.stamped_badge" v-html="product.stamped_badge" class="stamped-product-reviews-badge stamped-main-badge" :data-id="product.id" :data-product-sku="product.handle"></div>
          <div v-if="product.social_banner" class="social-impact">
            <span>{{product.social_banner.left}}</span>
            <img :data-src="cdnURL(product.social_banner.middle, 'w_60')" class="lazyload">
            <span>{{product.social_banner.right}}</span>
          </div>
        </div>        
      </div>

      <div class="columns is-mobile is-gapless options">
        <div class="column is-7">
          <div class="wrap">
            <div class="option-text">
              <span class="price">{{variant.price | dollar | noSpace}}</span>
              <span class="mobile selected-swatch-text">COLOR: {{selectedColor}}</span>
            </div>

            <div v-if="swatchImages" class="swatch">
              <pp-swatch v-model="selectedColor" :images="swatchImages"></pp-swatch>
            </div>

            <div class="option-text">
              <span class="desktop selected-swatch-text">COLOR: {{selectedColor}}</span>
            </div>
          </div>
        </div>

        <div class="column is-5 size">
          <div class="option-text">
            <span class="mobile">Size: {{selectedSize}}</span>
            <span class="mobile">({{product.size_note}})</span>
            <span class="desktop size-note">{{product.size_note}}</span>
          </div>
		  <span class="cm-option-label">Size:<span class="selected-size">{{selectedSize}}</span></span>
          <div class="size-option-listing">
			<div v-for="(size, index) in sizes" :key="index" class="size-option">
				<input type="radio" :id="size" :value="size" v-model="selectedSize">
				<label :for="size" :class="{selected: selectedSize === size}">{{size}}</label>
			</div>
		  </div>
		

          <div class="option-text">
            <span class="desktop selected-size-text">Size: {{selectedSize}}</span>
          </div>
        </div>
      </div>

      <cart-control :variant-id="variantId" :atc-text-color="atcTextColor" :atc-bg-color="atcBgColor"></cart-control>

      <div v-if="product.promo_title || (product.promo_texts && product.promo_texts.length > 0)" class="promo mobile">
        <h3>{{product.promo_title}}</h3>

        <div class="text">
          <p v-for="text in product.promo_texts">{{text}}</p>
        </div>
      </div>

      <div v-if="product.promo_title || (product.promo_texts && product.promo_texts.length > 0)" class="promo desktop">
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
import { dollar, noSpace, cdnURL } from '../filters'

export default {
  name: 'PpHero',
  components: {
    PpGallery,
    PpSwatch,
    CartControl
  },
  filters: {
    dollar,
    noSpace
  },
  props: {
    defaultVariantId: String,
    loadingGifUrl: String,
    atcTextColor: String,
    atcBgColor: String,
    product: Object
  },
  data () {
    return {
      show: false,
      variantId: this.defaultVariantId,
      selectedColor: undefined,
      selectedSize: 'M'
    }
  },
  watch: {
    product () {
      if (this.variant) {
        this.selectedColor = this.variant[this.variantColorKey]
        if (this.variantSizeKey) {
          this.selectedSize = this.variant[this.variantSizeKey]
        }
      } else {
        this.selectedColor = this.colors[0]
      }
    },

    selectedColor () {
      this.setVariant()
    },

    selectedSize () {
      this.setVariant()
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
    },

    colors () {
      if (!this.product.options) { return [] }
      if (!this.product.options.Color) { return [] }

      return this.product.options.Color
    },

    sizes () {
      if (!this.product.options) { return [] }
      if (!this.product.options.Size) { return [] }

      return this.product.options.Size
    },

    variantColorKey () {
      if (!this.product.options) { return }
      const options = Object.keys(this.product.options)
      const colorIndex = options.indexOf('Color')
      if (colorIndex === -1) { return }
      
      return `option${colorIndex + 1}`
    },

    variantSizeKey () {
      if (!this.product.options) { return }
      const options = Object.keys(this.product.options)
      const sizeIndex = options.indexOf('Size')
      if (sizeIndex === -1) { return }
      
      return `option${sizeIndex + 1}`
    },

    swatchImages () {
      if (!this.variantColorKey) { return }
      const colorKey = this.variantColorKey
      const swatchImages = {}

      for (const id in this.variants) {        
        const variant = this.variants[id]
        const color = variant[colorKey]

        if (!swatchImages[color]) {
          swatchImages[color] = cdnURL(variant.swatch_image_url, 'w_80')
        }
      }

      return swatchImages
    },

    galleryImages () {
      if (!this.variantColorKey) { return }

      const colorKey = this.variantColorKey
      const galleryImages = {}
      for (const id in this.variants) {        
        const variant = this.variants[id]
        const color = variant[colorKey]

        if (galleryImages[color]) {
          galleryImages[color].concat(this._images(variant))
        } else {
          galleryImages[color] = [{
            id: variant.avatar.id,
            smLink: variant.avatar.urls.sm,
            mdLink: variant.avatar.urls.md
          }]
          galleryImages[color] = galleryImages[color].concat(this._images(variant))
        }
      }

      return galleryImages
    }
  },
  methods: {
    cdnURL: cdnURL,

    _images(variant) {
      return variant.image_urls.map((url) => {
        return {
          id: url,
          smLink: cdnURL(url, 'w_120'),
          mdLink: cdnURL(url, 'w_800')
        }
      })
    },

    images(color) {
      if (!this.galleryImages) { return [] }
      return this.galleryImages[color]
    },

    setVariant () {      
      for (const id in this.variants) {        
        const variant = this.variants[id]
        if (this._isMatchingVariant(variant)) { this._setVariant(variant.id) }
      }
    },

    _isMatchingVariant (variant) {
      const colorKey = this.variantColorKey
      const sizeKey = this.variantSizeKey

      if (sizeKey) {
        return variant[colorKey] === this.selectedColor && variant[sizeKey] === this.selectedSize
      }

      return variant[colorKey] === this.selectedColor
    },

    _setVariant (variantId) {
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
