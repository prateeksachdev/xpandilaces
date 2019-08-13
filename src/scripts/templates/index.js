import '../../styles/templates/index.scss'

import Vue from 'vue'

Vue.component('stamped-review', require('../../vue/components/stamped-review.vue').default)
Vue.component('three-item-banner', require('../../vue/components/three-item-banner.vue').default)
Vue.component('icon-swiper', require('../../vue/components/icon-swiper.vue').default)
Vue.component('bottom-banner', require('../../vue/components/bottom-banner.vue').default)

import init from "../../vue/init.js";

init()