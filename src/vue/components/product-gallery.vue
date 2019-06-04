<template>
  <div class="columns product-gallery">
    <div class="column thumbnail">
      <a v-for="(image, index) in images" :key="image.id" @click="swipeTo(index)" href="javascript:;">
        <img class="lazyload" :data-src="image.smLink">
      </a>
    </div>

    <div class="column banner">
      <swiper v-if="isReady" v-show="isLoaded" :options="swiperOption" ref="swiper">
        <swiper-slide v-for="image in images" :key="image.id">
          <img :src="image.mdLink" @load="setLoaded" :id="image.id">
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="loading" v-show="!isLoaded">
        <img :src="loadingGifUrl">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductGallery',
    props: {
      images: Array,
      loadingGifUrl: String
    },
    data () {
      return {
        isLoaded: false,
        isReady: true,
        swiperOption: {
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop: true
        }
      }
    },
    watch: {
      images (newVal, oldVal) {
        if (newVal[0].id != oldVal[0].id) {
          this.isLoaded = false
          this.isReady = false

          setTimeout(() => {
            this.isReady = true
          })
        }
      }
    },
    methods: {
      swipeTo (index) {
        this.$refs.swiper.swiper.slideTo(index + 1)
      },

      setLoaded (e) {
        if (e.target.id === this.images[0].id) {
          this.isLoaded = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
