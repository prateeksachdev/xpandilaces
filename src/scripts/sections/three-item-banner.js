import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

(function () {
  Vue.use(VueAwesomeSwiper, /* { default global options } */)

  document.addEventListener('DOMContentLoaded', function () {

    new Vue({
      el: '.three-item-banner',
      delimiters: ['${', '}'],
      data: function () {
        return {
          swiperOption: {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            breakpoints: {
              // when window width is <= 575px
              575: {
                centeredSlides: true,
                slidesPerView: 2,
                spaceBetween: 20
              },
              // when window width is <= 768px
              768: {
                centeredSlides: false,
                slidesPerView: 2,
                spaceBetween: 30
              }
            }
          }
        }
      }
    })

  })
})()