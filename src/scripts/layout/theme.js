import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import 'swiper/dist/css/swiper.css'
import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import '../sections/header';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueAwesomeSwiper, /* { default global options } */);
Vue.use(VueScrollTo);

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (window.navigator.cookieEnabled) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}

