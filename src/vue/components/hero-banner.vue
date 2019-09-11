<template>
  <section class="hero">
    <slot name="settings"></slot>
    <div style="width: 100%;">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(block, index) in settings.blocks" :key="index">
          <div v-if="block.type === 'image'" class="item">
            <img class="lazyload img-desktop" :data-src="block.image">
            <a :href="mobileLink(block)" class="img-link">
              <img class="lazyload img-mobile" :data-src="block.image_mobile">
            </a>

            <div class="desktop">
              <div class="container">
                <div class="content" :style="{textAlign: block.overlay_position}">
                  <h1 v-html="block.title"></h1>
                  <p class="title-caption">{{ block.title_caption }}</p>

                  <p v-if="block.primary_cta_text" class="primary-cta">
                    <a class="button" :href="block.primary_cta_link" :style="{color: block.primary_cta_text_color, backgroundColor: block.primary_cta_bg_color, borderColor: block.primary_cta_bg_color}">
                      {{ block.primary_cta_text }}
                    </a>
                  </p>

                  <p v-if="block.enable_secondary_cta" class="secondary-cta">
                    <a class="button" :href="block.secondary_cta_link" :style="{color: block.secondary_cta_text_color, backgroundColor: block.secondary_cta_bg_color, borderColor: block.secondary_cta_bg_color}">
                      {{ block.secondary_cta_text }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="block.type === 'video'" class="item">
            <video preload="none" autoplay="" loop="loop" muted playsinline :poster="block.video_poster">
              <source :src="block.video_url" type="video/mp4">
            </video>
          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </section>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'HeroBanner',
    components: {
      swiper,
      swiperSlide
    },
    data: function () {
      return {
        settings: { blocks: [] },
        swiperOption: {
          slidesPerView: 1,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    mounted () {
      let settingsJson = this.$slots.settings[0].children[0].text
      this.settings = JSON.parse(settingsJson)
    },
    watch: {
      settings () {
        if (this.settings.blocks.length === 1) {
          this.$refs.mySwiper.swiper.pagination.el.remove()
        }
      }
    },
    methods: {
      mobileLink (block) {
        if (block.mobile_link) { return block.mobile_link }
        return 'javascript:;'
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
