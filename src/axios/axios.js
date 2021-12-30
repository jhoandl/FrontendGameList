/* eslint-disable arrow-parens */
import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  baseURL: 'http://localhost:8081',
  // timeout: 1000,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
})


Vue.prototype.$http = axiosIns

export default axiosIns
