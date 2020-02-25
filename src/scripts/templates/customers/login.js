/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

import '../../../styles/templates/login.scss'

import Vue from 'vue'
import init from "../../../vue/init.js";

Vue.component('login', require('../../../vue/components/login.vue').default)

init()