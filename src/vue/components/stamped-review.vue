<template>
  <section class="stamped-review-wrapper">
    <slot name="title"></slot>

    <div class="reviews lazyload" @lazybeforeunveil="load">
      <slot v-if="show" name="snippet"></slot>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'StampedReview',
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
  }
</script>

<style lang="scss" scoped>
</style>
