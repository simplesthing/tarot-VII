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


  function updateReading(index){
    let reading = document.querySelector('.reading');
    let position = reading.querySelector('.position--'+positions[index].name);
    let positionText = document.createElement('p');

    if(index === 0){
      helper.opacityZeroToHundred(reading);
    }
    //TODO write models for celtic dross possitions
    positionText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius dolor velit, ut eleifend velit mollis et. Duis sollicitudin turpis nibh, vel facilisis est pellentesque et. ';
    position.appendChild(positionText);
    position.classList.add('position--read');
    position.classList.remove('position--placeholder');
  }

  function obstacleDom(obstacleImagePath){
    let spread = document.querySelector('.spread');
    let situation = spread.querySelector('.situation');
    let situationImagePath = '/images/tarot/small/'+ model.deck.data[0].suit + '/' + model.deck.data[0].number + '.png';
    let obstacle = spread.querySelector('.obstacle');
    let mask = document.createElement('div');
    let card = document.createElement('div');
    let face = document.createElement('div');
    mask.classList.add('card', 'card--face', 'mask');
    mask.style.background  = 'transparent url('+situationImagePath+') top center no-repeat';
    mask.style.backgroundSize = '9vmin 19vmin';
    card.classList.add('card');
    card.style.background  = 'transparent url('+situationImagePath+') bottom center no-repeat';
    card.style.backgroundSize = '9vmin 19vmin';
    face.classList.add('card', 'face');
    face.style.background  = 'transparent url('+obstacleImagePath+') center center no-repeat';
    face.style.backgroundSize = '9vmin 19vmin';
    face.style.zIndex = 3;
    mask.appendChild(card);
    obstacle.appendChild(mask);
    obstacle.appendChild(face);
    spread.removeChild(situation);
  }



  function dealCard(evt){
    let deck = document.querySelector('.deck');
    let card = evt.target;
    let index = parseInt(card.dataset.index);
    let data =  model.deck.data[index];
    let position = '.' + positions[index].name;
    let face = document.querySelector(position);
    let imagePath = '/images/tarot/small/'+ data.suit + '/' + data.number + '.png';
    if(index === 0) {
      document.querySelector('.instructions').remove();
    }
    if(index === 1) {
      //  write custom DOM for layered glow on obstacle card
      obstacleDom(imagePath);
    } else {
      face.style.background = 'url('+imagePath+') center center no-repeat';
      face.style.backgroundSize = '9vmin 18vmin';
    }
    face.classList.remove('card--placeholder');
    face.classList.add('card--face');
    deck.removeChild(card);
    model.cards[index+1].addEventListener('click', dealCard, false);
    updateReading(index);
  }

  function setupDeal(){
    let deck = document.querySelector('.deck');
    model.cards = deck.querySelectorAll('.card');
    let it = 0;
    let topcard = model.cards[it];
    topcard.addEventListener('click', dealCard, false);
    helper.iterateNodes(model.cards, function (index, value) {
      //discard all but the first 10 model.cards
      if(index > 9) {
       deck.removeChild(value);
      } else {
        if(index > 0 ){
          //arrange DOM elements so that the zero index first card to be dealt
          let card = deck.removeChild(value);
          topcard = model.cards[it++];
          deck.insertBefore(card, topcard);
        }
      }
    });
  }
  function addReading(){
    let reading = document.createElement('section');
    let list = document.createElement('ul');

    reading.classList.add('reading', 'opacity--zero');


    positions.forEach(function(position, idx){
      let positionPlaceholder = document.createElement('li');
      let positionTitle = document.createElement('h1');
      let positionText = document.createElement('h2');
      positionPlaceholder.classList.add('position', 'position--' + position.name,'position--placeholder');
      positionTitle.innerHTML = position.name;
      //TODO write position text
      positionText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius dolor velit, ut eleifend velit mollis et. Duis sollicitudin turpis nibh, vel facilisis est pellentesque et. ';
      positionPlaceholder.appendChild(positionTitle);
      positionPlaceholder.appendChild(positionText);
      if(idx === 0) {
        list.appendChild(positionPlaceholder);
      } else {
        let firstchild = list.firstChild;
        list.insertBefore(positionPlaceholder, firstchild);
      }
    });

    reading.appendChild(list);
    model.page.appendChild(reading);
  }

  function addCardsToSpread(spread){
    positions.forEach(function(position, i){
      let title = document.createElement('div');
      let card = document.createElement('div');
      card.classList.add('card', 'card--placeholder', 'opacity--zero', position.name);
      title.classList.add('title', 'opacity--zero', position.name);
      title.innerHTML = position.name;
      setTimeout(helper.opacityZeroToHundred, 1000, title);
      setTimeout(helper.opacityZeroToHundred, 750, card);
      spread.appendChild(card);
      spread.appendChild(title);
    });
  }

  model.setupSpread = function(deck){
    let instructions = document.querySelector('h1');
    let cards = document.querySelectorAll('.card');
    model.cards = cards;
    //assign cards array to model
    model.deck = deck;
    //update instructions
    instructions.innerHTML = 'Click deck to deal';
    instructions.classList.add('opacity--zero');
    setTimeout(helper.opacityZeroToHundred, 250, instructions);
    // draw spread outline
    model.page = document.querySelector('.page');
    model.page.classList.remove('shuffle');
    model.page.classList.add('deal');
    model.spread = document.createElement('section');
    model.spread.classList.add('spread');
    addCardsToSpread(model.spread);
    model.page.appendChild(model.spread);
    addReading();
    setupDeal();
  };

  return model;
  }
);
