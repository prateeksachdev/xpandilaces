<template>
  <section class="section three-item-banner">
    <div class="container">
      <slot name="title"></slot>

      <swiper :options="swiperOption">
        <slot name="slides"></slot>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <slot name="cta"></slot>
    </div>
  </section>
</template>

<script>
  import { swiper } from 'vue-awesome-swiper'

  export default {
    name: 'ThreeItemBanner',
    components: {
      swiper
    },
    data: function () {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          breakpoints: {
            // when window width is <= 575px
            575: {
              centeredSlides: true,
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is <= 768px
            768: {
              centeredSlides: false,
              slidesPerView: 2,
              spaceBetween: 30
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
