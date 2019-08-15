<template>
  <div>
    <form @submit="checkout" action="/cart" method="post">
      <div class="drawer">
        <template v-if="cart.item_count > 0">
          <ul>
            <cart-item v-for="item in cart.items" :key="item.key" :item="item">
            </cart-item>
          </ul>

          <hr v-if="cart.items.length === 1">
        </template>

        <p v-else class="empty">
          <slot name="empty-msg"></slot>
        </p>
      </div>
      <div class="foot">
        <p class="subtotal">
          <span>
            <slot name="sub-total-text"></slot>
          </span>
          <span class="is-pulled-right">
            <span class="original-amount" v-if="cart.total_price != cart.original_total_price">{{ cart.original_total_price | dollar }}</span>
            <span>{{ cart.total_price | dollar }}</span>
          </span>
        </p>
        <p class="text-center">
          <button type="submit" id="checkout" name="checkout" class="button">
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
    mounted () {
      setTimeout(() => {
        var container = this.$el.querySelector(".drawer");
        container.scrollTop = container.scrollHeight;
      }, 300)
    },
    methods: {
      checkout (e) {
        if (this.cart.total_discount > 0) {
          e.preventDefault()
        } else {
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
