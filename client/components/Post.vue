<template lang='pug'>
  main.post-view.container
    h1.post-title {{ title }}
      time.post-date(
        pubdate='pubdate'
        v-bind:datetime='this.date | formatDate'
        v-bind:title='this.date | formatDate'
      ) {{ this.date | timeago }}
    article(v-if='content' v-html='htmlFromMarkdown')
    div(v-else) Loading...
</template>

<script>
  import Vue from 'vue'
  import api from 'client/api'
  import config from 'client/config'
  import fm from 'front-matter'
  import marked from 'client/utils/render'

  export default {
    name: 'postView',
    data () {
      return {
        title: '',
        date: null,
        content: ''
      }
    },
    computed: {
      htmlFromMarkdown () {
        return marked(this.content)
      }
    },
    created () {
      this.loadPost()
    },
    methods: {
      loadPost () {
        api.getDetail(this.$route.params.hash)
          .then(text => {
            // Parse front-matter
            // github.com/jxson/front-matter#fmstring
            const content = fm(text)
            this.content = content.body
            this.title = content.attributes.title
            this.date = content.attributes.date
            // Set window title
            window.document.title = `${this.title} - ${config.blogTitle}`
          })
          .catch(err => {
            console.error(err)
            this.$router.replace('/')
          })
      },
      newTab () {
        Vue.nextTick(() => {
          // Load external link in new newTab
          const linksArray = Array.from(document.querySelectorAll('a'))
          const currentHost = window.location.host
          linksArray.forEach(el => {
            if (el.href && el.host !== currentHost) {
              el.target = '_blank'
              el.ref = 'noopener noreferrer'
            }
          })
        })
      }
    },
    watch: {
      'htmlFromMarkdown': 'newTab'
    }
  }
</script>
