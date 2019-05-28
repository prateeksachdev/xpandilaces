<template>
  <section class="section icon-swiper">
    <div class="container">
      <swiper :options="swiperOption">
        <slot name="slides"></slot>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'IconSwiper',
    data: function () {
      return {
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop: true,
          breakpoints: {
            // when window width is <= 575px
            575: {
              centeredSlides: true,
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is <= 768px
            768: {
              centeredSlides: true,
              slidesPerView: 1,
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
