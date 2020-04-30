let customDatastore = window.cartSettings.discoutsSettings;
let discountOnRestProductsIsOff = window.discountOnRestProductsIsOff;
let bestDiscountTierLineItemQTY = 0;
export default {
  applyToCart(cart) {
    let discountGroups = customDatastore;
    let itemGroups = this._extractItemByDiscountGroup(cart, discountGroups);
    console.log("itemGroups", itemGroups);
    window.itemGroups = itemGroups;
    for (let index in itemGroups) {
      let itemGroup = itemGroups[index];
      let discountGroup = discountGroups[index];
      this._applyProductDiscount(cart, itemGroup, discountGroup);
    }

    cart.discount_hints = this._extraDiscountHints(discountGroups, itemGroups);
    this.setDiscountForFreeItem(cart);
    console.log("updated Cart", cart);
    window.currentItems = cart.items;
    let recommendedProList = document.querySelectorAll(".cm-rec-pro-item");
    if (recommendedProList.length > 0) {
      let cartHandles = [];
      window.currentItems.forEach(function (item, index) {
        let cartHandle = item.handle;
        cartHandles.push(cartHandle);
      });

      let proIndex = 0;
      (function showAllRecommendedProducts() {
        recommendedProList[proIndex].style.display = "flex";
        proIndex++;
        if (proIndex < recommendedProList.length) {
          showAllRecommendedProducts();
        }
      })();

      window.recommendedProducts.forEach(function (recItem, index) {
        let recItemHandle = recItem.url.replace("/products/", "");
        if (cartHandles.indexOf(recItemHandle) > -1) {
          recommendedProList[index].style.display = "none";
        }
      });
    }
    return cart;
  },

  _extraDiscountHints(discountGroups, itemGroups) {
    let hints = {};
    let quantity, discountGroup, closestTier, appliedTier, maxTier;

    for (let index in itemGroups) {
      quantity = itemGroups[index].quantity;
      discountGroup = discountGroups[index];
      closestTier = this._findClosestDiscountTier(discountGroup, quantity);
      appliedTier = this._findBestDiscountTier(
        itemGroups[index],
        discountGroups[index]
      );
      maxTier = this._findMaxDiscountTier(discountGroup);

      if (!closestTier) {
        return {};
      }

      hints[index] = {
        original_price: itemGroups[index].items[0].original_price,
        current_quantity: itemGroups[index].quantity,
        applied_tier: appliedTier,
        closest_tier: closestTier,
        max_tier: maxTier,
        additional_quantity_needed:
          closestTier.min_line_item_quantity - quantity,
        hint_template: discountGroup.description,
      };
    }

    return hints;

    window.closestTier = closestTier;
    window.appliedTier = appliedTier;
  },

  _findClosestDiscountTier(discountGroup, quantity) {
    for (let tier of discountGroup.discount_tiers) {
      if (tier.min_line_item_quantity > quantity) {
        return tier;
      }
    }
  },

  _findMaxDiscountTier(discountGroup) {
    let maxTier = discountGroup.discount_tiers[0];

    for (let tier of discountGroup.discount_tiers) {
      if (tier.min_line_item_quantity > maxTier.min_line_item_quantity) {
        maxTier = tier;
      }
    }

    return maxTier;
  },

  _extractItemByDiscountGroup(cart, discountGroups) {
    let groups = {};
    for (let item of cart.items) {
      let groupIndex = this._findMatchingDiscountGroup(
        item.product_id,
        discountGroups
      );
      if (groupIndex === -1) {
        continue;
      }

      if (groups[groupIndex]) {
        groups[groupIndex].items.push(item);
        groups[groupIndex].quantity += item.quantity;
      } else {
        groups[groupIndex] = { items: [item], quantity: item.quantity };
      }
    }

    return groups;
  },

  _findMatchingDiscountGroup(productId, discountGroups) {
    for (let [index, group] of discountGroups.entries()) {
      let productIds = group.products.map((product) => {
        return product.shopify_product_id;
      });
      if (productIds.includes(productId.toString())) {
        return index;
      }
    }

    return -1;
  },

  _groupCartItemByProduct(cart) {
    let groups = {};
    for (let item of cart.items) {
      if (groups[item.product_id]) {
        groups[item.product_id].items.push(item);
        groups[item.product_id].quantity += item.quantity;
      } else {
        groups[item.product_id] = { items: [item], quantity: item.quantity };
      }
    }

    return groups;
  },

  _applyProductDiscount(cart, itemGroup, discountGroup) {
    let bestDiscountTier = this._findBestDiscountTier(itemGroup, discountGroup);
    console.log("bestDiscountTier", bestDiscountTier);
    bestDiscountTierLineItemQTY = bestDiscountTier.min_line_item_quantity;
    console.log("bestDiscountTierLineItemQTY", bestDiscountTierLineItemQTY);
    if (bestDiscountTier.discount_amount === 0) {
      return;
    }

		/*for (let item of itemGroup.items) {
		  if (item.properties && item.properties.productType == "free") {
			console.log("discount & free pros are same");
		  } else {
			item.price = item.original_price - bestDiscountTier.discount_amount;
			item.line_price = item.price * item.quantity;
			cart.total_discount = cart.total_discount - item.total_discount;
			item.total_discount = item.original_line_price - item.line_price;
			cart.total_discount = cart.total_discount + item.total_discount;
			cart.total_price = cart.original_total_price - cart.total_discount;
		  }
		}*/

    for (let item of itemGroup.items) {
      if (item.properties && item.properties.productType == "free") {
        console.log("discount & free pros are same");
      } else {
        item.price = item.original_price - bestDiscountTier.discount_amount;
        item.line_price = item.price * item.quantity;
        cart.total_discount = cart.total_discount - item.total_discount;
        item.total_discount = item.original_line_price - item.line_price;
        cart.total_discount = cart.total_discount + item.total_discount;
        cart.total_price = cart.original_total_price - cart.total_discount;
        localStorage.setItem('show-discount', "false");
        if (
          discountOnRestProductsIsOff &&
          bestDiscountTierLineItemQTY < itemGroup.quantity
        ) {
          let restQTY = itemGroup.quantity - bestDiscountTierLineItemQTY;
          let extraAmountOnTotal = restQTY * bestDiscountTier.discount_amount;
          item.price = item.price + extraAmountOnTotal / item.quantity;
          item.line_price = item.price * item.quantity;
          cart.total_discount =
            cart.total_discount - restQTY * bestDiscountTier.discount_amount;
          cart.total_price = cart.original_total_price - cart.total_discount;
          localStorage.setItem('show-discount', "true");
        }
      }
    }
  },

  _findBestDiscountTier(itemGroup, discountGroup) {
    if (
      !discountGroup.discount_tiers ||
      discountGroup.discount_tiers.length === 0
    ) {
      return;
    }

    let best = { discount_amount: 0 };
    let exactTarget = false;
    for (let tier of discountGroup.discount_tiers) {
      if (
        itemGroup.quantity >= tier.min_line_item_quantity && // hit line >=
        tier.discount_amount > best.discount_amount
      ) {
        best = tier;
      }

      if (
        itemGroup.quantity == tier.min_line_item_quantity &&
        tier.discount_amount > best.discount_amount
      ) {
        exactTarget = true;
      }
    }
    window.exactTarget = exactTarget;
    console.log("exactTarget", exactTarget);
    return best;
  },

  /*===== set Discount on free product ===*/
  setDiscountForFreeItem(cart) {
    let isFreeProductAdded = cart.items.some(
      (item) => item.properties && item.properties.productType == "free" // free product id
    );
    if (isFreeProductAdded) {
      cart.items.forEach(function (item, index) {
        if (item.properties && item.properties.productType == "free") {
          cart.items[index].discounts = [{}];
          cart.items[index].discounts[0].amount = item.price;
          cart.items[index].discounts[0].title = "free product";
          cart.items[index].price = 0;
          cart.items[index].line_price = 0;
          cart.items[index].total_discount = item.original_price;
          cart.items[index].discounted_price = 0;

          cart.total_discount =
            cart.total_discount + cart.items[index].total_discount;
          cart.total_price = cart.original_total_price - cart.total_discount;
        }
      });
    }
  },

  addNewDiscountMethod(cart) {
    let itemInAction = window.itemInAction;
    if (discountOnRestProductsIsOff) {
    }
  },
};
