(function () {
  document.addEventListener('DOMContentLoaded', function () {

    new Vue({
      el: '.bottom-banner',
      delimiters: ['${', '}'],
      data () {
        return {
          isBottomBannerVisible: localStorage.getItem('isBottomBannerVisible') != 'false',
        }
      },
      methods: {
        hideBottomBanner() {
          this.isBottomBannerVisible = false
          localStorage.setItem('isBottomBannerVisible', 'false')
        }
      }
    })

  })
})()
