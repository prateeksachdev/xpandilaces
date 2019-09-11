import '../../styles/templates/index.scss'

import StampedReview from '../../vue/components/stamped-review.vue'
import ThreeItemBanner from '../../vue/components/three-item-banner.vue'
import IconSwiper from '../../vue/components/icon-swiper.vue'
import BottomBanner from '../../vue/components/bottom-banner.vue'
import HeroBanner from '../../vue/components/hero-banner.vue'
import { swiperSlide } from 'vue-awesome-swiper'

import init from '../../vue/init.js'

init({
  StampedReview,
  ThreeItemBanner,
  swiperSlide,
  IconSwiper,
  BottomBanner,
  HeroBanner
})