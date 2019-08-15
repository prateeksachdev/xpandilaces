<template>
  <div class="drawer">
    <template v-if="cart.item_count > 0">
      <a @click="hide" href="javascript:;" class="continue-shopping">
        <slot name="continue-shopping"></slot>
      </a>

      <form @submit.prevent="checkout()" action="/cart" method="post">
        <ul>
          <cart-item v-for="item in cart.items" :key="item.key" :item="item">
          </cart-item>
        </ul>

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
        </div>
      </form>
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
      checkout () {
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
          console.log(response)
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
@import "../../styles/variables";

.drawer {
  background-color: white;
  border: 1px solid #ccc;
  width: 320px;
  max-height: 70vh;
  overflow-y: auto;

  @media screen and (min-width: $large-phone) {
    width: 360px;
  }
}

.empty {
  font-family: neuzeit_grotesk_regular;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding: 40px 0px;
}

.continue-shopping {
  display: block;
  color: #333333;
  font-family: "sf_display_regular";
  font-size: 13px;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid #cccccc
}

ul {
  padding: 15px 20px;
}

.foot {
  border-top: 1px solid #aaaaaa;
  padding: 25px 20px 40px 20px;
  font-family: "neuzeit_grotesk_light";
  font-weight: bold;
  font-size: 13px;

  .subtotal {
    margin-bottom: 12px;

    span {
      font-weight: bold;

      &.original-amount {
        text-decoration: line-through;
        font-weight: normal;
      }
    }
  }

  .button {
    font-weight: bold;
    letter-spacing: 1.2px;
    height: 40px;
    width: 260px;
    line-height: 1.2;
    text-transform: uppercase;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: #008ffd;
    border-color: #008ffd;
    color: white;
  }
}


</style>
