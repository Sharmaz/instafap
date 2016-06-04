var yo = require('yo-yo')
var layout = require('../layout')
var translate = require('../translate')

module.exports = function userPageTemplate(user) {
  var el = yo`<div class="container user-page">
  <div class="row valign-wrapper">
    <div class="col s6 m5 l5 left">
    <img src="${user.avatar}" class="circle s4 m4 l4 profile-avatar"/>
    </div>
    <div class="col s6 m6 l6 right">
    <span class="profile-username valign">${user.username}</span>
    </div>
  </div>
  <div class="row">
    <div class="col">
    ${user.pictures.map(function(picture) {
      return yo`<div class="col s12 m6 l4">
    <div class="s12 m6 l4">
      <img class="activator userpics" src="${picture.src}" id="${picture.id}"/>
      <div class="s12 m6 l4 user-likes">
        <i class="fa fa-heart left" aria-hidden="true" id="${picture.id}"></i>
        <span class="left likes">${picture.likes}</span>
      </div>
    </div>
  </div>`
      })}
    </div>
  </div>
</div>`




  return layout(el)
}

  