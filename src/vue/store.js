import { debounce } from 'debounce';
import discount from './discount'

var store = {
  state: {
    cart: { items: [], item_count: 0 },
    isCartDetailVisible: false,
    isNewItemShownInCartDrawer: true,
    checkoutUrl: '/checkout',
    isCheckoutReady: true
  },

  addToCart (variantId, quantity) {
    this.state.isCheckoutReady = false
    this.state.checkoutUrl = '/checkout'

    return this._addToCart(variantId, quantity).then(this._getCart).then((cart) => {
      this.state.isNewItemShownInCartDrawer = false
      return this.setCart(cart)
    })
  },

  _createDraftOrderCheckoutUrl () {
    let items = []
    this.state.cart.items.forEach((item) => {
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

    return window.jQuery.ajax({
      method: "POST",
      url: "https://quantity-breaks-now.herokuapp.com/get_checkout_url?shopify_domain=xpandlaces.myshopify.com",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
    }).then(response => {
      return response.invoice_url
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

    if (this.state.cart.total_discount > 0) {
      this._createDraftOrderCheckoutUrl().then((url) => {
        this.state.checkoutUrl = url
        this.state.isCheckoutReady = true
      })
    } else {
      this.state.isCheckoutReady = true
    }

    return this.state.cart
  },

  changeQuantity: debounce(function (lineItemKey, quantity) {
    this.state.isCheckoutReady = false
    this.state.checkoutUrl = '/checkout'

    return window.jQuery.ajax({
      url: '/cart/change.js',
      dataType: 'json',
      method: 'post',
      data: {
        id: lineItemKey,
        quantity: quantity
      }
    }).then(cart => {
      return this.setCart(cart)
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