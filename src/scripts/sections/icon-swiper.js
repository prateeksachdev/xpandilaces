(function () {
  document.addEventListener('DOMContentLoaded', function () {

    new Vue({
      el: 'section.icon-swiper',
      delimiters: ['${', '}'],
      data: function () {
        return {
          swiperOption: {
            slidesPerView: 5,
            spaceBetween: 30,
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            loop: true,
            breakpoints: {
              // when window width is <= 575px
              575: {
                centeredSlides: true,
                slidesPerView: 2,
                spaceBetween: 20
              },
              // when window width is <= 768px
              768: {
                centeredSlides: true,
                slidesPerView: 1,
                spaceBetween: 30
              }
            }
          }
        }
      }
    })

  })
})()