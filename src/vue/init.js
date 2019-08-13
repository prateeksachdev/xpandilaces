import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import vClickOutside from 'v-click-outside'

import TopNav from './components/top-nav.vue'
import HeightTransition from './components/height-transition.vue'

export default function bootstrap () {
  Vue.use(VueScrollTo)
  Vue.component('height-transition', HeightTransition)
  Vue.component('top-nav', TopNav)
  Vue.component('cart-drawer', require('./components/cart-drawer.vue').default)
  Vue.component('cart-count', require('./components/cart-count.vue').default)

  new Vue({
    el: '#app',
    directives: {
      clickOutside: vClickOutside.directive
    },
    delimiters: ["${","}"],
    mounted () {
      window.lazySizes.init()
    }
  })
}
