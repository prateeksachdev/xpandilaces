<template>
  <div>
    <form @submit.prevent="checkout" action="/cart" method="post">
      <div v-if="!isCartEmpty" class="head">
        <div class="progress-wrap text-center">
          <transition name="fadeup">
            <div v-if="isFlashing" class="text-wrapper" :style="{color: discountHintColor}">
              <p>{{flashMsg}}</p>
            </div>
          </transition>

          <transition name="fadeup">
            <div v-if="!isFlashing" class="text-wrapper" :style="{color: discountHintColor}">
              <p v-if="primaryDiscountHint" v-html="primaryDiscountHint.text"></p>
              <p v-else v-html="noDiscountHintText"></p>
            </div>
          </transition>
			<div id="free-product-hints">
			<p id="cm-hints" :style="{color: discountHintColor}"></p>
			</div>
          <div class="progress-frame">
            <div class="progress-fill" :style="{width: progress + '%', backgroundColor: progressBarColor}"></div>
          </div>
        </div>
      </div>

      <div v-if="isCartEmpty" class="empty-cart">
        <div class="empty-text">
          <p>
            <slot name="empty-msg"></slot>
          </p>
          <a @click="hide" href="javascript:;" class="continue-shopping">
            <slot name="continue-shopping"></slot>
          </a>
        </div>
      </div>

      <div v-if="!isCartEmpty" class="drawer">
        <div class="line-items">
          <ul>
            <cart-item v-for="item in cart.items" :key="item.key" :item="item">
            </cart-item>
			<div v-if="state.freeProductAdded === false && state.isFreeProductAdded === false" id="addFreeProduct" @click="selectFreeProduct()">
				<span>Select your free product</span>
			</div>
          </ul>
        </div>

        <hr v-if="cart.items.length === 1">
		<div v-if="recommendedProducts.length > 0" class="cm-recommended-products-wrapper">
			<h3 :style="{backgroundColor:recommendedProductsTitle.bgColor, color:recommendedProductsTitle.color }">{{ recommendedProductsTitle.text }}</h3>
			<div class="recommended-products-listing">
				<div class="cm-rec-pro-item" v-for="item in recommendedProducts">
					<div class="cm-rec-pro-img">
						<img :src="item.image" :alt="item.title">
					</div>
					<div class="cm-rec-pro-info">
						<h3><a :href="item.url">{{ item.title }}</a></h3>
						<h6>{{ item.type }}</h6>
						<span class="cm-crnt-price">{{ item.price }}</span>
						<a :href="item.url" class="cm-btn">Pick your color</a>
					</div>
				</div>
			</div>
		</div>
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
	let customDatastore = window.cartSettings.discoutsSettings;
	let freeShipping = window.cartSettings.freeShipping;

	
	

  export default {
    name: 'CartDrawer',
    components: {
      CartItem
    },
    filters: {
      dollar
    },
    props: {
      isVisible: Boolean,
      checkoutTextColor: String,
      checkoutBgColor: String,
      freeShippingAppliedText: {
        type: String,
        default: freeShipping.messages.success
      },
      discountAppliedTemplate: String,
      discountHintColor: {
        type: String,
        default: '#4a4a4a'
      },
      progressBarColor: {
        type: String,
        default: '#4a4a4a'
      },//here set the free shipping after n products
      freeShippingItemCount: {
        type: Number,
        default: Number(freeShipping.messages.minProductsCount)
      },
      savingTextTemplate: {
        type: String,
        default: 'You saved {{savingPercentage}} ({{savingAmount}})'
      },
      freeShippingHintTemplate: {
        type: String,
        default: freeShipping.messages.upcoming
      },
      discountGroupForHint: {
        type: String,
        default: 'Laces'
      },
      noDiscountHintText: {
        type: String,
        default: 'You are all set!<br>Continue to shop or proceed to checkout!'
      }
    },
    data: function () {
      return {
        state: store.state,
        isCheckingOut: false,
        freeShippingDiscountIndex: 99,
        isFlashing: false,
        flashMsg: undefined,
		recommendedProductsTitle:window.recommendedProductsTitle,
		recommendedProducts :window.recommendedProducts
      }
    },
    computed: {
      progress() {
        if (!this.primaryDiscountHint) { return 100 }

        let discountHints = this.discountHints
        let maxQuantity = this.primaryDiscountHint.max_tier.min_line_item_quantity
        for (let key in discountHints) {
          if (discountHints[key].max_tier.min_line_item_quantity > maxQuantity) {
            maxQuantity = discountHints[key].max_tier.min_line_item_quantity
          }
        }

        return this.primaryDiscountHint.current_quantity * (100 / maxQuantity)
      },
      discountHints () {
        let freeShippingItemCount = parseInt(this.freeShippingItemCount)
        if (this.cart.item_count >= this.freeShippingItemCount) {
          return this.cart.discount_hints
        }

        let freeShippingDiscount = {}
        freeShippingDiscount[this.freeShippingDiscountIndex] = {
          additional_quantity_needed: freeShippingItemCount - this.cart.item_count,
          max_tier: { min_line_item_quantity: freeShippingItemCount },
          current_quantity: this.cart.item_count,
          hint_template: this.freeShippingHintTemplate
        }

        let all = Object.assign(this.cart.discount_hints || {}, freeShippingDiscount)
        let discountGroups = customDatastore
        let key = this.keyOfDiscount(discountGroups, this.discountGroupForHint)

        // We only want to use free shipping and the specified discount group for hint
        // ignore all others
        let hints = {}
        if (all[key]) { hints[key] = all[key] }
        if (all[this.freeShippingDiscountIndex]) { hints[this.freeShippingDiscountIndex] = all[this.freeShippingDiscountIndex] }
        if (all[key] && all[this.freeShippingDiscountIndex]) {
          hints[this.freeShippingDiscountIndex].applied_tier = all[key].applied_tier
          hints[this.freeShippingDiscountIndex].original_price = all[key].original_price
        }

        return hints
      },
      primaryDiscountHint () {
        let discountHints = this.discountHints

        // No hint or already at max discount
        if (Object.keys(discountHints).length === 0) { return }

        // Pick anyone as primary
        let primary = discountHints[Object.keys(discountHints)[0]]
        // Find the actual primary
        for (let key in discountHints) {
          if (discountHints[key].additional_quantity_needed < primary.additional_quantity_needed) {
            primary = discountHints[key]
          }
        }

        let quantity = primary.additional_quantity_needed
        let discountPercentage = 0
        if (primary.closest_tier) {
          discountPercentage = Math.ceil(primary.closest_tier.discount_amount / primary.original_price * 100)
        }
        primary.text = primary.hint_template.replace('{{quantity}}', quantity).replace('{{discountPercentage}}', discountPercentage)

        return primary
      },
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
      },
	  recommendedProducts(){
		  return this.recommendedProducts;
	  },
	  recommendedProductsTitle() {
		  return this.recommendedProductsTitle;
	  }
    },
    watch: {
      isCheckoutReady (newVal, oldVal) {
        if (newVal && (newVal != oldVal) && this.isCheckingOut) {
          this.checkout()
        }
      },
      cart (newCart, oldCart) {
        // Flash msg when customer receives free shipping
        if (oldCart.item_count === 0) { return }
        if (oldCart.item_count < this.freeShippingItemCount && newCart.item_count >= this.freeShippingItemCount) {
          this.flash(this.freeShippingAppliedText)
        }
      },
      primaryDiscountHint (newHint, oldHint) {
        // Flash msg when customer received a new tier of discount
        if (!newHint || !oldHint) { return }
        if (!newHint.applied_tier) { return }
        if (newHint.applied_tier.discount_amount == 0) { return }

        if (!oldHint.applied_tier || (newHint.applied_tier.discount_amount > oldHint.applied_tier.discount_amount)) {
          let discountPercentage = Math.ceil(newHint.applied_tier.discount_amount / newHint.original_price * 100)
          let msg = this.discountAppliedTemplate.replace('{{discountPercentage}}', discountPercentage)
          this.flash(msg)
        }
      }
    },
    methods: {
      flash (msg) {
        if (!this.isVisible) { return }

        this.flashMsg = msg
        this.isFlashing = true
        setTimeout(() => {
          this.isFlashing = false
          this.flashMsg = undefined
        }, 3000)
      },
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
      },
	selectFreeProduct () {
		store.selectFreeProduct()
	},
      keyOfDiscount (discountGroups, title) {
        for (var i = 0; i < discountGroups.length; i++) {
          if (discountGroups[0].title.toLowerCase() === title.toLowerCase()) {
            return i
          }
        }

        return -1
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
