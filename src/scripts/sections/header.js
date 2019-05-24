import vClickOutside from 'v-click-outside'

(function () {
  Vue.component('height-transition', {
    functional: true,
    render: function (createElement, context) {
      var data = {
        props: {
          name: 'height'
        },
        on: {
          enter (element) {
            element.style.height = 'auto'

            const height = getComputedStyle(element).height
            element.style.height = 0

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height

            // Trigger the animation.
            // We use `setTimeout` because we need
            // to make sure the browser has finished
            // painting after setting the `height`
            // to `0` in the line above.
            setTimeout(() => {
              element.style.height = height
            })
          },

          afterEnter (element) {
            element.style.height = 'auto'
          },

          leave (element) {
            const height = getComputedStyle(element).height

            element.style.height = height

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height

            setTimeout(() => {
              element.style.height = 0
            })
          }
        }
      }
      return createElement('transition', data, context.children)
    }
  })

  document.addEventListener('DOMContentLoaded', function () {

    new Vue({
      el: '#navbar',
      delimiters: ['${', '}'],
      directives: {
        clickOutside: vClickOutside.directive
      },
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
        if (this.$refs.announcement && this.isAnnouncementVisible) {
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
    })

  })
})()
