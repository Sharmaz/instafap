var page = require('page')
var empty = require('empty-element')
var template = require('./template')
var title = require('title')
var request = require('superagent')
var header = require('../header')

page('/user', header, loadUser, function (ctx, next) {
  title('InstaFap')
  var main = document.getElementById('main-container')
  
  empty(main).appendChild(template(ctx.pictures))
})

function loadUser(ctx, next) {
  request
    .get('/api/pictures')
    .end(function(err, res) {
      if (err) return console.log(err)

      ctx.pictures = res.body
      next()
  })
}