<template>
  <div class="columns">
    <div class="column gallery">
      <product-gallery :images="images(variantId)" :loading-gif-url="loadingGifUrl"></product-gallery>
      <slot name="shoes-types-desktop"></slot>
    </div>

    <div class="column controls">
      <div class="brief">
        <slot name="brief"></slot>
        <slot name="stamped-review-desktop"></slot>
        <p class="selected-swatch-text mobile">Color: {{variant.title}}</p>
        <slot name="price-note-mobile"></slot>
      </div>

      <div class="price">
        <span>{{variant.price}}</span> <slot name="price-note-desktop"></slot>
      </div>

      <slot name="stamped-review-mobile"></slot>

      <div class="swatch">
        <product-swatch :variants="variants" :variant-id="variantId" @selected="setVariant"></product-swatch>
        <p class="selected-swatch-text desktop">Color: {{variant.title}}</p>
      </div>

      <div class="promo mobile">
        <slot name="promo"></slot>
      </div>

      <div class="add-to-cart">
        <form method="POST" action="/cart/add" @submit.prevent="addToCart(variantId, quantity)">
          <a class="button icon-minus" href="javascript:;" @click="minusQuantity"></a>
          <input v-model="quantity" type="number" min="1" size="2" name="quantity">
          <a class="button icon-plus" href="javascript:;" @click="plusQuantity"></a>

          <button class="button" :class="{loading: isAddingToCart}" type="submit">
            <span class="fadeInDown">Add To Cart</span>
            <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" class="checkmark"> <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"></path></svg>
          </button>
        </form>
      </div>

      <div class="promo desktop">
        <slot name="promo"></slot>
      </div>

      <slot name="shoes-types-mobile"></slot>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import store from '../store'

  export default {
    name: 'ProductForm',
    props: {
      rawImageGroupData: String,
      rawVariantsData: String,
      defaultVariantId: String,
      loadingGifUrl: String
    },
    data: function () {
      return {
        show: false,
        variantId: this.defaultVariantId,
        quantity: 1,
        isAddingToCart: false,
        test: store.state
      }
    },
    computed: {
      imageGroups () {
        if (this.rawImageGroupData) {
          let images = {}

          this.rawImageGroupData.split('`~~`').forEach((raw) => {
            let data = raw.split('`~`')

            if (data.length < 4) {
              return
            }

            let id = data[0].trim()
            let alt = data[1].trim()
            let groupId = alt.replace(/\s/g,'').toLowerCase().split('-')[0]

            images[groupId] = images[groupId] || []
            images[groupId].push({
              id: id,
              alt: alt,
              smLink: data[2],
              mdLink: data[3]
            })
          })

          return images
        }

        return {}
      },

      variants () {
        if (this.rawVariantsData) {
          let variants = {}

          this.rawVariantsData.split('`~~`').forEach((rawData) => {
            let data = rawData.split('`~`')
            if (data.length < 8) {
              return
            }

            let id = data[0].trim()
            variants[id] = {
              title: data[1].trim(),
              groupId: data[1].replace(/\s/g,'').toLowerCase(),
              price: data[2],
              swatchImageUrl: data[3],
              image: {
                id: data[4],
                alt: data[5],
                smLink: data[6],
                mdLink: data[7]
              }
            }
          })

          return variants
        }

        return {}
      },

      variant () {
        return this.variants[this.variantId]
      }
    },
    methods: {
      images (variantId) {
        let variant = this.variants[variantId]
        let avatarImage = variant.image
        let additionalImages = this.imageGroups[variant.groupId] || []
        if (this.imageGroups['allcolour']) {
          return [avatarImage].concat(additionalImages).concat(this.imageGroups['allcolour'])
        }

        return [avatarImage].concat(additionalImages)
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
      },

      addToCart (variantId, quantity) {
        this.isAddingToCart = true
        store.addToCart(variantId, quantity).then(() => {
          this.isAddingToCart = false
          store.showCartDetail()
        })
      },

      minusQuantity () {
        if (this.quantity > 1) {
          this.quantity = parseInt(this.quantity) - 1
        }
      },

      plusQuantity () {
        this.quantity = parseInt(this.quantity) + 1
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
