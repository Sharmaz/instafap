var page = require('page')
var empty = require('empty-element')
var template = require('./template')
var title = require('title')
var request = require('superagent')
var header = require('../header')
require('babel-polyfill')

page('/:username', header, loadUser, function (ctx, next) {
  title(`InstaFap - ${ctx.params.username}`)
  var main = document.getElementById('main-container')
  
  empty(main).appendChild(template(ctx.user))
})

async function loadUser(ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then((res) => res.json())
    next()
  } catch (err) {
    console.log(err)
  }
}
