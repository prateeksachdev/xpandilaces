import '../../styles/templates/index.scss'

import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.component('stamped-review', require('../../vue/components/stamped-review.vue').default)
Vue.component('three-item-banner', require('../../vue/components/three-item-banner.vue').default)
Vue.component('icon-swiper', require('../../vue/components/icon-swiper.vue').default)
Vue.component('bottom-banner', require('../../vue/components/bottom-banner.vue').default)

import init from "../../vue/init.js";

init()