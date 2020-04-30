<template>
  <div class="cart-control">
    <form
      method="POST"
      action="/cart/add"
      @submit.prevent="addToCart(variantId, quantity)"
    >
      <a
        class="button icon-minus"
        href="javascript:;"
        @click="minusQuantity"
      ></a>
      <input
        v-model="quantity"
        type="number"
        min="1"
        size="2"
        name="quantity"
      />
      <a class="button icon-plus" href="javascript:;" @click="plusQuantity"></a>

      <button
        class="button"
        :class="{ loading: isAddingToCart }"
        :disabled="isAddingToCart"
        :style="atcStyleObject"
        type="submit"
      >
        <span v-show="!isAddingToCart" class="fadeInDown"
          ><span class="default">Add To Cart</span
          ><span class="belt-default">Pre-Order</span></span
        >
        <svg
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          viewBox="0 0 32 32"
          class="checkmark"
        >
          <path
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="square"
            stroke-miterlimit="10"
            d="M9,17l3.9,3.9c0.1,0.1,0.2,0.1,0.3,0L23,11"
          ></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "CartControl",
  props: {
    variantId: String,
    atcTextColor: String,
    atcBgColor: String,
    clickCount: Number
  },
  data: function() {
    return {
      quantity: 1,
      isAddingToCart: false
    };
  },
  computed: {
    atcStyleObject() {
      let obj = {};
      if (this.atcTextColor) {
        obj.color = this.atcTextColor;
      }

      if (this.atcBgColor) {
        obj.backgroundColor = this.atcBgColor;
        obj.borderColor = this.atcBgColor;
      }
      return obj;
    }
  },
  methods: {
    addToCart(variantId, quantity) {
      this.isAddingToCart = true;
      store.addToCart(variantId, quantity).then(() => {
        this.isAddingToCart = false;
        store.showCartDetail();
      });
    },

    minusQuantity() {
      this.quantity = store.state.currentProCount;
      if (this.quantity > 1) {
        this.quantity = parseInt(this.quantity) - 1;
      }
      store.state.currentProCount = this.quantity;
    },

    plusQuantity() {
      this.quantity = store.state.currentProCount;
      this.quantity = parseInt(this.quantity) + 1;
      store.state.currentProCount = this.quantity;
    },

    changeQntyToOne() {
      this.quantity = 1;
    }
  }
};
</script>

<style lang="scss" scoped></style>
