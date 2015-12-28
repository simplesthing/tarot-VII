'use strict';

define(function(require){
  var helper = require('../../modules/helpers/helpers');

  var model = {};
  var positions = require('../positions/positions');

  function updateReading(index){
    let reading = document.querySelector('.reading');
    let list = reading.querySelector('ul');
    let position = reading.querySelector('.position--'+positions.data[index].name);
    let read = position.nextSibling;
    if(read) {
      read.classList.add('position--read');
      read.classList.remove('position--placeholder');
    }
    if(index === 0){
      helper.opacityZeroToHundred(reading);
      list.style.top = (list.clientHeight * -1) + 'px';
    }
    let listPosition = helper.getPosition(list);
    list.style.transition = 'top .5s';
    list.style.top = 'calc(' + (listPosition.y + position.offsetHeight) + 'px +  1.5em)';
  }

  function challengeDom(challengeImagePath){
    let spread = document.querySelector('.spread');
    let situation = spread.querySelector('.situation');
    let situationImagePath = '/images/tarot/small/'+ model.deck.data[0].suit + '/' + model.deck.data[0].number + '.png';
    let challenge = spread.querySelector('.challenge');
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
    face.style.background  = 'transparent url('+challengeImagePath+') center center no-repeat';
    face.style.backgroundSize = '9vmin 19vmin';
    face.style.zIndex = 3;
    mask.appendChild(card);
    challenge.appendChild(mask);
    challenge.appendChild(face);
    spread.removeChild(situation);
  }



  function dealCard(evt){
    let deck = document.querySelector('.deck');
    let card = evt.target;
    let index = parseInt(card.dataset.index);
    let data =  model.deck.data[index];
    let position = '.' + positions.data[index].name;
    let face = document.querySelector(position);
    let imagePath = '/images/tarot/small/'+ data.suit + '/' + data.number + '.png';
    if(index === 0) {
      document.querySelector('.instructions').remove();
    }
    if(index === 1) {
      //  write custom DOM for layered glow on challenge card
      challengeDom(imagePath);
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




  function setupReading(){
    let reading = document.createElement('section');
    let list = document.createElement('ul');
    //reading.classList.add('reading');
    reading.classList.add('reading', 'opacity--zero');
    positions.data.forEach(function(position, idx){
      let positionPlaceholder = document.createElement('li');
      let positionTitle = document.createElement('h1');
      let positionText = document.createElement('p');
      let card = model.deck.data[idx].name;
      let cardName = document.createElement('h2');
      let cardText = document.createElement('p');
      cardName.innerHTML = card;
      positions.getReading(position.name, card).then(function(data){
        cardText.innerHTML = data;
      });
      positionText.classList.add('position-text');
      positionPlaceholder.classList.add('position', 'position--' + position.name,'position--placeholder');
      positionTitle.innerHTML = position.name;
      positionText.innerHTML = positions.data[idx].meaning;
      positionPlaceholder.appendChild(positionTitle);
      positionPlaceholder.appendChild(positionText);
      positionPlaceholder.appendChild(cardName);
      positionPlaceholder.appendChild(cardText);


      if(idx === 0) {
        list.appendChild(positionPlaceholder);
      } else {
        let firstchild = list.firstChild;
        list.insertBefore(positionPlaceholder, firstchild);
      }
    });
    reading.appendChild(list);
    model.page.appendChild(reading);
    list.style.position = 'absolute';
    list.style.top = reading.clientHeight * 5 + 'px';
  }

  function addCardsToSpread(spread){
    positions.data.forEach(function(position, i){
      let card = document.createElement('div');
      card.classList.add('card', 'card--placeholder', 'opacity--zero', position.name);
      setTimeout(helper.opacityZeroToHundred, 750, card);
      spread.appendChild(card);
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
    setupReading();
    setupDeal();
  };

  return model;
  }
);
