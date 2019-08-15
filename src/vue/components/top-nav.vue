<template>
  <nav id="navbar" :class="{ scrollable: isMobileMegaVisible }" class="navbar is-fixed-top rows" role="navigation">
    <slot name="cart"></slot>

    <height-transition>
      <slot name="announcement" v-if="isAnnouncementVisible" :hide="hideAnnouncement"></slot>
    </height-transition>

    <slot name="menu" :showDesktopMega="showDesktopMega" :toggleMobileMega="toggleMobileMega" :toggleSearch="toggleSearch" :showCartDetail="showCartDetail" :vco="vcoCartDetail" :hideCartDetail="hideCartDetail" :isCartDetailVisible="isCartDetailVisible"></slot>

    <transition name="fade">
      <slot name="mobile-mega" v-if="isMobileMegaVisible" :toggleMore="toggleMobileMore" :isMoreExpanded="isMobileMoreExpanded"></slot>
    </transition>

    <transition name="fade">
      <slot name="desktop-mega" v-if="isDesktopMegaVisible" :hide="hideDesktopMega"></slot>
    </transition>

    <transition name="fade">
      <slot name="search-bar" v-if="isSearchVisible"></slot>
    </transition>
  </nav>
</template>

<script>
  import store from '../store'

  export default {
    name: 'TopNav',
    props: {
      isAnnouncementEnabled: Boolean
    },
    data () {
      return {
        isAnnouncementVisible: localStorage.getItem('navbar.isAnnouncementVisible') != 'false',
        isMobileMegaVisible: false,
        isMobileMoreExpanded: false,
        isDesktopMegaVisible: false,
        isSearchVisible: false,
        vcoCartDetail: {
          handler: this.hideCartDetail,
          middleware: this.notCartDetailToggler
        },
        state: store.state
      }
    },
    computed: {
      isCartDetailVisible () {
        return this.state.isCartDetailVisible
      },

      isNewItemShownInCartDrawer () {
        return this.state.isNewItemShownInCartDrawer
      }
    },
    watch: {
      isCartDetailVisible (isVisible) {
        if (isVisible && !this.isNewItemShownInCartDrawer) {
          store.showNewItemInCartDrawer(this.$el.querySelector(".drawer"))
        }
      }
    },
    mounted () {
      let cartJson = this.$slots.cart[0].children[0].text
      store.setCart(JSON.parse(cartJson))

      if (this.isAnnouncementEnabled && this.isAnnouncementVisible) {
        const body = document.body
        body.classList.add('announcement-visible')
      }
    },
    methods: {
      toggleMobileMega () {
        store.hideCartDetail()
        this.isSearchVisible = false
        this.isMobileMegaVisible = !this.isMobileMegaVisible
      },

      toggleMobileMore () {
        this.isMobileMoreExpanded = !this.isMobileMoreExpanded
      },

      showDesktopMega () {
        store.hideCartDetail()
        this.isDesktopMegaVisible = true
      },

      toggleSearch () {
        store.hideCartDetail()

        this.isMobileMegaVisible = false
        this.isSearchVisible = !this.isSearchVisible
      },

      notCartDetailToggler (e) {
        return !e.target.closest('.cart')
      },

      showCartDetail () {
        this.isMobileMegaVisible = false
        this.isSearchVisible = false
        store.showCartDetail()
      },

      hideCartDetail () {
        store.hideCartDetail()
      },

      hideDesktopMega () {
        this.isDesktopMegaVisible = false
      },

      hideAnnouncement () {
        this.isAnnouncementVisible = false

        const body = document.body
        body.classList.remove('announcement-visible')

        localStorage.setItem('navbar.isAnnouncementVisible', 'false')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
