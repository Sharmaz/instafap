var yo = require('yo-yo')
var layout = require('../layout')
var picture = require('../profile')
var translate = require('../translate')
var request = require('superagent')

module.exports = function(pictures) {
  var el = yo`<div class="container timeline">
  <div class="row valign-wrapper">
    <div class="col s6 m5 l5 left">
    <img src="${pictures[0].user.avatar}" class="circle s4 m4 l4 profile-avatar"/>
    </div>
    <div class="col s6 m6 l6 right">
    <span class="profile-username valign">${pictures[0].user.username}</span>
    </div>
  </div>
  <div class="row">
    <div class="col">
    ${pictures.map(function(pic) {
      return picture(pic)
      })}
    </div>
  </div>
</div>`

  return layout(el)
}