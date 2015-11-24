'use strict';

define(function(require){
  var helper = require('../helpers/helpers');
  var model = {};

  function Popup(){
    let outer = document.createElement('div');
    outer.style.width = (window.innerWidth/2)+'px';
    outer.classList.add('card-popup');

    let inner = document.createElement('div');
    inner.classList.add('card-popup__inner');

    let pointer = document.createElement('span');
    pointer.classList.add('card-popup__pointer');

    outer.appendChild(inner);
    outer.appendChild(pointer);

    return outer;
  }

  model.addPopUp = function(elem){
    var el, elPos, popup, offsetLeft;

    // get exact location of card x and y
    el = document.getElementById(elem);
    elPos = helper.getPosition(el);

    // determine if element is on left or right offsetLeft of screen
    offsetLeft = (elPos.x >  window.innerWidth/2) -100 ? -window.innerWidth/2:  100 ;

    popup = new Popup();
    // popup = document.createElement('div');
    popup.style.width = (window.innerWidth/2)+'px';
    // popup.classList.add('card-popup');

    popup.style.position ='absolute';
    popup.style.top = elPos.y +'px';

    popup.style.left = (elPos.x + offsetLeft) + 'px';

    popup.style.zIndex = '10';
    document.body.appendChild(popup);


      // attach a popup div to page


    };

    return model;
  });
