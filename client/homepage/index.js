var page = require('page')
var empty = require('empty-element')
var template = require('./template')
var title = require('title')
var request = require('superagent')
var header = require('../header')
var Webcam = require('webcamjs')
var picture = require('../picture-card')

page('/', header, loadPictures, function (ctx, next) {
  title('InstaFap')
  var main = document.getElementById('main-container')
  
  empty(main).appendChild(template(ctx.pictures))
  
  const picturePreview = $('#picture-preview')
  const camaraInput = $('#camara-input')
  const cancelPicture = $('#cancelPicture')
  const shootButton = $('#shoot')
  const uploadButton = $('#uploadButton')

  function reset() {
    picturePreview.addClass('hide')
    cancelPicture.addClass('hide')
    uploadButton.addClass('hide')
    shootButton.removeClass('hide')
    camaraInput.removeClass('hide')
  }

  cancelPicture.click(reset)

  $('.modal-trigger').leanModal({
    ready: function() {
      Webcam.set({
        width: 320,
        height: 240
      })
      Webcam.attach('#camara-input')
      shootButton.click((ev) => {
        Webcam.snap((data_uri) => {
                picturePreview.html(`<img src="${data_uri}"/>`)
                picturePreview.removeClass('hide')
                cancelPicture.removeClass('hide')
                uploadButton.removeClass('hide')
                shootButton.addClass('hide')
                camaraInput.addClass('hide')
                uploadButton.off('click')
                uploadButton.click(() => {
                  const pic = {
                    url: data_uri,
                    likes: 0,
                    liked: false,
                    createdAt: new Date(),
                    user: {
                      username: 'sharmaz',
                      avatar: 'https://avatars3.githubusercontent.com/u/2711641?v=3&s=460'
                    }
                  }
                  $('#picture-cards').prepend(picture(pic))
                  reset()
                  $('#modalCamara').closeModal()
                })
            })
      })
    },
    complete: function() {
      Webcam.reset()
      reset()
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