<template>
  <li class="cart-item">
    <a :href="productUrl(item.url)">
      <div class="image">
        <img :src="imgURL(item.image, imgSize)" :alt="item.title">
      </div>
      <div class="text">
        <p>{{ item.product_title }}</p>
        <p v-if="item.variant_title">{{ item.variant_title }}</p>
        <p class="price">
          <span class="original-amount" v-if="item.price != item.original_price">{{ item.original_price | dollar }}</span>
          <span class="amount">{{ item.price | dollar }}</span>
        </p>
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
          store.changeQuantity(item.key, quantity)
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
@import "../../styles/variables";

.cart-item {
  font-family: "neuzeit_grotesk_light";
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #cccccc;

  &:last-child {
    border-bottom: 0px;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  a {
    display: flex;
    width: 100%;
  }

  .image {
    max-width: 100px;
    min-width: 100px;
    padding-right: 10px;
  }

  .text {
    font-weight: normal;
    font-size: 14px;;
    line-height: 1.6em;
    color: #333333;

    @media screen and (min-width: $large-phone) {
      font-size: 16px;
    }

    .price {
      color: #333333;
      font-weight: 700;
      letter-spacing: 1px;

      .original-amount {
        font-weight: normal;
        text-decoration: line-through;
      }
    }
  }

  .quantity {
    padding-left: 100px;
    margin-bottom: 10px;

    input {
      height: 30px;
      font-size: 15px;
      width: 40px;
      text-align: center;
    }

    a {
      height: 30px;
      width: 32px;
      font-size: 12px;
      background-color: #f2f2f2;
      padding: 0px;
      font-weight: 300;
    }
  }
}
</style>
