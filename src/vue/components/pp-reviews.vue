<template>
  <section class="stamped-review-wrapper">
    <h2>{{ reviews.heading }}</h2>

    <div v-if="isLoadingReview" class="loading-container">
      <p style="text-align: center;"><img src="//cdn2.shopify.com/s/files/1/1206/8416/t/110/assets/loader.gif"></p>
      <p style="text-align: center; font-size: 20px;">Loading all reviews...</p>
    </div>

    <div v-html="reviews.code" class="reviews lazyload" @lazybeforeunveil="load">

    </div>
  </section>
</template>

<script>
  export default {
    name: 'PpReviews',
    props: {
      reviews: Object
    },
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
          if (window.jQuery('.stamped-visual-gallery-media-block').length > 0) {
            clearInterval(id)
            this.isLoadingReview = false
          }
        }, 1000)

        Shopify.shop = 'xpandlaces.myshopify.com'
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
