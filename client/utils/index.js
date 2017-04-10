export function onlyTitle (title) {
  // Get title from file name
  return title.replace(/\.md$/, '')
              .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
}

export function onlyDate (title) {
  // Get date from file name
  return /^\d{4}-\d{1,2}-\d{1,2}/.exec(title)[0]
}

export function toTitleCase (title) {
  return title.split(/[- ]/).map(word => {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
  }).join(' ')
}
