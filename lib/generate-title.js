const striptags = require('striptags')
const trimRight = require('trim-right')
const trimLeft = require('trim-left')

/**
 *  Generate the required atom title for a JSON feed item
 * @param {object} item A parsed JSON feed item
 * @return {string} A title for the item
 */
module.exports = function generateTitle (item) {
  // A fairly arbitrary attempt at generating titles.
  // Ideally your JSON feed includes a title for every post. Most UI's will look strange without it
  if (item.title) return item.title
  if (item.summary) return truncate(cleanWhitespace(item.summary))
  if (item.content_text) return truncate(cleanWhitespace(item.content_text))
  if (item.content_html) return truncate(cleanWhitespace(striptags(item.content_html)))
  throw new Error('jsonfeed-to-atom: can\'t generate a title for entry ' + item.id)
}

/**
 * Removes title unfriendly whitespace
 * @param {string} str The string you want cleaned up
 * @return {string} The first line of the string without any padding
 */
function cleanWhitespace (str) {
  return trimLeft(trimRight(str.split('\n')[0]))
}

/**
 * Truncate a string to 100 characters with an ellipsis
 * @param {string} string The string you want truncated
 * @returns {string} The truncated string
 */
function truncate (string) {
  return string.length > 100 ? string.slice(0, 100) + '…' : string
}
