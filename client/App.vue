<template>
  <div id="app">
    <header class='header'>
      <router-link to='/'>{{ title }}</router-link>
      <div style='clear: both'></div>
      <search-bar></search-bar>
    </header>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<style lang='sass' src='client/style/index.sass'></style>

<script>
import config from 'client/config'
import footerBar from 'components/footerBar.vue'
import searchBar from 'components/searchBar.vue'

export default {
  name: 'app',
  components: {
    footerBar,
    searchBar
  },
  data () {
    return {
      title: config.blogTitle
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
