'use strict';

define(function(require){
  var model = {};
  model.setupSpread = function(){
    let instructions = document.createElement('h1');
    instructions.innerHTML = 'Click deck to deal';
    instructions.classList.add('instructions');
      // draw spread outline
      model.page = document.querySelector('.page');
      // model.page.classList.remove('shuffle');
      // model.page.classList.add('spread');
      model.page.appendChild(instructions);

    };
    return model;
});
