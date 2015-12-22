'use strict';

define(function(require){
  var helper = require('../../modules/helpers/helpers');
  var _cards = require('../cards/cards');
  var dealer = require('../deal/deal');
  var deck = document.querySelector('.deck');

  var Shuffle = function(){
      let model = {},
        cuts = 0;
    //STACK DECK
    function stackCut(top, bottom){
      let marginLeft = ((window.innerWidth/78))/2;
      top.forEach(function(card){
        card.style.left = '0%';
        //card.style.marginLeft = Math.round(marginLeft) + '%';
      });
      bottom.forEach(function(card){
        card.style.left = '0%';
        //card.style.marginLeft = Math.round(marginLeft) + '%';
      });
      //if(cuts < 3) {
      //  setTimeout(shuffleCards, 500, 3);
      //} else {
        let cards = document.querySelectorAll('.card');
        helper.iterateNodes(cards, function(index, value){
          value.removeEventListener('click', cutCards);
        });

        dealer.setupSpread(_cards);
      //}
    }
    //SPLIT AND CONCAT CARDS ARRAY AT CUT
    function cutCardData(index){
      let bottom = _cards.data.slice(0,index),
          top = _cards.data.slice(index, _cards.data.length).reverse();
      _cards.data = top.concat(bottom);
    }
    //CUT CARDS
    function cutCards(evt){
      evt.preventDefault();
      evt.stopPropagation();
      cuts++;
      let cards = document.querySelectorAll('.card'),
          cut = evt.target.dataset.index,
          topStack = helper.getPosition(cards[cards.length -10]),
          bottomStack = helper.getPosition(cards[10]),
          bottom = [],
          top = [];
      // cut cards into top and bottom stacks
      helper.iterateNodes(cards, function(index, value){
        if(index < cut) {
          // move cards to the left of the clicked card
          value.style.top = bottomStack.y+ 'px';
          value.style.left = bottomStack.x +'px';
          bottom.push(value);
        } else {
          // move cards to the right of clicked card
          value.style.top = topStack.y+ 'px';
          value.style.left = topStack.x +'px';
          top.push(value);
        }
      });
      // cut _cards.data
      cutCardData(cut);
      updateInstructions();
      setTimeout(stackCut, 500, top, bottom);
    }
    //LINE CARDS UP
    function lineUpCards(index, value){
      value.style.top = '12%';
      value.style.left = index *1 + '%';
      value.style.transform = 'rotate(0deg)';
      value.style.marginLeft = '5%';
    }
    //SPREAD CARDS FOR CUT
    function setupCut(cards){
      helper.iterateNodes(cards, function(index, value){
        let transform = value.style.transform,
            start = transform.indexOf('('),
            end = transform.indexOf('d'),
            rotation = transform.substring(start + 1, end),
            reverse = rotation > 180 ? true : false;
        lineUpCards(index, value);

        if(reverse){
          if(value.classList.contains('reverse')){
            value.classList.remove('reverse');
          } else {
            value.classList.add('reverse');
          }
        }

        value.addEventListener('click', cutCards, false);
      });
    }

    function randomPosition(){
      return Math.floor(Math.random() * 80);
    }

    function rotation(){
      return Math.floor(Math.random() * 360);
    }
    //SHUFFLE CARDS ARRAY
    // Fisher-Yates shuffle - http://bost.ocks.org/mike/shuffle/
    function shuffleCardData(){
      let numCards = _cards.data.length,
          pick, swap;
      while(numCards) {
        pick = Math.floor(Math.random() * numCards--);
        swap = _cards.data[numCards];
        _cards.data[numCards] = _cards.data[pick];
        _cards.data[pick] = swap;
      }
    }
    //SHUFFLE
    function shuffleCards(n){
      var cards = document.querySelectorAll('.card');
      if(n === 0){
        setupCut(cards);
        return;
      }
      // shuffle cards in DOM
      helper.iterateNodes(cards, function(index, value){
        value.style.left = randomPosition() + '%';
        value.style.top = (randomPosition() + 12) + '%';
        value.style.transform = 'rotate('+rotation()+'deg)';
      });
      // shuffle _cards.data
      shuffleCardData();
      setTimeout(shuffleCards, 600, n-1);
    }
    //INSTRUCTIONS
    function updateInstructions (){
      let instructions = document.querySelector('.instructions'),
          remainingCuts = 3 - cuts,
          times = remainingCuts > 1 ? 'times': 'more time';

      if(cuts < 3) {
        instructions.innerHTML = 'You must cut the cards ' + remainingCuts +' '+ times +'. <br> Click the cards where you want the deck to be cut.';
      } else {
        instructions.innerHTML = '';
      }
    }
    /*
    Initialze the shuffle, clear out the home page content,
    reclass for shuffle,

     */
    function startShuffle(evt){
      evt.preventDefault();
      evt.stopPropagation();
      let page = document.querySelector('.page'),
          numCards = _cards.data.length,
          instructions = document.createElement('h1'),
          cards;
      // clear page container
      while(page.firstChild) {
        page.removeChild(page.firstChild);
      }
      //// reclass page container for shuffle layout
      page.classList.remove('home');
      page.classList.add('shuffle');
      // add instructions to cut deck
      instructions.classList.add('instructions');
      page.appendChild(instructions);
      updateInstructions();
      // add cards to DOM
      var spread = document.createElement('section');
      spread.classList.add('deck');
      for(var i = 0; i < numCards; i++){
        var card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('card--back');
        card.dataset.index = i;
        spread.appendChild(card);
        card.style.transition = 'all 0.5s ease';
      }
      page.appendChild(spread);
      // line cards up
      cards = document.querySelectorAll('.card');
      helper.iterateNodes(cards, function(index, value){
         lineUpCards(0, value);
      });
      // shuffle 3 times
      setTimeout(shuffleCards, 200, 3);

    }
    // click deck to start
    deck.addEventListener('click', startShuffle, false);

    return model;
  };

  return new Shuffle();

});
