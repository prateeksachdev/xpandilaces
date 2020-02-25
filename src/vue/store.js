import { debounce } from "debounce";
import discount from "./discount";
let cartSettings = window.cartSettings;
function showFreeProHints(count, isAdded, update) {
  let awayQnty = cartSettings.freeProduct.minProductsCount - count;
  let hintEle = document.getElementById("cm-hints");
  let wrapperEleForFreePro = document.getElementById("free-product-hints");
  if (wrapperEleForFreePro) {
    console.log("awayQnty--", awayQnty, "count--", count);
    if (awayQnty > -1 && awayQnty < 3) {
      document.body.classList.add("freeProHint");
      wrapperEleForFreePro.style.display = "block";
      let upcomingHint = cartSettings.freeProduct.messages.upcoming.replace(
        "{{quantity}}",
        awayQnty
      );
      let successMsg = cartSettings.freeProduct.messages.success;
      if (awayQnty > 0) {
        hintEle.innerText = upcomingHint;
      }
      if (awayQnty == 0 && isAdded) {
        hintEle.innerText = successMsg;
      }
      setTimeout(function() {
        document.body.classList.remove("freeProHint");
        wrapperEleForFreePro.style.display = "none";
      }, 2000);
    } else {
      document.body.classList.remove("freeProHint");
      wrapperEleForFreePro.style.display = "none";
    }

    if (update === true) {
      document.body.classList.add("freeProHint");
      hintEle.innerText = "Free product has been updated successfully.";
      setTimeout(function() {
        document.body.classList.remove("freeProHint");
        wrapperEleForFreePro.style.display = "none";
        hintEle.innerText = "";
      }, 2000);
    }
  }
}
var store = {
  state: {
    cart: { items: [], item_count: 0 },
    isCartDetailVisible: false,
    isNewItemShownInCartDrawer: true,
    checkoutUrl: "/checkout",
    isCheckoutReady: true,
    freeProductAdded: null,
    isFreeProductAdded: false
  },

  addToCart(variantId, quantity) {
    this.state.isCheckoutReady = false;
    this.state.checkoutUrl = "/checkout";

    return this._addToCart(variantId, quantity)
      .then(this._getCart)
      .then(cart => {
        this.state.isNewItemShownInCartDrawer = false;
        this.checkFreeProduct(cart);
      });
  },

  _addToCart(variantId, quantity) {
    return window.jQuery.ajax({
      url: "/cart/add.js",
      dataType: "json",
      method: "post",
      data: {
        id: variantId,
        quantity: quantity
      }
    });
  },
  openFreeProductModal() {
    document.body.classList.add("openFreeProductModal");
    let makePromise = new Promise(function(resolve, reject) {
      document
        .querySelectorAll(".freeProducts-modal .swatch-item")
        .forEach(function(item) {
          item.addEventListener("click", function(event) {
            let varId = Number(event.target.getAttribute("data-varid"));
            document.body.classList.remove("openFreeProductModal");
            resolve(varId);
          });
        });
      document
        .getElementById("close-free-modal")
        .addEventListener("click", function(event) {
          document.body.classList.remove("openFreeProductModal");
          resolve("notadded");
        });
    });
    return makePromise;
  },
  checkFreeProduct(cart) {
    if (cartSettings.freeProduct.active) {
      let minItemsCount = cartSettings.freeProduct.minProductsCount;
      let shouldProducts = cartSettings.freeProduct.shouldProducts;
      let relProCount = cart.items.reduce((acc, item) => {
        if (shouldProducts.indexOf(item.handle) > -1) {
          return acc + item.quantity;
        } else {
          return acc;
        }
      }, 0);
      let prevRelProCount = this.state.cart.items.reduce((acc, item) => {
        if (shouldProducts.indexOf(item.handle) > -1) {
          return acc + item.quantity;
        } else {
          return acc;
        }
      }, 0);
      console.log(
        `minItemsCount -- ${minItemsCount}, shouldProducts-- ${shouldProducts},relProCount-- ${relProCount},'prevRelProCount'--${prevRelProCount}`
      );

      let isFreeProductAdded = cart.items.some(
        item => item.properties && item.properties.productType == "free" // free product id
      );
      this.state.freeProductAdded = null;

      if (
        relProCount >= minItemsCount &&
        prevRelProCount <= minItemsCount &&
        isFreeProductAdded == false
      ) {
        console.log("free product should add");
        return this.openFreeProductModal().then(varId => {
          console.log("varId--", varId);
          if (varId == "notadded") {
            return this._getCart().then(cart => {
              showFreeProHints(relProCount, false);
              this.state.freeProductAdded = false;
              return this.setCart(cart);
            });
          } else {
            return this.addFreeProduct(varId, 1)
              .then(this._getCart)
              .then(cart => {
                this.state.freeProductAdded = true;
                showFreeProHints(relProCount, true);
                return this.setCart(cart);
              });
          }
        });
      } else if (relProCount <= minItemsCount && isFreeProductAdded == true) {
        console.log("free product should remove");
        return this.removeFreeProduct(cart, 0)
          .then(this._getCart)
          .then(cart => {
            showFreeProHints(relProCount, false);
            return this.setCart(cart);
          });
      } else {
        console.log("keep going");
        showFreeProHints(relProCount, false);
        return this.setCart(cart);
      }
    } else {
      return this.setCart(cart);
    }
  },
  addFreeProduct(varId, setQnt) {
    return window.jQuery.ajax({
      url: "/cart/add.js",
      dataType: "json",
      method: "post",
      data: {
        id: varId,
        quantity: setQnt,
        properties: {
          productType: "free"
        }
      }
    });
  },

  editFreeProduct() {
    return this.openFreeProductModal().then(varId => {
      console.log("edit varId--", varId);
      if (varId == "notadded") {
        return this._getCart().then(cart => {
          return this.setCart(cart);
        });
      } else {
        return this.removeFreeProductOnEdit().then(isRemoved => {
          if (isRemoved == "removalDone") {
            return this.addFreeProductOnEdit(varId, 1)
              .then(this._getCart)
              .then(cart => {
                showFreeProHints(
                  cartSettings.freeProduct.minProductsCount,
                  true,
                  true
                );
                return this.setCart(cart);
              });
          }
        });
      }
    });
  },

  addFreeProductOnEdit(varId, setQnt) {
    return window.jQuery.ajax({
      url: "/cart/add.js",
      dataType: "json",
      method: "post",
      data: {
        id: varId,
        quantity: setQnt,
        properties: {
          productType: "free"
        }
      },
      success: function() {
        console.log(varId + "free product added 2");
      }
    });
  },
  removeFreeProductOnEdit() {
    let makePromise = new Promise(function(resolve, reject) {
      window.jQuery.ajax({
        url: "/cart.js",
        dataType: "json",
        method: "get",
        success: function(data) {
          console.log("free product should remove on edit");
          let lineId;
          data.items.forEach((item, index) => {
            if (item.properties && item.properties.productType == "free") {
              lineId = index + 1;
            }
          });
          console.log("free lineId--", lineId);
          window.jQuery.ajax({
            url: "/cart/change.js",
            dataType: "json",
            method: "post",
            data: {
              line: lineId,
              quantity: 0
            },
            success: function(data) {
              console.log("free product removed");
              resolve("removalDone");
            }
          });
        }
      });
    });
    return makePromise;
  },
  selectFreeProduct() {
    return this.openFreeProductModal().then(varId => {
      console.log("varId--", varId);
      if (varId == "notadded") {
        return this._getCart().then(cart => {
          return this.setCart(cart);
        });
      } else {
        return this.addFreeProduct(varId, 1)
          .then(this._getCart)
          .then(cart => {
            showFreeProHints(cartSettings.freeProduct.minProductsCount, true);
            return this.setCart(cart);
          });
      }
    });
  },
  removeFreeProduct(cart, setQnt) {
    let lineId;
    cart.items.forEach((item, index) => {
      if (item.properties && item.properties.productType == "free") {
        lineId = index + 1;
      }
    });

    console.log("lineId--", lineId);
    return window.jQuery.ajax({
      url: "/cart/change.js",
      dataType: "json",
      method: "post",
      data: {
        line: lineId, // hardcoaded variant id of free product
        quantity: setQnt
      }
    });
  },

  _getCart() {
    return window.jQuery.ajax({
      url: "/cart.js",
      dataType: "json",
      method: "get"
    });
  },

  setCart(cart) {
    cart.items = cart.items.reverse();

    let isFreeProductAdded = cart.items.some(
      item => item.properties && item.properties.productType == "free"
    );
    this.state.cart = discount.applyToCart(cart);

    this.state.checkoutUrl = "/checkout";
    this.state.isCheckoutReady = true;

    this.state.isFreeProductAdded = isFreeProductAdded;
    return this.state.cart;
  },

  changeQuantity: debounce(function(lineItemKey, quantity) {
    this.state.isCheckoutReady = false;
    this.state.checkoutUrl = "/checkout";

    return window.jQuery
      .ajax({
        url: "/cart/change.js",
        dataType: "json",
        method: "post",
        data: {
          id: lineItemKey,
          quantity: quantity
        }
      })
      .then(cart => {
        this.checkFreeProduct(cart);
      });
  }, 500),

  showCartDetail() {
    this.state.isCartDetailVisible = true;
  },

  hideCartDetail() {
    this.state.isCartDetailVisible = false;
  },

  showNewItemInCartDrawer(el) {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
      this.state.isNewItemShownInCartDrawer = true;
    }, 300);
  }
};

export default store;
