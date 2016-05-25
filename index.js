'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var multer = require('multer')
var ext = require('file-extension')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('picture')


var server

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('index', { title: 'InstaFap' })
})

app.get('/signup', function(req, res) {
  res.render('index', { title: 'InstaFap - SignUp' })
})

app.get('/signin', function(req, res) {
  res.render('index', { title: 'InstaFap - SignIn' })
})

app.get('/api/pictures', function(req, res, next) {
  var pictures = [ 
    {
      user:{
        username: 'sharmaz',
        avatar: 'https://avatars3.githubusercontent.com/u/2711641?v=3&s=460'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user:{
        username: 'sharmaz',
        avatar: 'https://avatars3.githubusercontent.com/u/2711641?v=3&s=460'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ]
  setTimeout(function() {
    res.send(pictures)

  },2000)
})

app.post('/api/pictures', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.send(500, "Error Uploading File")
    }
    res.send('File uploaded')
  })
})

server = app.listen(port, function (err) {
  if (err) return console.log('Error'), process.exit(1)

  console.log('InstaFap Listen in PORT 3000')
})