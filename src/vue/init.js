import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import vClickOutside from 'v-click-outside'

export default function bootstrap () {
  Vue.use(VueScrollTo)
  Vue.component('height-transition', require('./components/height-transition.vue').default)
  Vue.component('top-nav', require('./components/top-nav.vue').default)
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
