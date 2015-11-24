'use strict';

define(function(require){
  var helper = require('../helpers/helpers');
  var model = {};

  // console.log(helper)

  model.addPopUp = function(elem){
    var el, elPos, div;

    el = document.getElementById(elem);
    elPos = helper.getPosition(el);
    div = document.createElement('div');
    div.style.width ='100px';
    div.style.height ='100px';
    div.style.background ='#ccc';
    div.style.position ='absolute';
    div.style.top = elPos.y +'px';
    div.style.left = elPos.x + 'px';
    div.style.zIndex = '10';
    document.body.appendChild(div);
    // div.setAttribute(id)
    // get exact location of card x and y
    // console.log();
    // determine if element is on left or right side of screen
    // attach a popup div to page


  };

  return model;
});
