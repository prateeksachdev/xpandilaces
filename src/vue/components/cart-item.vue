<template>
  <li class="cart-item">
    <a :href="productUrl(item.url)">
      <div class="image">
        <img :src="imgURL(item.image, imgSize)" :alt="item.title">
      </div>
      <div class="title">
        <span>{{ item.product_title }}</span>
        <span v-if="item.variant_title"> - {{ item.variant_title }}</span>
      </div>
      <div class="price">
        <span>{{ item.price | dollar }}</span>
      </div>
    </a>
    <div class="quantity">
      <div class="field has-addons">
        <p class="control">
          <a @click="changeQuantity(item, item.quantity - 1)" class="button">
            <span class="icon-minus"></span>
          </a>
        </p>
        <p class="control">
          <input class="input" type="text" size="2" :value="item.quantity" @input="changeQuantity(item, $event.target.value)">
        </p>
        <p class="control">
          <a @click="changeQuantity(item, item.quantity + 1)" class="button">
            <span class="icon-plus"></span>
          </a>
        </p>
      </div>
    </div>
  </li>
</template>

<script>
  import { dollar } from '../filters'
  import { imgURL } from '../helpers'
  import store from '../store'

  export default {
    name: 'CartItem',
    props: {
      item: Object,
      imgSize: {
        default: '160x'
      },
      triggerRefresh: {
        default: false
      }
    },
    filters: {
      dollar
    },
    data: function () {
      return {
        state: store.state
      }
    },
    methods: {
      imgURL: imgURL,
      changeQuantity (item, quantity) {
        if (parseInt(quantity) >= 0) {
          item.quantity = quantity
          store.changeQuantity(item.key, quantity, this.triggerRefresh)
        }
      },
      productUrl (url) {
        if (url) {
          return url.split('?')[0]
        } else {
          return url
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
