import Vue from 'vue'
import App from './App'
import router from './router'
import filter from './utils/filter'

if (process.env.NODE_ENV === 'production') {
  // Enable Progressive Web App
  require('./pwa')
}

filter(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
