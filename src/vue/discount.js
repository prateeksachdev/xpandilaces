export default {
  applyToCart (cart) {
    let discountGroups = window.qb.datastore.discount_groups
    let itemGroups = this._extractItemByDiscountGroup(cart, discountGroups)

    for (let index in itemGroups) {
      let itemGroup = itemGroups[index]
      let discountGroup = discountGroups[index]
      this._applyProductDiscount(cart, itemGroup, discountGroup)
    }

    return cart
  },

  _extractItemByDiscountGroup (cart, discountGroups) {
    let groups = {}
    for (let item of cart.items) {
      let groupIndex = this._findMatchingDiscountGroup(item.product_id, discountGroups)
      if (groupIndex === -1) { continue }

      if (groups[groupIndex]) {
        groups[groupIndex].items.push(item)
        groups[groupIndex].quantity += item.quantity
      } else {
        groups[groupIndex] = { items: [item], quantity: item.quantity }
      }
    }

    return groups
  },

  _findMatchingDiscountGroup(productId, discountGroups) {
    for (let [index, group] of discountGroups.entries()) {
      let productIds = group.products.map((product) => { return product.shopify_product_id })
      if (productIds.includes(productId.toString())) {
        return index
      }
    }

    return -1
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

  _applyProductDiscount (cart, itemGroup, discountGroup) {
    let bestDiscountTier = this._findBestDiscountTier(itemGroup, discountGroup)

    if (bestDiscountTier.discount_amount === 0) {
      return
    }

    for (let item of itemGroup.items) {
      item.price = item.original_price - bestDiscountTier.discount_amount
      item.line_price = item.price * item.quantity
      cart.total_discount = cart.total_discount - item.total_discount
      item.total_discount = item.original_line_price - item.line_price
      cart.total_discount = cart.total_discount + item.total_discount
      cart.total_price = cart.original_total_price - cart.total_discount
    }
  },

  _findBestDiscountTier (itemGroup, discountGroup) {
    if (!discountGroup.discount_tiers || discountGroup.discount_tiers.length === 0) {
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
