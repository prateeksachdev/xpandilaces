/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

import '../../../styles/templates/addresses.scss'

import Vue from 'vue'
import init from "../../../vue/init.js";

Vue.component('addresses', require('../../../vue/components/addresses.vue').default)
Vue.component('address-item', require('../../../vue/components/address-item.vue').default)

init()

