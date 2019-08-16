window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

import 'lazysizes';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import 'lazysizes/plugins/respimg/ls.respimg';

import 'swiper/dist/css/swiper.css';
import '../../styles/theme.scss';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';

import Vue from 'vue';

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

