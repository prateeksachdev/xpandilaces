document.addEventListener('DOMContentLoaded', function () {

  new Vue({
    el: '.stamped-review-wrapper',
    delimiters: ['${', '}'],
    data: function () {
      return {
        show: false
      }
    },
    methods: {
      load () {
        this.show = true

        setTimeout(function () {
          if (window.jQuery) {
            window.jQuery.ajax({
              type: 'GET',
              url: '//stamped.io/api/shopify/getappkey',
              data: {
                shopShopifyDomain: Shopify.shop
              },
              success: function (data) {
                var appKey = data.apiKey
                // init widgets
                window.StampedFn.init({apiKey: appKey, storeUrl: Shopify.shop})
              }
            })
          }
        })
      }
    }
  })

})