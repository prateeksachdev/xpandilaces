import '../../styles/templates/product.scss'

import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.component('stamped-review', require('../../vue/components/stamped-review.vue').default)
Vue.component('product-form', require('../../vue/components/product-form.vue').default)
Vue.component('product-gallery', require('../../vue/components/product-gallery.vue').default)
Vue.component('product-swatch', require('../../vue/components/product-swatch.vue').default)
Vue.component('tab-content', require('../../vue/components/tab-content.vue').default)

import init from "../../vue/init.js";

init()

// Hack around Stamped Review to make it look nicer
window.addEventListener('DOMContentLoaded', function(){
  var title = $('h1').text();

  $(".stamped-header-title").text(title).css('display','block');
  $(".stamped-thumbs-up").prepend("HELPFUL ");
  $(".stamped-thumbs-down").prepend(" NOT HELPFUL ");
  if ($(".stamped-rating-holder").html()){
    $(".stamped-rating-holder").html($(".stamped-rating-holder").html().split("Was this review helpful?").join(""));
  }
  $(".verified-badge").html("<i class='stamped-fa stamped-fa-check-circle'></i>");
  $(".summary-rating-title:contains('5')").html('<span>5 <i class="stamped-fa stamped-fa-star"></i></span>');
  $(".summary-rating-title:contains('4')").html('<span>4 <i class="stamped-fa stamped-fa-star"></i></span>');
  $(".summary-rating-title:contains('3')").html('<span>3 <i class="stamped-fa stamped-fa-star"></i></span>');
  $(".summary-rating-title:contains('2')").html('<span>2 <i class="stamped-fa stamped-fa-star"></i></span>');
  $(".summary-rating-title:contains('1')").html('<span>1 <i class="stamped-fa stamped-fa-star"></i></span>');
  $(".stamped-share-wrapper").html('<span class="recommends"><i class="stamped-fa stamped-fa-check-circle"></i> recommends xpand laces</span>');
  $('label[for="stamped-sort-select"]').prepend("<span>sort by: </span>");
  var rating_count = $('.stamped-summary-ratings').attr('data-count');
  $('.stamped-summary-ratings').prepend("<span class='rating-count'>" + rating_count + " </span><span class='rating-count'>REVIEWS</span>");
  var arrMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  $(".created").each(function(){
    var date = $(this).text();
    var splitter = date.split("/");
    var month = splitter[0];
    var monthName = arrMonth[parseInt(month) - 1];
    var newFormat = monthName + " " + splitter[1] + ", " + splitter[2];
    $(this).text(newFormat);
    $(".stamped-share-wrapper").html('<span class="recommends"><i class="stamped-fa stamped-fa-check-circle"></i> recommends xpand laces</span>');
  })

  $("div[data-widget-type='site-badge']").click(function(){
    $('html, body').animate({
      scrollTop: $("ul.head-tabs").offset().top - 100
    }, 500, 'linear');
    $("ul.head-tabs li[data-tab='tab3']").click();
  });


  $(document).ajaxSuccess(function(data, textStatus, request) {
    if (request.url.indexOf('https://stamped.io/api/widget') != -1) {
      setTimeout(function(){
        $("#stamped-sort-select").removeAttr('disabled');
        $(".stamped-messages").show({height: 'auto'});
        if ($(".stamped-thumbs-up").length == 0) {
          $("#stamped-sort-select").attr('disabled', 'disabled');
          $('label[for="stamped-sort-select"]').prepend("<span>sort by: </span>");
          $(".stamped-messages").css({height: '100'});
          return;
        }
        if ($(".stamped-thumbs-up").text().indexOf('HELPFUL') == -1){
          $(".stamped-thumbs-up").prepend("HELPFUL ");
          $(".stamped-thumbs-down").prepend(" NOT HELPFUL ");
          $(".stamped-share-wrapper").html('<span class="recommends"><i class="stamped-fa stamped-fa-check-circle"></i> recommends xpand laces</span>');
          $('label[for="stamped-sort-select"]').prepend("<span>sort by: </span>");

          if ($(".stamped-rating-holder").html()){
            $(".stamped-rating-holder").html($(".stamped-rating-holder").html().split("Was this review helpful?").join(""));
          }

          $(".verified-badge").html("<i class='stamped-fa stamped-fa-check-circle'></i>");
          $(".created").each(function(){
            date = $(this).text();
            splitter = date.split("/");
            month = splitter[0];
            monthName = arrMonth[parseInt(month) - 1];
            newFormat = monthName + " " + splitter[1] + ", " + splitter[2];
            $(this).text(newFormat);
            $(".stamped-share-wrapper").html('<span class="recommends"><i class="stamped-fa stamped-fa-check-circle"></i> recommends xpand laces</span>');
          })
        }
      }, 200);
    }
  });

  $('.stamped-summary-actions-newreview').on('click', function() {
    var target = $('.new-review-form');
    if (target.attr('style') !== 'display: none;')
    {
        var top = target.offset().top;
        $('html,body').animate({scrollTop: target.offset().top - 100}, 300);
        return false;
    }
  });
});