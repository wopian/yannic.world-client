import Vue from 'vue'
import Router from 'vue-router'
import List from 'components/List.vue'
import Post from 'components/Post.vue'

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
      path: '/post/:hash',
      name: 'post',
      component: Post
    }
  ]
})
