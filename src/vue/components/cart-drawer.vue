<template>
  <div class="drawer">
    <template v-if="cart.item_count > 0">
      <a @click="hide" href="javascript:;" class="continue-shopping">
        <slot name="continue-shopping"></slot>
      </a>

      <ul>
        <cart-item v-for="item in cart.items" :key="item.key" :item="item">
        </cart-item>
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
  import { imgURL } from '../helpers'
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
      hide () {
        this.$emit('hide')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
