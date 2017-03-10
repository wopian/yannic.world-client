import Vue from 'vue'
import Router from 'vue-router'
import List from 'components/List'
import Post from 'components/Post'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/:hash',
      name: 'post',
      component: Post
    }
  ]
})
