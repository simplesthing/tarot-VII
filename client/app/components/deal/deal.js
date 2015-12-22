'use strict';

define(function(require){
  var helper = require('../../modules/helpers/helpers');
  var model = {};
  var positions = [
    {name:'situation'},
    {name: 'obstacle'},
    {name: 'root'},
    {name: 'crown'},
    {name: 'behind'},
    {name: 'ahead'},
    {name: 'self'},
    {name: 'influences'},
    {name: 'hope-fear'},
    {name: 'outcome'}
  ];

  function addCardsToSpread(spread){
    positions.forEach(function(position, i){
      let title = document.createElement('div');
      let card = document.createElement('div');
      card.classList.add('card', 'card--placeholder', 'opacity--zero', position.name);
      title.classList.add('title', 'opacity--zero', position.name);
      title.innerHTML = position.name;
      let _title = title;
      setTimeout(helper.opacityZeroToHundred, 1000, _title);
      let _card = card;
      setTimeout(helper.opacityZeroToHundred, 1000, _card);

      spread.appendChild(card);
      spread.appendChild(title);
    });
  };

  model.setupSpread = function(deck){
    let instructions = document.querySelector('h1');
    let cards = document.querySelectorAll('.card');
    //assign cards array to model
    model.deck = deck;
    //update instructions
    instructions.innerHTML = 'Click deck to deal';
    //move deck into dealing position
    helper.iterateNodes(cards, function(index, value){
      value.style.top = '12%';
      value.style.marginLeft = '5%';
    });
    // draw spread outline
    model.page = document.querySelector('.page');
    model.page.classList.remove('shuffle');
    model.page.classList.add('deal');
    model.spread = document.createElement('section');
    model.spread.classList.add('spread');
    addCardsToSpread(model.spread);
    model.page.appendChild(model.spread);

  };

  return model;
  }
);
