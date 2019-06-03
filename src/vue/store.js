import { debounce } from 'debounce';

var store = {
  debug: true,
  state: {
    message: 'Hello!',
    cart: {item_count: 0}
  },
  addToCart (variantId, quantity) {
    return this._addToCart(variantId, quantity).then(this._getCart).then((cart) => {
      this.setCart(cart)
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
    this.state.cart = cart
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
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}

export default store