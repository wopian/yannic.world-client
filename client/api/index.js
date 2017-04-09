import axios from 'axios'
import fm from 'front-matter'
import 'es6-promise/auto'
import config from 'client/config'
import { onlyTitle, onlyDate } from 'client/utils'

function getListUrl () {
  // Format GitHub API url for content getListUrl
  let url = `https://api.github.com/repos/${config.repo}/contents/`
  if (config.path) url += config.path
  if (config.branch) url += `?ref=${config.branch}`
  return url
}

function getPostUrl (hash) {
  // Format GitHub API url for file contents
  return `https://api.github.com/repos/${config.repo}/git/blobs/${hash}`
}

const Cache = {
  // Cache processor
  get: (key) => {
    if (!window.sessionStorage) return false
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) return false
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => {
    return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
  }
}

const getPostSummary = async (sha) => {
  let res = await axios.get(getPostUrl(sha))
  let content = fm(await atob(await res.data.content))
  let synopsis = content.attributes.synopsis
  let author = content.attributes.author
  let image = content.attributes.image
  return { synopsis, author, image }
}

export default {
  async getList () {
    if (await Cache.has('list')) {
      // Read from Cache
      return Promise.resolve(Cache.get('list'))
    } else {
      const list = []

      let res = await axios.get(getListUrl())
      res = await res.data

      for (let post of await res) {
        let attributes = await getPostSummary(post.sha)
        await list.push({
          title: onlyTitle(post.name),
          date: onlyDate(post.name),
          sha: post.sha,
          size: post.size,
          content: attributes.synopsis,
          author: attributes.author,
          image: attributes.image
        })
      }

      // Save to cache
      Cache.set('list', list)

      return list
    }
  },
  getDetail (hash) {
    const httpOpts = {
      headers: { Accept: 'application/vnd.github.v3.raw' }
    }
    const cacheKey = `post.${hash}`
    if (Cache.has(cacheKey)) {
      // Read from cacheKey
      return Promise.resolve(Cache.get(cacheKey))
    } else {
      return axios.get(getPostUrl(hash), httpOpts)
        .then(res => res.data)
        .then(content => {
          // Save into cacheKey
          Cache.set(cacheKey, content)
          return content
        })
    }
  }
}
