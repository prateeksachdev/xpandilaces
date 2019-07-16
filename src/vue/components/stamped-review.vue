<template>
  <section class="stamped-review-wrapper">
    <slot name="title"></slot>

    <div v-if="isLoadingReview" class="loading-container">
      <p style="text-align: center;"><img src="//cdn2.shopify.com/s/files/1/1206/8416/t/110/assets/loader.gif"></p>
      <p style="text-align: center; font-size: 20px;">Loading all reviews...</p>
    </div>

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
        show: false,
        isLoadingReview: true
      }
    },
    methods: {
      load () {
        this.show = true

        var id = setInterval(() => {
          console.log('check')
          if (window.jQuery('.stamped-visual-gallery-media-block').length > 0) {
            clearInterval(id)
            this.isLoadingReview = false
          }
        }, 1000)

        setTimeout(() => {
          if (window.jQuery) {
            window.jQuery.ajax({
              type: 'GET',
              url: '//stamped.io/api/shopify/getappkey',
              data: {
                shopShopifyDomain: Shopify.shop
              },
              success: (data) => {
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
