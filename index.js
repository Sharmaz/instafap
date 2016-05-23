'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var server

app.set('view engine', 'pug')

app.get('/', function(req, res) {
  res.render('index')
})

server = app.listen(port, function (err) {
  if (err) return console.log('Error'), process.exit(1)

  console.log('InstaFap Listen in PORT 3000')
})