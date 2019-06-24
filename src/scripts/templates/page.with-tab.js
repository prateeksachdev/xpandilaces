import '../../styles/sections/how-it-work-tab.scss'
import '../../styles/sections/faq.scss'

import Vue from 'vue'
import init from "../../vue/init.js";

Vue.component('tab-content', require('../../vue/components/tab-content.vue').default)
Vue.component('faq-item', require('../../vue/components/faq-item.vue').default)

init()