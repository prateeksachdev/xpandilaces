import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import vClickOutside from 'v-click-outside'

import TopNav from './components/top-nav.vue'
import HeightTransition from './components/height-transition.vue'
import CartDrawer from './components/cart-drawer.vue'
import CartCount from './components/cart-count.vue'

export default function init (pageComponents) {
  Vue.use(VueScrollTo)

  if (!pageComponents) {
    pageComponents = {}
  }

  let layoutComponents = {
    HeightTransition,
    TopNav,
    CartDrawer,
    CartCount
  }
  let components = Object.assign(layoutComponents, pageComponents)

  new Vue({
    el: '#app',
    components: components,
    directives: {
      clickOutside: vClickOutside.directive
    },
    delimiters: ["${","}"],
    mounted () {
      window.lazySizes.init()
    }
  })
}
