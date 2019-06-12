import '../../styles/templates/product.full-width-images.scss'

import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.component('cart-control', require('../../vue/components/cart-control.vue').default)
Vue.component('gallery-simple', require('../../vue/components/gallery-simple.vue').default)

import init from "../../vue/init.js";

init()
