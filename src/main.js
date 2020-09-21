// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './base.css'
import './public_css.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import store from './store.js'


import 'font-awesome/css/font-awesome.min.css'
// 引入屏幕适配工具
import "../src/utils/flexible"

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  NProgress.start()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //当返回信息为未登录或者登录失效的时候重定向为登录页面
  if (response.data.code == '1009') {
    router.push({
      path: "/",
      // query: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
    })
  }
  NProgress.done()
  return response
},
 function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});

// 引入全局自定义指令验证,进行按钮权限控制
Vue.directive('hasPermission', (el, binding)=> {
  const permissions = sessionStorage.getItem('PERMISSIONS')
  if(!permissions.includes(binding.value)) {
    el.style.display  = "none"
  }else {
    el.style.visibility = "visible"
  }
})

Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs //全局注册，使用方法为:this.qs
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
