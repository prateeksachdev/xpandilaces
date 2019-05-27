document.addEventListener('DOMContentLoaded', function () {

  let elements = document.getElementsByClassName('faq-item')
  for (let faqitem of elements) {
  	new Vue({
      el: faqitem,
      delimiters: ['${', '}'],
      data: function () {
        return {
          isItemVisible: false,
        }
      },
      methods: {
        toggleFaq () {
          this.isItemVisible = !this.isItemVisible
        },
      },
    })
  }

})