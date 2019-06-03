import '../../styles/templates/product.scss'

import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.component('stamped-review', require('../../vue/components/stamped-review.vue').default)
Vue.component('product-form', require('../../vue/components/product-form.vue').default)
Vue.component('product-gallery', require('../../vue/components/product-gallery.vue').default)
Vue.component('product-swatch', require('../../vue/components/product-swatch.vue').default)

import init from "../../vue/init.js";

init()