'use strict';

define(function (require) {
  var helper = require('../helpers/helpers');

  function Popup() {
    var model = {};
    // popup defaults
    model.container = document.createElement('div');
    model.container.classList.add('popup');
    model.container.style.position = 'absolute';
    model.container.style.zIndex = '10';
    // content
    model.content = document.createElement('div');
    model.content.classList.add('popup__content');
    // pointer
    model.pointer = document.createElement('span');
    model.pointer.classList.add('popup__pointer');
    // close button
    model.close = document.createElement('span');
    model.close.classList.add('popup__close', 'fa', 'fa-times');
    // build popup
    model.content.appendChild(model.close);
    model.container.appendChild(model.content);
    model.container.appendChild(model.pointer);
    // return popup
    return model;
  }

  function destroyPopup() {
    document.body.removeChild(this.popup.container);
    delete this.popup;
  }

  return {
    addPU: function addPU(elem) {
      var el = document.getElementById(elem),
          elPos = helper.getPosition(el),
          winWidth = window.innerWidth,
          pointerWidth = 15,
          margin = 20,
          contentWidth = winWidth / 2 - pointerWidth - margin,
          side = elPos.x > winWidth / 2 - 100 ? 'left' : 'right',
          offsetLeft = side === 'left' ? -contentWidth - pointerWidth - margin / 2 - 2 : 100 + margin / 2;

      if (this.popup) {
        destroyPopup.call(this);
      }
      this.popup = new Popup();

      // position popup
      this.popup.container.style.width = contentWidth + pointerWidth + 'px';
      this.popup.container.style.top = elPos.y + 'px';
      this.popup.container.style.left = elPos.x + offsetLeft + 'px';
      this.popup.container.classList.add('popup--' + side);
      // content width
      this.popup.content.style.width = contentWidth + 'px';
      // bind close event
      this.popup.close.addEventListener('click', this.closePU.bind(this, false));
      document.body.appendChild(this.popup.container);
    },
    closePU: function closePU() {
      destroyPopup.call(this);
    }
  };
});