import marked from 'marked'
import Prism from 'prismjs'

// github.com/chjj/marked#overriding-renderer-methods
const renderer = new marked.Renderer()

renderer.heading = (text, level) => {
  // modify anchor tag for Non-English languages
  const slug = text.replace(/<(?:.|\n)*?>/gm, '').toLowerCase().replace(/[\s\n\t]+/g, '-')
  return `<h${level} id='${slug}'>${text}</h${level}>`
}

renderer.code = (code, lang) => {
  // highlight code blocks
  const highlight = Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript)
  return `<pre><code class='lang-${escape(lang, true)}'>${highlight}</code></pre>`
}

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
})

export default marked
