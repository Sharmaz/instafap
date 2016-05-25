var page = require('page')
var empty = require('empty-element')
var template = require('./template')
var title = require('title')


page('/', function (ctx, next) {
  title('InstaFap')
  var main = document.getElementById('main-container')
  var pictures = [ 
    {
      user:{
        username: 'sharmaz',
        avatar: 'https://avatars3.githubusercontent.com/u/2711641?v=3&s=460'
      },
      url: 'office.jpg',
      likes: 10,
      liked: false,
      createdAt: new Date()
    },
    {
      user:{
        username: 'sharmaz',
        avatar: 'https://avatars3.githubusercontent.com/u/2711641?v=3&s=460'
      },
      url: 'office.jpg',
      likes: 4,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ]
  empty(main).appendChild(template(pictures))
})