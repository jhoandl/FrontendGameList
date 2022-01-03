/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import axios from 'axios'
import VueGoodTablePlugin from 'vue-good-table';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue-good-table/dist/vue-good-table.css'
// router setup
import router from './routes/router';
import icons from './icons'

const axiosIns = axios.create({
  // You can add your headers here
  baseURL: 'http://localhost:8081',
  // timeout: 1000,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
})

// icons


Vue.prototype.$http = axiosIns
Vue.component('font-awesome-icon', FontAwesomeIcon)
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(axiosIns);
Vue.use(VueGoodTablePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  icons,
  router
});
