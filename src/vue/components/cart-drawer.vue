<template>
  <div>
    <form @submit.prevent="checkout" action="/cart" method="post">
      <div class="drawer" :class="{empty: isCartEmpty}">
        <div v-if="isCartEmpty" class="empty-text">
          <p>
            <slot name="empty-msg"></slot>
          </p>

          <a @click="hide" href="javascript:;" class="continue-shopping">
            <slot name="continue-shopping"></slot>
          </a>
        </div>

        <template v-else>
          <ul>
            <cart-item v-for="item in cart.items" :key="item.key" :item="item">
            </cart-item>
          </ul>

          <hr v-if="cart.items.length === 1">
        </template>
      </div>

      <div v-if="!isCartEmpty" class="foot">
        <p class="subtotal">
          <span>
            <slot name="sub-total-text"></slot>
          </span>
          <span class="is-pulled-right">
            <span class="original-amount" v-if="cart.total_price != cart.original_total_price">{{ cart.original_total_price | dollar }}</span>
            <span>{{ cart.total_price | dollar }}</span>
          </span>
        </p>
        <p v-if="savingAmount > 0 && savingText" class="saving">
          <span>{{ savingText }}</span>
        </p>
        <p v-if="cart.item_count > 0" class="text-center">
          <input type="hidden" name="checkout" value="checkout">
          <button type="submit" id="checkout" class="button" :class="{'is-loading': isCheckingOut}" :disabled="isCheckingOut" :style="checkoutBtnStyleObject">
            <slot name="checkout"></slot>
          </button>
        </p>

        <a @click="hide" href="javascript:;" class="continue-shopping">
          <slot name="continue-shopping"></slot>
        </a>
      </div>
    </form>
  </div>
</template>

<script>
  import { dollar } from '../filters'
  import { imgURL } from '../helpers'
  import store from '../store'
  import CartItem from './cart-item.vue'

  export default {
    name: 'CartDrawer',
    components: {
      CartItem
    },
    filters: {
      dollar
    },
    props: {
      checkoutTextColor: String,
      checkoutBgColor: String,
      savingTextTemplate: {
        type: String,
        default: 'You saved {{savingPercentage}} ({{savingAmount}})'
      }
    },
    data: function () {
      return {
        state: store.state,
        isCheckingOut: false
      }
    },
    computed: {
      cart () {
        return this.state.cart
      },
      isCartEmpty () {
        return this.cart.items.length === 0
      },
      checkoutUrl () {
        return this.state.checkoutUrl
      },
      isCheckoutReady () {
        return this.state.isCheckoutReady
      },
      savingAmount () {
        if (this.state.cart) {
          return this.cart.original_total_price - this.cart.total_price
        }

        return 0
      },
      savingPercentage () {
        if (this.savingAmount > 0) {
          return Math.ceil(this.savingAmount / this.cart.original_total_price * 100)
        }

        return 0
      },
      savingText () {
        if (this.savingTextTemplate) {
          return this.savingTextTemplate.replace('{{savingPercentage}}', `${this.savingPercentage}%`).replace('{{savingAmount}}', dollar(this.savingAmount))
        }

        return ''
      },
      checkoutBtnStyleObject () {
        let obj = {}
        if (this.checkoutTextColor) {
          obj.color = this.checkoutTextColor
        }

        if (this.checkoutBgColor) {
          obj.backgroundColor = this.checkoutBgColor
          obj.borderColor = this.checkoutBgColor
        }

        return obj
      }
    },
    watch: {
      isCheckoutReady (newVal, oldVal) {
        if (newVal && (newVal != oldVal) && this.isCheckingOut) {
          this.checkout()
        }
      }
    },
    methods: {
      checkout () {
        this.isCheckingOut = true
        if (!this.isCheckoutReady) { return }

        window.location.href = this.checkoutUrl
        setTimeout(() => {
          this.isCheckingOut = false
        }, 5000)
      },

      hide () {
        this.$emit('hide')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
