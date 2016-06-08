var page = require('page')
var empty = require('empty-element')
var template = require('./template')
var title = require('title')
var request = require('superagent')
var header = require('../header')
var Webcam = require('webcamjs')

page('/', header, loadPictures, function (ctx, next) {
  title('InstaFap')
  var main = document.getElementById('main-container')
  
  empty(main).appendChild(template(ctx.pictures))
  
  $('.modal-trigger').leanModal({
    ready: function() {
      Webcam.set({
        width: 320,
        height: 240
      })
      Webcam.attach('#camara-input')
    },
    complete: function() {
      Webcam.reset()
    }
  })
})

function loadPictures(ctx, next) {
  request
    .get('/api/pictures')
    .end(function(err, res) {
      if (err) return console.log(err)

      ctx.pictures = res.body
      next()
  })
}