export default {
  applyToCart (cart) {
    let discountGroups = window.qb.datastore.discount_groups
    let groups = this._groupCartItemByProduct(cart)

    for (let productId in groups) {
      let group = groups[productId]
      this._applyProductDiscount(cart, productId, group, discountGroups)
    }

    return cart
  },

  _groupCartItemByProduct (cart) {
    let groups = {}
    for (let item of cart.items) {
      if (groups[item.product_id]) {
        groups[item.product_id].items.push(item)
        groups[item.product_id].quantity += item.quantity
      } else {
        groups[item.product_id] = {items: [item], quantity: item.quantity}
      }
    }

    return groups
  },

  _applyProductDiscount (cart, productId, itemGroup, discountGroups) {
    let overallBestDiscountTier = { discount_amount: 0 }
    for (let discountGroup of discountGroups) {
      let bestDiscountTier = this._findBestDiscountTier(productId, itemGroup, discountGroup)

      if (bestDiscountTier && (bestDiscountTier.discount_amount > overallBestDiscountTier.discount_amount)) {
        overallBestDiscountTier = bestDiscountTier
      }
    }
    if (overallBestDiscountTier.discount_amount === 0) {
      return
    }

    for (let item of itemGroup.items) {
      item.price = item.original_price - overallBestDiscountTier.discount_amount
      item.line_price = item.price * item.quantity
      cart.total_discount = cart.total_discount - item.total_discount
      item.total_discount = item.original_line_price - item.line_price
      cart.total_discount = cart.total_discount + item.total_discount
      cart.total_price = cart.original_total_price - cart.total_discount
    }
  },

  _findBestDiscountTier (productId, itemGroup, discountGroup) {
    if (!discountGroup.discount_tiers || discountGroup.discount_tiers.length === 0) {
      return
    }

    let productIds = discountGroup.products.map(product => {
      return product.shopify_product_id
    })

    if (productIds.indexOf(productId.toString()) === -1) {
      return
    }

    let best = { discount_amount: 0 }
    for (let tier of discountGroup.discount_tiers) {
      if ((itemGroup.quantity >= tier.min_line_item_quantity) && (tier.discount_amount > best.discount_amount)) {
        best = tier
      }
    }

    return best
  }
}