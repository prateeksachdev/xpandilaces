<template>
  <div class="drawer">
    <template v-if="cart.item_count > 0">
      <a @click="hide" href="javascript:;" class="continue-shopping">
        <slot name="continue-shopping"></slot>
      </a>

      <ul>
        <li v-for="item in cart.items" class="cart-item">
          <a :href="item.url">
            <div class="image">
              <img :src="img_url(item.image, '160x')" :alt="item.title">
            </div>
            <div class="title">
              <span>{{ item.product_title }}</span>
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
      </ul>

      <div class="foot">
        <p class="subtotal">
          <span>
            <slot name="sub-total-text"></slot>
          </span>
          <span class="is-pulled-right">{{ cart.total_price | dollar }}</span>
        </p>
        <p class="text-center">
          <a class="button" href="/cart">
            <slot name="go-to-cart"></slot>
          </a>
        </p>
      </div>
    </template>

    <p v-else class="empty">
      <slot name="empty-msg"></slot>
    </p>
  </div>
</template>

<script>
  import { dollar } from '../filters'
  import store from '../store'

  export default {
    name: 'CartDrawer',
    filters: {
      dollar
    },
    data: function () {
      return {
        state: store.state
      }
    },
    computed: {
      cart () {
        return this.state.cart
      }
    },
    methods: {
      img_url (url, size) {
        let tmp = url.split('.')
        let i = tmp.length - 2
        tmp[i] = tmp[i] + `_${size}`
        return tmp.join('.')
      },

      hide () {
        this.$emit('hide')
      },

      changeQuantity (item, quantity) {
        if (parseInt(quantity) >= 0) {
          item.quantity = quantity
          store.changeQuantity(item.key, quantity)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
