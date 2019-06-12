<template>
  <div class="cart-detail">
    <ul>
      <cart-item v-for="item in cart.items" :key="item.key" :item="item" :trigger-refresh="true" img-size="600x">
      </cart-item>
    </ul>
  </div>
</template>

<script>
  import { dollar } from '../filters'
  import store from '../store'

  export default {
    name: 'CartDetail',
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
      refresh () {
        location.reload()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
