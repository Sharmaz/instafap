'use strict'

const express = require('express')
const port = process.env.PORT || 5050
var multer = require('multer')
var ext = require('file-extension')
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var passport = require('passport')
var config = require('./config')
var instafap = require('instafap-client')
var auth = require('./auth')

var client = instafap.createClient(config.client)

var s3 = new aws.S3({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey
})

var storage = multerS3({
  s3: s3,
  bucket: 'instafap',
  acl: 'public-read',
  metadata: function(req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function(req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

/*
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
*/

var upload = multer({ storage: storage }).single('picture')

const app = express()

app.set(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')

app.use(express.static('public'))

passport.use(auth.localStrategy)
passport.use(auth.facebookStrategy)
passport.deserializeUser(auth.deserializeUser)
passport.serializeUser(auth.serializeUser)

app.get('/', function(req, res) {
  res.render('index', { title: 'InstaFap' })
})

app.get('/signup', function(req, res) {
  res.render('index', { title: 'InstaFap - SignUp' })
})

app.post('/signup', function(req, res) {
  var user = req.body
  client.saveUser(user, function(err, usr) {
    if (err) return res.status(500).send(err.message)

    res.redirect('/signin')
  })
})

app.get('/signin', function(req, res) {
  res.render('index', { title: 'InstaFap - SignIn' })
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}))

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: 'signin'
}))

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.status(401).send({ error: 'not authenticated' })
}

app.get('/api/pictures', function(req, res, next) {
  setTimeout(function() {
    res.send(pictures)
  },500)
})

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
  },
  {
    user:{
      username: 'sharmaz',
      avatar: 'https://avatars3.githubusercontent.com/u/2711641?v=3&s=460'
    },
    url: 'office.jpg',
    likes: 1,
    liked: true,
    createdAt: new Date().setDate(new Date().getDate() - 12)
  }
]

app.post('/api/pictures', ensureAuth, function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.send(500, "Error Uploading File")
    }
    res.send('File uploaded')
  })
})

app.get('/api/user/:username', function (req, res) {
  const user = {
    username: 'sharmaz',
    avatar: 'https://avatars3.githubusercontent.com/u/2711641?v=3&s=460',
    pictures: [
      {
        id: 1,
        src: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e15/11202982_836063153143271_896041128_n.jpg',
        likes: 3
      },
      {
        id: 2,
        src: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e15/11195843_359547577569706_1093189504_n.jpg',
        likes: 5
      },
      {
        id: 3,
        src: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e15/11203440_1622018988021771_1437211436_n.jpg',
        likes: 23
      },
      {
        id: 4,
        src: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e15/11203293_467357133421593_1900711866_n.jpg',
        likes: 10
      },
      {
        id: 5,
        src: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e15/11192793_897328383639687_1012861450_n.jpg',
        likes: 2
      },
      {
        id: 6,
        src: 'https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e15/11184439_354442844751974_1642182317_n.jpg',
        likes: 7
      },
    ] 
  }
  setTimeout(function() {
    res.send(user)
  }, 500)
  
})

app.get('/:username', function(req, res, next) {
  var user = req.params.username
  res.render('index', { title: 'Instafap - ${user}', username: user })

})

app.get('/:username/:id', function(req, res, next) {
  var user = req.params.username
  res.render('index', { title: 'Instafap - ${user}', username: user })

})

app.listen(port, function (err) {
  if (err) return console.log('Error'), process.exit(1)

  console.log(`InstaFap Listen in PORT ${port}`)
})