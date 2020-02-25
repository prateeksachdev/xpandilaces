<template>
  <span class="cart-count">{{ cart.item_count }}</span>
</template>

<script>
  import store from '../store'

  export default {
    name: 'CartCount',
    data: function () {
      return {
        state: store.state
      }
    },
    computed: {
      cart () {
        return this.state.cart
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
