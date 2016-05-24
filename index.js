'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

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

server = app.listen(port, function (err) {
  if (err) return console.log('Error'), process.exit(1)

  console.log('InstaFap Listen in PORT 3000')
})