'use strict';

define(function(require){
  var model = {};

  model.setupSpread = function(deck){
    let instructions = document.createElement('h1');
    model.deck = deck;
    //console.log(model.deck);
    instructions.innerHTML = 'Click deck to deal';
    instructions.classList.add('instructions');
      // draw spread outline
      model.page = document.querySelector('.page');
      model.page.classList.remove('shuffle');
      model.page.classList.add('deal');
      model.page.appendChild(instructions);
    //  add click event to first
    };
    return model;
});
