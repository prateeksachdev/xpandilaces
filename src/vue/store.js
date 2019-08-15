import { debounce } from 'debounce';
import discount from './discount'

var store = {
  state: {
    cart: {item_count: 0},
    isCartDetailVisible: false,
    isNewItemShownInCartDrawer: true
  },

  addToCart (variantId, quantity) {
    return this._addToCart(variantId, quantity).then(this._getCart).then((cart) => {
      this.setCart(cart)
      this.state.isNewItemShownInCartDrawer = false
      return cart
    })
  },

  _addToCart (variantId, quantity) {
    return window.jQuery.ajax({
      url: '/cart/add.js',
      dataType: 'json',
      method: 'post',
      data: {
        id: variantId,
        quantity: quantity
      }
    })
  },

  _getCart () {
    return window.jQuery.ajax({
      url: '/cart.js',
      dataType: 'json',
      method: 'get'
    })
  },

  setCart (cart) {
    cart.items = cart.items.reverse()
    this.state.cart = discount.applyToCart(cart)
  },

  changeQuantity: debounce(function (lineItemKey, quantity) {
    return window.jQuery.ajax({
      url: '/cart/change.js',
      dataType: 'json',
      method: 'post',
      data: {
        id: lineItemKey,
        quantity: quantity
      }
    }).then(cart => {
      this.setCart(cart)
    })
  }, 500),

  showCartDetail () {
    this.state.isCartDetailVisible = true
  },

  hideCartDetail () {
    this.state.isCartDetailVisible = false
  },

  showNewItemInCartDrawer (el) {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight
      this.state.isNewItemShownInCartDrawer = true
    }, 300)
  }
}

export default store