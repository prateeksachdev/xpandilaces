<template>
  <div>
    <form @submit="checkout" action="/cart" method="post">
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
        <p v-if="savingAmount > 0" class="saving">
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
    props: {
      savingTextTemplate: {
        type: String,
        default: 'You saved {{savingPercentage}} ({{savingAmount}})'
      }
    },
    components: {
      CartItem
    },
    filters: {
      dollar
    },
    props: {
      checkoutTextColor: String,
      checkoutBgColor: String
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
        return this.savingTextTemplate.replace('{{savingPercentage}}', `${this.savingPercentage}%`).replace('{{savingAmount}}', dollar(this.savingAmount))
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
    methods: {
      checkout (e) {
        this.isCheckingOut = true

        if (this.cart.total_discount > 0) {
          e.preventDefault()
        } else {
          setTimeout(() => {
            this.isCheckingOut = false
          }, 3000)
          return
        }

        let items = []
        this.cart.items.forEach((item) => {
          items.push({
            "title": item.title,
            "variant_id": item.variant_id,
            "product_id": item.product_id,
            "image": item.featured_image.url,
            "quantity": item.quantity,
            "grams": item.grams,
            "requires_shipping": item.requires_shipping,
            "price": item.original_price / 100,
            "properties": [],
            "applied_discount": {
              "discount_amount": item.original_price - item.price,
              "original_line_price": item.original_line_price,
              "total_discount_amount": item.total_discount,
              "value_type": "fixed_amount",
              "description": "Discount",
              "title": "Discount",
              "value": (item.original_price - item.price) / 100,
              "amount": item.total_discount / 100
            }
          })
        })

        let data = {
          line_items: JSON.stringify(items),
          order_notes: ""
        }

        window.jQuery.ajax({
          method: "POST",
          url: "https://quantity-breaks-now.herokuapp.com/get_checkout_url?shopify_domain=xpandlaces.myshopify.com",
          data: JSON.stringify(data),
          dataType: "json",
          contentType: "application/json; charset=utf-8",
        }).then(response => {
          setTimeout(() => {
            this.isCheckingOut = false
          }, 3000)
          window.location.href = response.invoice_url
        })
      },

      hide () {
        this.$emit('hide')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
