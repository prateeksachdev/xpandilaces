<template>
  <div class="gallery-simple">
    <swiper :options="swiperOption" ref="swiper">
      <swiper-slide v-for="image in images" :key="image">
        <img :data-src="imgURL(image, '600x')" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="thumbnails">
      <a v-for="(image, index) in images" :key="image" @click="swipeTo(index)" href="javascript:;">
        <img class="lazyload" :data-src="imgURL(image, '60x')">
      </a>
    </div>
  </div>
</template>

<script>
import { imgURL } from '../helpers'
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'GallerySimple',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    imagesJson: String
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        preloadImages: false,
        lazy: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true
      }
    }
  },
  computed: {
    images (json) {
      if (json) {
        return JSON.parse(this.imagesJson)
      }

      return []
    }
  },
  mounted () {
    console.log(this.images)
  },
  methods: {
    imgURL: imgURL,
    swipeTo (index) {
      this.$refs.swiper.swiper.slideTo(index + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
