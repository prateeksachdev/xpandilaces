<template>
  <nav id="navbar" :class="{ scrollable: isMobileMegaVisible }" class="navbar is-fixed-top rows" role="navigation">
    <height-transition>
      <slot name="announcement" v-if="isAnnouncementVisible" :hide="hideAnnouncement"></slot>
    </height-transition>

    <slot name="menu" :showDesktopMega="showDesktopMega" :toggleMobileMega="toggleMobileMega" :toggleSearch="toggleSearch" :toggleCartDetail="toggleCartDetail"></slot>

    <transition name="fade">
      <slot name="mobile-mega" v-if="isMobileMegaVisible" :toggleMore="toggleMobileMore" :isMoreExpanded="isMobileMoreExpanded"></slot>
    </transition>

    <transition name="fade">
      <slot name="desktop-mega" v-if="isDesktopMegaVisible" :hide="hideDesktopMega"></slot>
    </transition>

    <transition name="fade">
      <slot name="cart-detail" v-if="isCartDetailVisible" :vco="vcoCartDetail" :hide="hideCartDetail"></slot>
    </transition>

    <transition name="fade">
      <slot name="search-bar" v-if="isSearchVisible"></slot>
    </transition>
  </nav>
</template>

<script>
  export default {
    name: 'TopNav',
    data () {
      return {
        isAnnouncementVisible: localStorage.getItem('navbar.isAnnouncementVisible') != 'false',
        isMobileMegaVisible: false,
        isMobileMoreExpanded: false,
        isDesktopMegaVisible: false,
        isSearchVisible: false,
        isCartDetailVisible: false,
        vcoCartDetail: {
          handler: this.hideCartDetail,
          middleware: this.notCartDetailToggler
        }
      }
    },
    mounted () {
      if (this.isAnnouncementVisible) {
        const body = document.body
        body.classList.add('announcement-visible')
      }
    },
    methods: {
      toggleMobileMega () {
        this.isCartDetailVisible = false
        this.isSearchVisible = false
        this.isMobileMegaVisible = !this.isMobileMegaVisible
      },

      toggleMobileMore () {
        this.isMobileMoreExpanded = !this.isMobileMoreExpanded
      },

      showDesktopMega () {
        this.isDesktopMegaVisible = true
      },

      toggleSearch () {
        this.isMobileMegaVisible = false
        this.isCartDetailVisible = false
        this.isSearchVisible = !this.isSearchVisible
      },

      notCartDetailToggler (e) {
        return !e.target.closest('.cart')
      },

      toggleCartDetail () {
        this.isMobileMegaVisible = false
        this.isSearchVisible = false
        this.isCartDetailVisible = !this.isCartDetailVisible
      },

      hideCartDetail () {
        this.isCartDetailVisible = false
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
