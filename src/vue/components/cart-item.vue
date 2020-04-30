<template>
  <li class="cart-item">
    <a :href="productUrl(item.url)">
      <div class="image">
        <img :src="imgURL(item.image, imgSize)" :alt="item.title" />
      </div>
      <div class="text">
        <p>{{ item.product_title }}</p>
        <p v-if="item.variant_title">
          {{ item.variant_title
          }}<span
            v-if="item.price == 0"
            @click="editFreeProduct($event)"
            id="editFreeProduct"
            >Update Product</span
          >
        </p>
        <p class="price" v-if="item.price != 0">
          <span
            class="original-amount"
            v-if="item.price != item.original_price"
            >{{ item.original_price | dollar }}</span
          >
          <span class="amount">{{ item.price | dollar }}</span>
        </p>
        <p class="cm-zero-price" v-if="item.price == 0">
          <span class="free-amount">{{ item.original_price | dollar }}</span>
          <span class="free-product-label">Free</span>
        </p>
      </div>
    </a>

    <div class="quantity" v-if="item.price != 0">
      <div class="field has-addons">
        <p class="control">
          <a @click="changeQuantity(item, item.quantity - 1)" class="button">
            <span class="icon-minus"></span>
          </a>
        </p>
        <p class="control">
          <input
            class="input"
            type="text"
            size="2"
            :value="item.quantity"
            @input="changeQuantity(item, $event.target.value)"
          />
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
import { dollar } from "../filters";
import { imgURL } from "../helpers";
import store from "../store";

export default {
  name: "CartItem",
  props: {
    item: Object,
    imgSize: {
      default: "160x"
    }
  },
  filters: {
    dollar
  },
  data: function() {
    return {
      state: store.state
    };
  },
  methods: {
    imgURL: imgURL,
    changeQuantity(item, quantity) {
      document.body.classList.add("loader-on");
      if (parseInt(quantity) >= 0) {
        item.quantity = quantity;
        store.changeQuantity(item.key, quantity);
      }
    },
    editFreeProduct(event) {
      event.preventDefault();
      store.editFreeProduct();
    },
    productUrl(url) {
      if (url) {
        return url.split("?")[0];
      } else {
        return url;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
