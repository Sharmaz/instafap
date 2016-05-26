var yo = require('yo-yo')
// var moment = require('moment')
var translate = require('../translate')


module.exports = function pictureCard(pic) {
  var el

  function render(picture) {
      return yo`<div class="${picture.liked ? 'liked' : ''} col s12 m6 l4">
    <div class="s12 m6 l4">
      <img class="activator userpics" src="${picture.url}">
    </div>
    <div class="s12 m6 l4">
      <p>
        <i class="fa fa-heart left" aria-hidden="true"></i>
        <span class="left likes">${translate.message('likes', { likes: picture.likes} )}</span>
      </p>
    </div>
  </div>`
  }

  el = render(pic)
  return el
}

/*<a href="/user/${picture.user.username}"class="card-title">
        <img src="${picture.user.avatar}" class="avatar"/>
        <span class="username">${picture.user.username}</span>
      </a>
*/